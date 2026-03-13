# Architecture Documentation - AI Journal System

## 1. Scaling to 100,000 Users

### Horizontal Scaling
The API server is stateless, allowing it to be scaled horizontally behind a **Load Balancer** (like Nginx or AWS ALB). Multiple instances of the Node.js application can handle increased request volume.

### Async Processing & Message Queues
For 100k users, synchronous LLM calls in the request-response cycle would become a bottleneck. I propose moving AI analysis to an **Asynchronous Pipeline**:
1. User submits entry → API saves to DB and returns "Pending" status.
2. API pushes a job to a **Message Queue** (e.g., RabbitMQ, Redis, or Kafka).
3. **AI Workers** consume jobs, call the LLM, and update the database with results.
4. Frontend polls or uses **WebSockets** to show the completed analysis.

### Database Optimization
While SQLite is used for this prototype, a production system would migrate to a distributed database like **PostgreSQL** with Read Replicas. For high-volume journaling, **Database Sharding** by `userId` would ensure no single database node becomes a hotspot.

## 2. Reducing LLM Costs

- **Caching**: The current implementation uses a hash-based in-memory cache. In production, this would be moved to **Redis** for persistence across server restarts and shared access between instances.
- **Model Selection**: Using smaller, more efficient models (e.g., Llama 3 8B instead of GPT-4) for simple sentiment analysis tasks.
- **Batching**: Grouping multiple analysis requests into a single prompt when possible to reduce overhead.
- **Summarization**: Only analyzing the latest entry in detail while using summarized "memory" of past entries to provide context, reducing token usage.

## 3. Caching Strategy
- **Layer 1: Hash-based Lookup**: We hash the journal text (MD5/SHA256). If the hash matches an entry in Redis with a valid TTL, we skip the LLM call.
- **Layer 2: CDN Caching**: For static insights that don't change frequently, we can use edge caching.
- **Deduplication**: Preventing concurrent requests for the same analysis by using a distributed lock in Redis.

## 4. Protecting Sensitive Journal Data

- **Encryption at Rest**: Using AES-256 to encrypt the `text` field in the database.
- **Encryption in Transit**: Strict enforcement of HTTPS (TLS 1.3).
- **Authentication**: Implementing JWT-based auth with short-lived tokens and secure refresh mechanisms.
- **PII Protection**: Using a pre-processing layer to scrub Personally Identifiable Information (names, phone numbers) before sending data to third-party LLM providers.

---

> [!TIP]
> **Advanced AI Optimization**: To further reduce cost and improve performance, journal entries can be converted into **Vector Embeddings** and stored in a vector database (like Pinecone or Weaviate). This allows us to cluster emotional patterns over time and perform similarity searches without repeatedly calling expensive LLM models for "insights".
