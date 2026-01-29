# Copilot Instructions for Manufacturing RAG Hybrid System

## Overview
This project implements a hybrid RAG (Retrieval-Augmented Generation) system for manufacturing intelligence. It consists of a Python microservice for forecasting, n8n workflows for orchestration, and a local LLM hosted via LM Studio. Understanding the architecture requires familiarity with multiple components and their interactions.

## Architecture
- **Python Service**: Located in `python_service/`, this contains the FastAPI application (`forecasting_api.py`) and core logic for forecasting (`forecasting_engine.py`).
- **n8n Workflows**: Found in `n8n_workflows/`, these JSON files define the orchestration of tasks, including data ingestion and query handling.
- **Data**: The `data/` directory holds raw and processed datasets, crucial for both forecasting and RAG operations.

## Developer Workflows
- **Building and Running**: Use `pip install -r requirements.txt` to install dependencies. Start the FastAPI service with `uvicorn forecasting_api:app --port 8000`.
- **Testing**: Ensure to run tests using `pytest` in the `tests/` directory, aiming for at least 80% coverage. Use `curl` to test API endpoints.

## Project-Specific Conventions
- **Error Handling**: Implement robust error handling in the FastAPI service. Use Pydantic models for request validation.
- **Data Processing**: In `data_processor.py`, ensure to handle missing data and enrich chunks for better retrieval. Follow the specified metadata enrichment guidelines.

## Integration Points
- **LM Studio**: Ensure LM Studio is configured correctly in n8n for embedding generation.
- **Vector Database**: Use Pinecone for storing embeddings. Always filter by metadata before performing vector searches.

## Communication Patterns
- **API Endpoints**: Familiarize yourself with the endpoints defined in `forecasting_api.py`. Each endpoint should handle specific tasks related to forecasting and recommendations.
- **n8n Workflows**: Understand the flow of data through n8n, especially how workflows interact with the Python service and external APIs.

## Examples
- **Forecasting Request**: To get a forecast, send a POST request to `/forecast` with the required parameters.
- **Query Handling**: For RAG queries, use the `/rag-query` endpoint to process natural language queries.

## Conclusion
This document serves as a guide for AI agents to navigate and contribute effectively to the Manufacturing RAG Hybrid System. For any unclear sections, please provide feedback for further refinement.
