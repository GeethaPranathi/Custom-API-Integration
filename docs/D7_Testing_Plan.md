# D7: Integration Testing Plan

## 1. Functional Test Scenarios (10)
| ID | Scenario | Preconditions | Expected Result |
| :--- | :--- | :--- | :--- |
| TST-FNC-001 | Happy Path GL Sync | 100 GL entries in SAP. | 100 records in FinSight; Sum matches. |
| TST-FNC-002 | AP Multi-Currency | Items in INR, USD, EUR. | Converted to INR at TCURR rates. |
| TST-FNC-003 | Master Data Delta | New CC created in SAP. | Appears in FinSight within 30 mins. |
| TST-FNC-004 | Multi-Company Routing | Entries from MC01 and MC02. | Routed to correct analytics tenants. |
| TST-FNC-005 | Special Period Map | SAP period 013 (Adjustment). | Mapped to Dec (12) with special flag. |
| TST-FNC-006 | Hierarchy Flattening | 7-level CC hierarchy. | Correctly flattened in destination. |
| TST-FNC-007 | P2P Traceability | PO -> GR -> Invoice flow. | All documents linked in analytics. |
| TST-FNC-008 | Bank Statement Clear | Matched bank items. | Status show as CLEARED in target. |
| TST-FNC-009 | Budget vs Actual | CO budget postings. | Variances match SAP S_ALR reports. |
| TST-FNC-010 | EOD Reconciliation | 24-hour data dump. | Zero-variance report generated. |

## 2. Non-Functional Test Scenarios (5)
| ID | Scenario | Target Metric |
| :--- | :--- | :--- |
| TST-NFR-001 | Peak Load Test | 500k records in 1 hour. |
| TST-NFR-002 | Concurrency Test | 12 domains extracting simultaneously. |
| TST-NFR-003 | API Latency | P95 < 5s under 500 concurrent reqs. |
| TST-NFR-004 | Scalability | Linear throughput up to 1M records. |
| TST-NFR-005 | Endurance | 24-hour continuous stress test. |

## 3. Failure Injection Test Scenarios (5)
| ID | Scenario | Expected Resilience |
| :--- | :--- | :--- |
| TST-FLR-001 | SAP RFC Connection Down | Circuit breaker opens; partial batch saved. |
| TST-FLR-002 | FinSight API Throttling | Bridge respects Retry-After; eventually syncs. |
| TST-FLR-003 | Kafka Broker Failure | Zero message loss; automatic leader failover. |
| TST-FLR-004 | Malformed Data Injection | 10 bad records route to DLQ; 90 good ones load. |
| TST-FLR-005 | Network Partition | Buffering active; eventual consistency post-recovery. |

## 4. Security & Reconciliation Tests (5)
| ID | Scenario | Expected Control |
| :--- | :--- | :--- |
| TST-SEC-001 | Token Expiry mid-sync | Automatic refresh; seamless continuation. |
| TST-SEC-002 | Unauthorized Access | 401/403 status; audit log entry. |
| TST-SEC-003 | Data Encryption | TLS 1.2+ validation in transit. |
| TST-REC-001 | Deliberate Checksum Mismatch | Reconciliation fails; alert triggered. |
| TST-REC-002 | Orphan Cost Centre | Referential integrity check catches record. |
