# D1: Requirements Analysis & Technology Landscape

## 1. Project Background
Meridian Manufacturing Ltd. is a mid-sized Indian manufacturer (INR 2,400 crore revenue) operating seven plants. Currently, their SAP S/4HANA system operates in batch mode for analytics, resulting in a 24-hour data lag. The objective is to implement a real-time (or near real-time) integration with the Zetheta FinSight platform.

## 2. Technology Landscape

### 2.1 Core Systems
| System | Product/Version | Role | Volume |
| :--- | :--- | :--- | :--- |
| **ERP** | SAP S/4HANA 2023 FPS02 | Core financial & operational data | ~2.1M txns/month |
| **CRM** | Salesforce Enterprise | Customer orders & pipeline | ~45K records/month |
| **MES** | Siemens Opcenter 2023.1 | Shop floor production data | ~8.5M events/month |
| **Analytics** | Zetheta FinSight 4.2 | Target financial reporting platform | Destination |
| **Warehouse** | Snowflake Enterprise | Historical data storage | ~15TB cumulative |

### 2.2 Infrastructure
- **Network**: MPLS + SD-WAN (450Mbps shared).
- **Identity**: Azure Active Directory (OIDC/SAML).
- **Monitoring**: Nagios + Grafana (existing).
- **Location**: SAP (On-premise Pune), FinSight (AWS Mumbai).

## 3. Business Objectives
- **Real-time Visibility**: Reduce data lag from 24 hours to < 30 minutes.
- **Data Integrity**: Ensure 100% reconciliation accuracy between SAP and FinSight.
- **Compliance**: Adhere to RBI data localisation and GST reporting requirements.
- **Scalability**: Design for a 10x growth in transaction volume.

## 4. Key Constraints
- **SAP Batch Window**: No heavy extraction between 01:00-04:30 IST.
- **RFC Limits**: Maximum 50 concurrent RFC connections.
- **ODP Frequency**: Delta extractions restricted to every 30 minutes.
- **Bandwidth**: Integration must not consume >25% of the 450Mbps link during business hours.
- **Data Residency**: All financial data must remain within Indian borders.

## 5. Success Criteria
- [ ] Successful extraction of 12 data domains.
- [ ] Transformation logic handles multi-currency and fiscal-to-calendar mapping.
- [ ] Error handling supports exponential backoff and DLQ.
- [ ] Reconciliation reports show zero variance for 30 consecutive days.
- [ ] Monitoring dashboard provides real-time alerts for pipeline failures.
