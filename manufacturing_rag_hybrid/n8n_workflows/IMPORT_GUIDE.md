# n8n Workflow Import Guide

This guide explains how to import the **Data Ingestion Pipeline** into n8n.

## 📋 Overview

The project includes one critical n8n workflow:
- **`COMPLETE_01_data_ingestion.json`**: Reads manufacturing data, generates embeddings, and updates the Pinecone vector database.

---

## 🚀 Import Instructions

### Option 1: Manual Import (Recommended)

1.  **Access n8n**: Open `http://localhost:5678`
2.  **Login**: Default credentials are usually `admin` / `password` (or what you set up).
3.  **Import**:
    -   Click **Workflows** (left sidebar)
    -   Click **Import from File** (top right)
    -   Select `n8n_workflows/COMPLETE_01_data_ingestion.json`

### Option 2: CLI Import

If you have n8n installed globally:
```bash
n8n import:workflow --input=n8n_workflows/COMPLETE_01_data_ingestion.json
```

---

## ⚙️ Configuration

After importing, you must configure the **Pinecone** credentials:

1.  Open the **Data Ingestion** workflow.
2.  Double-click the **Pinecone** node.
3.  Under **Credentials**, select **Create New**.
4.  Enter your details from `.env`:
    -   **API Key**: Your Pinecone API Key
    -   **Environment**: `us-east-1` (or your specific region)
5.  **Save** the credentials.

---

## ▶️ Running the Pipeline

1.  Click **Execute Workflow**.
2.  The workflow will:
    -   Read `data/machine_data.csv`
    -   Chunk the text
    -   Generate embeddings (via OpenAI or Local LLM)
    -   Upsert vectors to Pinecone
3.  Verify success by checking the "Executions" tab.
