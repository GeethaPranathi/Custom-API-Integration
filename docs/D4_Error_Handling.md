# D4: Error Handling & Retry Framework

## 1. Error Classification Taxonomy
| Class | Description | Example | Strategy |
| :--- | :--- | :--- | :--- |
| **TRANSIENT** | Temporary failures that may succeed on retry. | HTTP 429, HTTP 503, Network Timeout. | Exponential Backoff with Jitter. |
| **PERMANENT** | Failures that will never succeed without manual intervention. | HTTP 400 (Schema), HTTP 401 (Invalid Credentials). | Route to DLQ immediately; Alert. |
| **DATA QUALITY**| Data violates business rules or referential integrity. | Missing cost centre, invalid date. | Route to Business Exception Queue. |
| **SYSTEM** | Infrastructure level failures. | Kafka Broker Down, Redis OOM. | Trigger Circuit Breaker; P1 Alert. |

## 2. Retry Strategy
We use **Exponential Backoff with Jitter** to prevent "thundering herd" problems.

### Formula
`wait = min(cap, random(base, base * 2^attempt))`
- `base`: 2 seconds
- `cap`: 60 seconds
- `max_attempts`: 3

## 3. Circuit Breaker State Machine
| State | Behavior | Transition Criteria |
| :--- | :--- | :--- |
| **CLOSED** | Requests flow normally. | Switch to OPEN if failure rate > 10% over 1 min. |
| **OPEN** | Requests fail fast locally; no call to target. | Switch to HALF-OPEN after 30s "sleep" window. |
| **HALF-OPEN** | Allow a small percentage of "probe" requests. | Switch to CLOSED if success rate > 95%; else return to OPEN. |

## 4. Dead Letter Queue (DLQ) Architecture
- **Storage**: Dedicated Kafka topic `integration.dlq.{domain}`.
- **Metadata**: Each DLQ message includes:
  - `original_payload`: The failed record.
  - `error_code`: Registry code (e.g., ERR-MAP-001).
  - `timestamp`: Time of failure.
  - `attempts`: Number of failed retries.
  - `stack_trace`: Snippet of the error.
- **Retention**: 14 days for manual inspection.
- **Reprocessing**: Admin CLI tool allows re-injecting DLQ messages back into the Raw topic after fixing the underlying issue.

## 5. Error Notification Matrix
- **P1 (Critical)**: System Failure, DLQ Depth > 1000. -> PagerDuty + SMS.
- **P2 (High)**: Data Quality Error (Financial). -> Slack + Email to Finance Team.
- **P3 (Medium)**: Transient Error (Retry successful). -> Logs only.
