# MAP: Cost & Profit Centres (Part 2)

## 4. Cost Centre Mapping (Domain 4)
| Map ID | Source Field (SAP CSKS/CSKT) | Target Field (FinSight) | Transformation | Validation |
| :--- | :--- | :--- | :--- | :--- |
| MAP-CC-001 | `KOSTL` | `costCentreId` | `LTRIM(KOSTL,'0')` | NOT NULL |
| MAP-CC-002 | `KTEXT` | `name` | Direct mapping | NOT NULL |
| MAP-CC-003 | `KHINR` | `hierarchyNode` | Direct mapping | NOT NULL |
| MAP-CC-004 | `BUKRS` | `companyCode` | Direct mapping | NOT NULL |
| MAP-CC-005 | `VERAK` | `responsiblePerson` | Direct mapping | Optional |
| MAP-CC-006 | `DATBI` | `validUntil` | `FORMAT(DATBI, 'YYYY-MM-DD')` | NOT NULL |

## 5. Profit Centre Mapping (Domain 5)
| Map ID | Source Field (SAP CEPC/CEPCT) | Target Field (FinSight) | Transformation | Validation |
| :--- | :--- | :--- | :--- | :--- |
| MAP-PC-001 | `PRCTR` | `profitCentreId` | `LTRIM(PRCTR,'0')` | NOT NULL |
| MAP-PC-002 | `KTEXT` | `name` | Direct mapping | NOT NULL |
| MAP-PC-003 | `SEGMENT` | `segment` | Direct mapping | NOT NULL |
| MAP-PC-004 | `KHINR` | `hierarchyNode` | Direct mapping | NOT NULL |
