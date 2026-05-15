# DGM: C4 Level 2 - Container Diagram

```mermaid
C4Container
    title Container Diagram for Integration Bridge

    System_Ext(sap, "SAP S/4HANA", "Source ERP (On-premise Pune)")
    System_Ext(finsight, "Zetheta FinSight", "Target Analytics (AWS Mumbai)")

    Container_Boundary(bridge, "Integration Bridge (AWS Mumbai)") {
        Container(api_gateway, "API Gateway", "Kong / AWS API Gateway", "Manages incoming requests and authentication.")
        Container(ingestion_service, "Ingestion Service", "Node.js / Spring Boot", "Polls SAP ODP/RFC and ingests data.")
        ContainerDb(kafka, "Message Broker", "Apache Kafka", "Buffered event stream for data domains.")
        Container(transform_engine, "Transformation Engine", "Spark / Python", "Applies business logic and field mappings.")
        Container(recon_service, "Reconciliation Service", "Go / Python", "Performs source-to-target data validation.")
        ContainerDb(redis, "Cache / State Store", "Redis", "Stores delta tokens and mapping metadata.")
        Container(dlq_handler, "DLQ Handler", "Python", "Manages failed messages for retry or manual review.")
    }

    System_Ext(monitoring, "Monitoring Stack", "Prometheus & Grafana", "Centralized logging and metrics.")

    Rel(sap, ingestion_service, "Data Extraction (ODP/RFC)", "HTTPS/gRPC")
    Rel(ingestion_service, kafka, "Publishes raw data", "Avro/JSON")
    Rel(kafka, transform_engine, "Consumes raw data", "Avro/JSON")
    Rel(transform_engine, kafka, "Publishes transformed data", "JSON")
    Rel(kafka, finsight, "Pushes to FinSight API", "HTTPS/REST")
    
    Rel(transform_engine, redis, "Lookups mapping / state", "TCP/RESP")
    Rel(recon_service, sap, "Verifies checksums", "RFC")
    Rel(recon_service, finsight, "Verifies load status", "REST")
    
    Rel(transform_engine, dlq_handler, "Routes failed records", "Kafka/DLQ")
    Rel(bridge, monitoring, "Sends metrics & logs", "OpenTelemetry")
```
