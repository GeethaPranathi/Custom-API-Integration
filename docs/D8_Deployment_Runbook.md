# D8: Deployment Runbook

## 1. Pre-Deployment Checklist (15+ Items)
- [ ] SAP Transport Requests (CDS Views) imported to PRD.
- [ ] Service Account `SERVICE_INT_BRIDGE` created and authorized in SAP.
- [ ] AWS Direct Connect / VPN tunnel status: UP.
- [ ] FinSight API Client ID/Secret provisioned.
- [ ] AWS Secrets Manager configured with SAP/FinSight credentials.
- [ ] Kafka topics initialized with correct partitioning (3 partitions per domain).
- [ ] Redis cluster provisioned and reachable.
- [ ] Monitoring Stack (Prometheus/Grafana) active.
- [ ] PagerDuty escalation policy configured.
- [ ] Change Advisory Board (CAB) approval secured.
- [ ] Nightly batch window confirmed (01:00-04:30 IST).
- [ ] Source-to-target mapping logic verified in QA.
- [ ] Load balancer health checks configured.
- [ ] Security group rules allow traffic on port 443 and 9092.
- [ ] Backup of current delta tokens completed.

## 2. Deployment Steps
1. **Stop Pollers**: Ensure no ingestion is active during upgrade.
2. **Database Migration**: Apply any schema changes to Redis or Snowflake.
3. **Deploy Containers**: Rolling update of Ingestion and Transformation services via EKS.
4. **Initialize Metadata**: Load latest exchange rates and hierarchies into Redis.
5. **Start Pollers**: Resume ODP delta extraction.
6. **Trigger Smoke Tests**: Verify end-to-end flow for GL domain.

## 3. Post-Deployment Verification
- [ ] Check `MON-001` (Pipeline Health) for Green status.
- [ ] Verify `ERR-LO-001` (401 Auth) is NOT occurring.
- [ ] Confirm first 1000 records loaded successfully in FinSight.
- [ ] Run manual reconciliation check for the first batch.

## 4. Rollback Procedure
### Decision Matrix
- **Rollback Trigger**: Failure Rate > 20% in first 30 mins OR Data Integrity Breach.
- **Authority**: VP of IT Infrastructure.
- **Max Time to Decision**: 15 minutes post-detection.

### Steps
1. **Emergency Stop**: Kill all ingestion containers.
2. **Revert Version**: `kubectl rollout undo deployment/integration-bridge`.
3. **Restore State**: Reset Redis delta tokens to pre-deployment backup.
4. **Verification**: Confirm old version is running and processing without errors.
5. **Post-Mortem**: Document failure for root cause analysis.
