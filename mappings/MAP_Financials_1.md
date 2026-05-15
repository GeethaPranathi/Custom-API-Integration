# MAP: Financial Domains (Part 1)

## 1. General Ledger Mapping (Domain 1)
| Map ID | Source Field (SAP ACDOCA) | Target Field (FinSight) | Transformation | Validation |
| :--- | :--- | :--- | :--- | :--- |
| MAP-GL-001 | `BELNR` | `documentId` | `CONCAT(BUKRS,'-',GJAHR,'-',LTRIM(BELNR,'0'))` | NOT NULL |
| MAP-GL-002 | `BUDAT` | `postingDate` | `FORMAT(BUDAT, 'YYYY-MM-DD')` | NOT NULL |
| MAP-GL-003 | `BLDAT` | `documentDate` | `FORMAT(BLDAT, 'YYYY-MM-DD')` | NOT NULL |
| MAP-GL-004 | `RACCT` | `glAccount` | `LTRIM(RACCT,'0')` | Lookup CoA |
| MAP-GL-005 | `HSL` | `amountLC` | `DECIMAL(HSL, 2)` | NOT NULL |
| MAP-GL-006 | `WSL` | `amountTC` | `DECIMAL(WSL, 2)` | NOT NULL |
| MAP-GL-007 | `RHCUR` | `localCurrency` | Direct mapping | ISO 4217 |
| MAP-GL-008 | `RWCUR` | `transactionCurrency` | Direct mapping | ISO 4217 |
| MAP-GL-009 | `KOSTL` | `costCentre` | `LTRIM(KOSTL,'0')` | Lookup CC |
| MAP-GL-010 | `PRCTR` | `profitCentre` | `LTRIM(PRCTR,'0')` | Lookup PC |
| MAP-GL-011 | `MONAT` | `fiscalPeriod` | Map 001-012 to calendar | 001-016 |
| MAP-GL-012 | `BLART` | `documentType` | Map to FinSight Enum | Enum Check |

## 2. Accounts Payable Mapping (Domain 2)
| Map ID | Source Field (SAP BSIK) | Target Field (FinSight) | Transformation | Validation |
| :--- | :--- | :--- | :--- | :--- |
| MAP-AP-001 | `LIFNR` | `vendorId` | `LTRIM(LIFNR,'0')` | Lookup Vendor |
| MAP-AP-002 | `DMBTR` | `amount` | `DECIMAL(DMBTR, 2)` | NOT NULL |
| MAP-AP-003 | `ZFBDT` | `baseDate` | `FORMAT(ZFBDT, 'YYYY-MM-DD')` | NOT NULL |
| MAP-AP-004 | `ZTERM` | `paymentTerms` | Lookup Terms Table | NOT NULL |
| MAP-AP-005 | `AUGBL` | `clearingDoc` | `LTRIM(AUGBL,'0')` | Optional |
| MAP-AP-006 | `BUKRS` | `companyCode` | Direct mapping | NOT NULL |
| MAP-AP-007 | `GSBER` | `businessArea` | Direct mapping | Optional |
| MAP-AP-008 | `ZUONR` | `assignment` | Direct mapping | Optional |

## 3. Accounts Receivable Mapping (Domain 3)
| Map ID | Source Field (SAP BSID) | Target Field (FinSight) | Transformation | Validation |
| :--- | :--- | :--- | :--- | :--- |
| MAP-AR-001 | `KUNNR` | `customerId` | `LTRIM(KUNNR,'0')` | Lookup Customer |
| MAP-AR-002 | `DMBTR` | `amount` | `DECIMAL(DMBTR, 2)` | NOT NULL |
| MAP-AR-003 | `BLDAT` | `invoiceDate` | `FORMAT(BLDAT, 'YYYY-MM-DD')` | NOT NULL |
| MAP-AR-004 | `MANST` | `dunningLevel` | Direct mapping | 0-4 |
| MAP-AR-005 | `KLMGV` | `creditLimit` | Lookup KNA1 | NOT NULL |
| MAP-AR-006 | `BUKRS` | `companyCode` | Direct mapping | NOT NULL |
| MAP-AR-007 | `SHKZG` | `drCrIndicator` | Map S/H to Debit/Credit | NOT NULL |
| MAP-AR-008 | `XBLNR` | `reference` | Direct mapping | Optional |
