# D3: Data Transformation Specification

## 1. Overview
This document defines the mapping and transformation logic for 50+ data fields across 10 functional domains. These rules are executed by the Transformation Engine within the Integration Bridge.

## 2. Mapping Specifications

| Domain | Mapping File | Record Count (Est.) |
| :--- | :--- | :--- |
| **General Ledger** | [MAP_Financials_1.md](../mappings/MAP_Financials_1.md) | 12 |
| **Accounts Payable** | [MAP_Financials_1.md](../mappings/MAP_Financials_1.md) | 8 |
| **Accounts Receivable** | [MAP_Financials_1.md](../mappings/MAP_Financials_1.md) | 8 |
| **Cost Centres** | [MAP_Centres.md](../mappings/MAP_Centres.md) | 6 |
| **Profit Centres** | [MAP_Centres.md](../mappings/MAP_Centres.md) | 4 |
| **Logistics & Assets** | [MAP_Logistics.md](../mappings/MAP_Logistics.md) | 18 |
| **Total Mappings** | | **56** |

## 3. Transformation Logic
Detailed algorithms for complex transformations are documented in [D3_Advanced_Transformations.md](D3_Advanced_Transformations.md).
- **Currency**: Point-in-time conversion using SAP TCURR.
- **Period**: V3 variant mapping to standard calendar.
- **Hierarchies**: Node flattening for analytical consumption.

## 4. Data Quality Standards
- **Precision**: 2 decimal places for all financial amounts.
- **Encoding**: UTF-8.
- **Validation**: Every record must pass schema validation before ingestion into Kafka Clean Topic.
