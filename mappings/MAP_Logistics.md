# MAP: Logistics & Assets (Part 3)

## 6. Material Ledger Mapping (Domain 6)
| Map ID | Source Field (SAP MBEW) | Target Field (FinSight) | Transformation | Validation |
| :--- | :--- | :--- | :--- | :--- |
| MAP-ML-001 | `MATNR` | `materialId` | `LTRIM(MATNR,'0')` | NOT NULL |
| MAP-ML-002 | `BWKEY` | `valuationArea` | Direct mapping | NOT NULL |
| MAP-ML-003 | `STPRS` | `standardPrice` | `DECIMAL(STPRS, 2)` | NOT NULL |
| MAP-ML-004 | `LBKUM` | `totalStock` | `DECIMAL(LBKUM, 2)` | NOT NULL |
| MAP-ML-005 | `SALK3` | `inventoryValue` | `DECIMAL(SALK3, 2)` | NOT NULL |

## 7. Purchase Orders Mapping (Domain 7)
| Map ID | Source Field (SAP EKKO/EKPO) | Target Field (FinSight) | Transformation | Validation |
| :--- | :--- | :--- | :--- | :--- |
| MAP-PO-001 | `EBELN` | `poNumber` | `LTRIM(EBELN,'0')` | NOT NULL |
| MAP-PO-002 | `LIFNR` | `vendorId` | `LTRIM(LIFNR,'0')` | Lookup Vendor |
| MAP-PO-003 | `NETWR` | `netValue` | `DECIMAL(NETWR, 2)` | NOT NULL |
| MAP-PO-004 | `AEDAT` | `createDate` | `FORMAT(AEDAT, 'YYYY-MM-DD')` | NOT NULL |

## 8. Sales Orders Mapping (Domain 8)
| Map ID | Source Field (SAP VBAK/VBAP) | Target Field (FinSight) | Transformation | Validation |
| :--- | :--- | :--- | :--- | :--- |
| MAP-SO-001 | `VBELN` | `soNumber` | `LTRIM(VBELN,'0')` | NOT NULL |
| MAP-SO-002 | `KUNNR` | `customerId` | `LTRIM(KUNNR,'0')` | Lookup Customer |
| MAP-SO-003 | `NETWR` | `totalValue` | `DECIMAL(NETWR, 2)` | NOT NULL |

## 9. Fixed Assets Mapping (Domain 9)
| Map ID | Source Field (SAP ANLA) | Target Field (FinSight) | Transformation | Validation |
| :--- | :--- | :--- | :--- | :--- |
| MAP-FA-001 | `ANLN1` | `assetNumber` | `LTRIM(ANLN1,'0')` | NOT NULL |
| MAP-FA-002 | `TXT50` | `description` | Direct mapping | NOT NULL |
| MAP-FA-003 | `AKTIV` | `capitalizationDate` | `FORMAT(AKTIV, 'YYYY-MM-DD')` | NOT NULL |

## 10. Bank Statements Mapping (Domain 10)
| Map ID | Source Field (SAP FEBEP) | Target Field (FinSight) | Transformation | Validation |
| :--- | :--- | :--- | :--- | :--- |
| MAP-BS-001 | `KUKEY` | `statementId` | Direct mapping | NOT NULL |
| MAP-BS-002 | `VALUT` | `valueDate` | `FORMAT(VALUT, 'YYYY-MM-DD')` | NOT NULL |
| MAP-BS-003 | `KWBTR` | `amount` | `DECIMAL(KWBTR, 2)` | NOT NULL |
