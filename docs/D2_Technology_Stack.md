# D1: Technology Stack Justification

## 1. Selected Stack

| Layer | Technology | Selection | Justification |
| :--- | :--- | :--- | :--- |
| **API Gateway** | AWS API Gateway / Kong | **AWS API Gateway** | Native integration with AWS Mumbai region, built-in rate limiting and OAuth support. |
| **Message Broker** | Apache Kafka / RabbitMQ | **Apache Kafka** | Superior throughput for 2.1M+ monthly transactions; supports event replay and decoupled processing. |
| **Processing** | Python / Java / Go | **Python (Spark/FastAPI)** | Rich libraries for data transformation (`pandas`, `PySpark`) and OpenAPI spec integration. |
| **Cache / State** | Redis / Memcached | **Redis** | Supports complex data types for hierarchy flattening and fast master data lookups. |
| **Infrastucture** | AWS / Azure / On-prem | **AWS (Mumbai)** | Complies with RBI data localisation; provides low latency to FinSight AWS endpoints. |
| **Monitoring** | ELK / Prometheus | **Prometheus + Grafana** | Industry standard for real-time metrics and alerting; highly compatible with Kafka and Python. |

## 2. Alternatives Considered

### 2.1 Azure vs. AWS
- **Considered**: Azure (Central India).
- **Rejected**: FinSight is hosted on AWS Mumbai. Keeping the integration bridge on the same cloud provider reduces cross-cloud egress costs and network latency.

### 2.2 RabbitMQ vs. Kafka
- **Considered**: RabbitMQ.
- **Rejected**: While easier to set up, RabbitMQ lacks the native "replay" capability of Kafka, which is critical for re-processing batches after a transformation logic update or system failure.

### 2.3 ETL Tool (Informatica/Talend) vs. Custom Code
- **Considered**: Informatica PowerCenter.
- **Rejected**: High licensing costs and less flexibility for complex SAP ODP delta handling. Custom Python-based logic allows for better version control (Git) and automated testing.

## 3. Connectivity Architecture
- **SAP to Bridge**: AWS Direct Connect or Site-to-Site VPN from Pune Data Centre to AWS Mumbai.
- **Bridge to FinSight**: Internal VPC Peering or PrivateLink for secure, low-latency communication.
