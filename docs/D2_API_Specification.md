# D2: API Specification Document

## 1. Overview
This document specifies the interface contracts for the Meridian SAP-FinSight integration. It covers 12 source endpoints from SAP S/4HANA and 12 destination endpoints on the Zetheta FinSight platform.

## 2. Authentication & Authorization

### 2.1 SAP Source (On-premise)
- **Method**: Basic Authentication over HTTPS.
- **Service Account**: `SERVICE_INT_BRIDGE`
- **Authorizations**: S_RFC, S_TABU_DIS (for table access via CDS).

### 2.2 FinSight Destination (Cloud)
- **Method**: OAuth 2.0 Client Credentials Flow.
- **Client ID/Secret**: Managed via AWS Secrets Manager.
- **Scopes**: `finance:write`, `masterdata:write`.

## 3. API Specifications (OpenAPI 3.0)

| System | Domain | Specification File |
| :--- | :--- | :--- |
| **SAP** | Financials (GL, AP, AR) | [API_SAP_Financials.yaml](../specs/API_SAP_Financials.yaml) |
| **SAP** | Logistics (PO, SO, Inventory) | [API_SAP_Logistics.yaml](../specs/API_SAP_Logistics.yaml) |
| **FinSight** | Core Ingestion | [API_FinSight_Core.yaml](../specs/API_FinSight_Core.yaml) |

## 4. Design Standards
- **Versioning**: URL versioning (e.g., `/v1/`).
- **Date Format**: ISO 8601 (YYYY-MM-DD).
- **Idempotency**: `Idempotency-Key` required for all POST operations to prevent duplicates during retries.
- **Pagination**: Offset-based pagination for batch extractions.
- **Rate Limiting**: 500 requests per minute per tenant on FinSight API.

## 5. Error Codes
The integration uses standard HTTP status codes supplemented by custom error bodies. See the [Error Handling Framework](D4_Error_Handling.md) for a full registry.
