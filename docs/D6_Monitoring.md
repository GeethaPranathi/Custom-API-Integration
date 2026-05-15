# D6: Monitoring & Alerting Specification

## 1. Monitoring Dashboard Panels (12 Panels)
| ID | Title | Metric | Alert Threshold |
| :--- | :--- | :--- | :--- |
| MON-001 | Pipeline Health | Status aggregation (Green/Yellow/Red) | RED if any domain >4hrs stale |
| MON-002 | Throughput | rate(records_processed_total[5m]) | Warning if < 50% baseline |
| MON-003 | Latency (P95) | histogram_quantile(0.95, api_duration) | > 5s (Warning) |
| MON-004 | Error Rate | (errors / total_requests) * 100 | > 5% (Critical) |
| MON-005 | DLQ Depth | kafka_consumer_group_lag{topic='dlq'} | > 500 records (Critical) |
| MON-006 | Recon Status | Last reconciliation result (Pass/Fail) | FAIL (P2 Alert) |
| MON-007 | SAP RFC Health | sap_rfc_pool_utilisation | > 90% (Critical) |
| MON-008 | API Rate Limits | finsight_rate_limit_remaining | < 10% headroom (P2) |
| MON-009 | Data Freshness | now() - last_success_timestamp | > SLA (P3) |
| MON-010 | Resource Usage | CPU / Memory / Disk Utilisation | > 90% (P2) |
| MON-011 | Consumer Lag | kafka_consumer_group_lag | > 50,000 msgs (P2) |
| MON-012 | Circuit Breaker | circuit_breaker_state (0/1/2) | Any state != 0 (P2) |

## 2. Structured Logging Specification
All logs must be in JSON format for ingestion into the ELK stack.
```json
{
  "timestamp": "2026-05-15T09:30:00Z",
  "level": "ERROR",
  "service": "transformation-engine",
  "domain": "general-ledger",
  "correlation_id": "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
  "batch_id": "BATCH-GL-20260515",
  "message": "Currency conversion failed",
  "error_code": "ERR-MAP-005",
  "source_id": "MC01-2026-100045",
  "attempts": 3,
  "stack_trace": "..."
}
```

## 3. Alerting Rules (15+)
- **Critical (P1)**: PagerDuty call within 2 minutes. (e.g., Error Rate > 10%, System Down).
- **High (P2)**: Slack notification + Jira ticket. (e.g., DLQ Depth > 100, Recon Fail).
- **Medium (P3)**: Email notification. (e.g., Data Freshness > 1 hour).

## 4. Monitoring Stack
- **Prometheus**: Metric collection via scrapers.
- **Grafana**: Visualisation and dashboarding.
- **ELK (Elasticsearch, Logstash, Kibana)**: Log aggregation and search.
- **PagerDuty**: Incident management and escalation.
