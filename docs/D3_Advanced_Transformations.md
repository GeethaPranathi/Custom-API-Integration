# D3: Advanced Transformation Patterns

## 1. Currency Conversion
- **Source**: SAP `TCURR` table stores exchange rates.
- **Logic**: 
  - For each transaction, if `transactionCurrency` != `localCurrency`, fetch rate from Redis (synced from `TCURR`).
  - Use `UKURS` (Exchange Rate) for the specific `GDATU` (Date).
  - Formula: `amountLC = amountTC * rate`.
  - Handle rounding to 2 decimal places.

## 2. Fiscal-to-Calendar Period Mapping
- **Source**: SAP `MONAT` (001-016).
- **Logic**:
  - Meridian uses Indian Fiscal Year (V3: April-March).
  - Map SAP Period 001 (April) to Calendar Month 04.
  - Map SAP Period 010 (January) to Calendar Month 01 of the following year.
  - Special Periods (013-016) are mapped to Calendar Month 12 (December) with `isSpecialPeriod = true`.

## 3. Hierarchy Flattening (Cost Centres)
- **Source**: SAP `SETNODE` and `SETLEAF` tables.
- **Logic**:
  - Recursively traverse hierarchy nodes to build a flat table for each Cost Centre.
  - Target columns: `Level1_Node`, `Level2_Node`, ..., `Leaf_Node`.
  - Store flattened hierarchy in Redis for sub-millisecond enrichment during transformation.

## 4. Composite Key Generation
- **Source**: Multiple SAP fields.
- **Logic**:
  - Generate globally unique IDs for FinSight.
  - Journal Entry ID: `{CompanyCode}-{FiscalYear}-{DocumentNumber}`.
  - Vendor ID: `V-{VendorNumber}`.
  - Customer ID: `C-{CustomerNumber}`.
