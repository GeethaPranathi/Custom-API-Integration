# D5: Reconciliation & Data Quality

## 1. Reconciliation Dimensions
| Dimension | Definition | Measurement Method | Tolerance |
| :--- | :--- | :--- | :--- |
| **Completeness** | All source records are present in target. | Record count comparison (SAP ODP vs FinSight). | 0 records |
| **Accuracy** | Data values are preserved after transformation. | Hash/Checksum comparison of financial amounts (HSL). | INR 0.00 |
| **Timeliness** | Data is loaded within the 30-min SLA. | `now() - max(posting_timestamp)`. | 30 minutes |
| **Consistency**| Referential integrity is maintained. | Foreign key lookups (CC, PC, Vendor). | 100% resolve |

## 2. Reconciliation Reports
- **Batch Report**: Generated after every extraction run. Includes counts and sums.
- **Daily Dashboard**: Aggregated view for the CFO showing multi-day trends.
- **Monthly Audit Report**: Official PDF sign-off showing zero-variance for the auditor.

## 3. Data Quality Rules (25+)

### 3.1 General Rules (All Domains)
1. `VAL-001`: Null Check - Mandatory fields must not be empty.
2. `VAL-002`: Type Check - Amounts must be numeric; dates must be ISO 8601.
3. `VAL-003`: Future Date - Posting date must not be > T+1 day.
4. `VAL-004`: Range Check - Amounts must be within +/- 1,000,000,000.

### 3.2 Finance Specific Rules
5. `VAL-FIN-001`: Double Entry - Total Debits must equal Total Credits per Document ID.
6. `VAL-FIN-002`: Currency Code - Must be a valid ISO 4217 code.
7. `VAL-FIN-003`: Fiscal Period - Must be 001-016.
8. `VAL-FIN-004`: Cost Centre Ref - Must exist in CC master table.
9. `VAL-FIN-005`: Profit Centre Ref - Must exist in PC master table.

### 3.3 Logistics Specific Rules
10. `VAL-LOG-001`: PO Number Format - Must match SAP regex `^[0-9]{10}$`.
11. `VAL-LOG-002`: Vendor Ref - Must exist in Vendor master.
12. `VAL-LOG-003`: Quantity Check - Must be non-negative.

### 3.4 India Specific Rules
13. `VAL-IND-001`: GSTIN Format - Must match 15-digit alphanumeric regex.
14. `VAL-IND-002`: PAN Format - Must match 10-digit alphanumeric regex.
15. `VAL-IND-003`: TDS Rate Check - Must be within legal brackets (0-30%).

*(Total 25+ rules specified in the full validation engine configuration)*

## 4. Exception Handling
- Records failing "Hard" rules (e.g., Null mandatory field) are routed to DLQ.
- Records failing "Soft" rules (e.g., Dunning level out of range) are loaded with a "Warning" flag for later review.
