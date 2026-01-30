# Copilot Instructions for Manufacturing RAG Hybrid System

## Overview
This project implements a **production-ready hybrid RAG (Retrieval-Augmented Generation) system** for manufacturing intelligence. It combines Python microservices for computational complexity, n8n workflows for orchestration, local LLM via Ollama, and Pinecone for vector retrieval.

## Architecture (Current Implementation)

### Components
- **Python Service** (`python_service/`): FastAPI application with SARIMAX forecasting, manufacturing data processing, and RAG integration
- **n8n Workflows** (`n8n_workflows/`): Four modular workflows handling chat routing, RAG queries, data ingestion, and forecasting
- **Ollama** (Local LLM): Runs Phi-3.5-mini for chat and nomic-embed-text for embeddings
- **Pinecone** (Cloud): Vector database for semantic retrieval with metadata filtering
- **Frontend** (`frontend/`): Web interface for end users

## Developer Workflows

### Running the System
```bash
# 1. Start Ollama server (separate terminal)
ollama serve

# 2. Activate Python virtual environment
.\venv\Scripts\activate

# 3. Start FastAPI server
uvicorn python_service.main:app --reload --host 0.0.0.0 --port 8001

# 4. Start n8n (separate terminal)
n8n start
```

### Key Files & Their Purpose
- **`python_service/main.py`**: FastAPI endpoints for `/health`, `/forecast`, `/chat`, `/data/chunks`
- **`python_service/forecaster.py`**: SARIMAX statistical forecasting engine with confidence intervals
- **`python_service/processor.py`**: Manufacturing data processing, temporal chunking, narrative generation
- **`python_service/rag.py`**: Vector search integration with Pinecone and Ollama embeddings
- **`n8n_workflows/`**: Four JSON workflow files (import into n8n UI)

## Project-Specific Conventions

### Error Handling
- Implement Pydantic models for all request validation in FastAPI
- Return structured error responses: `{"error": "message", "status": 400}`
- Log all errors with context using Python logging module

### Data Processing Pipeline
- **Chunking Strategy**: 1-hour temporal windows for manufacturing data
- **Metadata Enrichment**: Always include `machine_id`, `timestamp`, `shift_type`, `oee_metrics`, `fault_analysis`
- **Narrative Generation**: Create human-readable summaries for better RAG embedding quality
- **Missing Data Handling**: Use forward-fill for inventory consumption, flag gaps explicitly

### Forecasting Module
- Always return 95% confidence intervals with forecasts
- Use SARIMAX for trend/seasonality detection
- Include purchase recommendations based on safety stock calculation (forecast * 1.2 - current_stock)
- Handle paper types: Flute, Test liner, White top with dimensions 1700-2200mm

## Integration Points

### Ollama Configuration
- **Embedding Model**: `nomic-embed-text` (768 dimensions)
- **Chat Model**: `custom-phi3` (loaded from local GGUF file)
- **API Endpoint**: `http://localhost:11434/v1/embeddings` and `/v1/chat/completions`
- **Note**: GPU offload set to 0 for CPU-based inference on systems with limited VRAM

### Pinecone Integration
- **Index Name**: `manufacturing-rag`
- **Dimensions**: 768 (matches nomic-embed-text)
- **Metadata Filtering**: Always filter by `machine_id` and `timestamp_range` before vector search
- **API Key**: Stored in `.env` file (never commit credentials)

### Vector Search Best Practices
- Limit to top 5 results per query (balance relevance vs. context length)
- Apply metadata filters BEFORE performing vector search
- Include similarity score in response for confidence assessment
- Always cite specific data points: `[Source: MC001, 2024-01-15 10:00-11:00, OEE: 79.9%]`

## Communication Patterns

### API Endpoints
- `POST /forecast`: Generate inventory forecasts with confidence intervals
- `POST /chat`: RAG query handler with intent routing (manufacturing vs. forecast)
- `GET /health`: System health check
- `GET /data/chunks`: Fetch enriched manufacturing data chunks

### n8n Workflow Communication
- **Webhook-based triggering**: HTTP POST requests to `http://localhost:5678/webhook/{workflow_name}`
- **Execution flow**: Main workflow (01) routes to sub-workflows (02, 03, 04)
- **Error handling**: Catch and log failures in n8n error nodes

## Manufacturing Domain Knowledge

### Key Metrics
- **OEE (Overall Equipment Effectiveness)**: Availability × Performance × Quality
- **Downtime**: Calculate from fault duration and fault codes
- **Shift Context**: Morning (06:00-14:00), Afternoon (14:00-22:00), Night (22:00-06:00)

### Fault Analysis
- Map fault codes to maintenance teams
- Calculate cumulative downtime impact
- Identify patterns across machines and time periods

### Inventory Intelligence
- Consumption patterns vary by paper type and dimension
- Safety stock threshold: forecast * 1.2
- Recommend ordering when current stock < safety threshold

## Testing & Validation

### Required Test Cases (see TEST_QUERIES.md)
1. Performance Query: OEE calculations with temporal filtering
2. Fault Query: Count and analyze specific fault codes
3. Forecast Query: Generate predictions with confidence bounds
4. Recommendation Query: Calculate purchase orders
5. Multi-metric Query: Combine OEE, faults, and trends

### Validation Steps
- Manual verification against raw CSV data
- Statistical validation of forecasts (MAPE, RMSE)
- Response cite-ability (all claims must reference specific data points)

## Deployment Considerations

- **Local Deployment**: Ollama on Windows/Mac/Linux with 8GB+ RAM
- **Production Deployment**: Consider containerizing with Docker
- **Scalability**: Use n8n's cloud version or Kubernetes for workflow scaling
- **API Rate Limiting**: Implement if exposing endpoints publicly

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "Connection refused" on 11434 | Ensure `ollama serve` is running |
| Ollama models not loading | Check available VRAM, reduce GPU offload |
| Pinecone 404 errors | Verify API key and index name in `.env` |
| n8n workflow errors | Check credential configuration in UI |
| Forecast returns null | Verify paper_type exists in inventory data |

---

**Reference**: This system prioritizes **local privacy** (Ollama) with **cloud scalability** (Pinecone) for a balanced hybrid approach suitable for manufacturing environments.
