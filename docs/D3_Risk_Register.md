# D1: Risk Register

| Risk ID | Description | Probability | Impact | Mitigation Strategy |
| :--- | :--- | :--- | :--- | :--- |
| **RSK-001** | SAP RFC Pool Exhaustion | Medium | High | Implement connection pooling and strict timeouts; monitor pool utilization in real-time. |
| **RSK-002** | Network Bandwidth Contention | High | Medium | Schedule heavy batch jobs outside business hours; implement rate limiting on ingestion. |
| **RSK-003** | Data Residency Breach | Low | Critical | Use AWS Mumbai region exclusively; configure VPC endpoints to prevent data egress from India. |
| **RSK-004** | API Rate Limiting (FinSight) | Medium | Medium | Implement exponential backoff with jitter; honor `Retry-After` headers. |
| **RSK-005** | Schema Mismatch (SAP Update) | Low | High | Versioned API contracts; automated schema validation at transformation stage. |
| **RSK-006** | Reconciliation Mismatch | Medium | High | Automated daily reconciliation with exception alerting; audit trail for every record. |
| **RSK-007** | ODP Delta Token Loss | Low | Medium | Store tokens in persistent Redis with backup to S3; manual reset capability. |
| **RSK-008** | Inconsistent GST Mapping | Medium | High | Data quality rules for GSTIN validation; quarantine failed records to business queue. |
| **RSK-009** | Unauthorized Access | Low | Critical | Use Azure AD for OIDC authentication; restrict IP ranges to Meridian VPN. |
| **RSK-010** | Transformation Latency | Low | Medium | Horizontally scale Transformation Engine instances; optimize Python code using PySpark. |
