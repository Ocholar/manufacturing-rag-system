# 🚀 n8n Workflow Import Guide

This guide explains how to set up the **Manufacturing RAG System** within your n8n environment.

## 📋 Overview

The project is simplified into two essential workflows:
1. **`00_Complete_Chat_AllInOne.json`**: The core orchestrator. Handles Intent Classification, Holt-Winters Forecasting (in JS), and RAG search.
2. **`04_Data_Ingestion.json`**: A one-time utility to index your machine data into Pinecone.

---

## 🚀 Step 1: Import Workflows

### Manual Import
1.  Open **n8n** (typically `http://localhost:5678`).
2.  Go to the **Workflows** tab and click **Import from File**.
3.  Import both files from the `n8n_workflows/` directory.

---

## ⚙️ Step 2: Configure Credentials

Both workflows require **OpenAI** and **Pinecone** credentials:

1.  **OpenAI**:
    -   Create a new **OpenAI API** credential.
    -   Paste your `OPENAI_API_KEY`.
2.  **Pinecone**:
    -   Create a new **Pinecone API** credential.
    -   Paste your `PINECONE_API_KEY`.

---

## ▶️ Step 3: Populate the Database

Before you can use the chat, you must index the manufacturing data:
1.  Open the **04_Data_Ingestion** workflow.
2.  Double-click the **Read CSV** node and ensure the **File Path** points to your local `machine_data.csv`.
3.  Click **Execute Workflow**. This will generate 768-dimension embeddings and upsert them to Pinecone.

---

## ✅ Step 4: Activate the Brain

1.  Open the **00_Complete_Chat_AllInOne** workflow.
2.  In the **Webhook** node, check the **Webhooks** tab.
3.  Toggle the workflow to **Active** (Green switch in top right).
4.  **Important**: Use the **Production URL** for your web interface (`web/script.js`).

---

## 🛠️ Troubleshooting
- **Dimensions**: If you see a "Dimension Mismatch" error, ensure your Pinecone index is set to **768** dimensions (OpenAI's default is 1536, but this workflow explicitly requests 768 for efficiency).
- **Paths**: On Windows, ensure your file paths use backslashes `\` or forward slashes `/` consistently in the **Read File** nodes.
