# Technical Assessment Brief

## Manufacturing Data RAG System

---

### 🎯 Assessment Overview

**Duration:** Wednesday 28th January 2026; early submissions appreciated; do reach-out for extention requests

**Objective:** Build a RAG (Retrieval-Augmented Generation) system using LangChain or N8N to enable natural language queries on manufacturing time-series data.

**Context:** This assessment simulates building an AI assistant for manufacturing operations, similar to systems you'll develop for supply chain optimisation.

---

### 📋 Task Description

You are tasked with creating an intelligent chat interface that allows manufacturing engineers to query production data using natural language. The system should understand manufacturing context and provide accurate, data-driven responses about machine performance, faults, and operational patterns.

### Core Requirements

#### Data Processing Pipeline

- Load and preprocess the provided manufacturing time-series data
- Create meaningful embeddings that capture manufacturing events and patterns
- Implement effective chunking strategy for time-series context

#### LangChain RAG Implementation

- Build a retrieval system optimised for manufacturing queries
- Implement context-aware generation using local LLM via LM Studio
- Handle temporal relationships and manufacturing-specific terminology

#### Query Interface

- Create a functional chat interface (CLI or simple web interface)
- Support natural language queries about machine performance and faults
- Provide accurate, contextual responses with data citations

#### **Inventory Forecasting Module**

- Build a forecasting model for inventory purchase predictions
- Accept raw data inputs: current stock levels, historical consumption patterns
- Generate purchase recommendations based on consumption trends
- Handle paper type combinations and dimensional variations
- Provide confidence intervals and forecast explanations

---

### 📊 Provided Dataset

#### Data Structure

```csv
timestamp,machine_id,speed_board_per_min,fault_code,counter_total,feeder_status,temperature_c,vibration_mm_s,oee_percent
```

#### Dataset Characteristics

- **Timespan:** 7 days of production data
- **Interval:** 5-minute sampling frequency
- **Machines:** 3 production machines (MC001, MC002, MC003)
- You may run the `data_generator.py` to get a synthetic machine data set.

#### **Inventory Dataset**

- **Paper Types:** Test liner, White top, Flute
- **Dimensions:** Various widths from 1700mm to 2200mm
- **Consumption History:** Monthly consumption data in kg
- See `paper_inventory_data.json` for complete inventory and consumption data

#### Key Metrics Explained

- **speed_board_per_min:** Production rate (boards manufactured per minute)
- **fault_code:** Machine fault indicators (0 = no fault, E001-E006 = specific faults)
- **counter_total:** Cumulative production counter
- **feeder_status:** RUNNING, STOPPED, or FAULTED
- **oee_percent:** Overall Equipment Effectiveness (availability × performance × quality)

#### Fault Codes Reference

```json
{
  "0": "No Fault",
  "E001": "Emergency Stop",
  "E002": "Material Jam",
  "E003": "Temperature High",
  "E004": "Vibration Exceeded",
  "E005": "Feeder Empty",
  "E006": "Quality Issue"
}
```

---

### 🛠️ Technical Requirements

#### Implementation Options

Candidates may choose **ONE** of the following implementation approaches:

**Option A: Python Implementation (Traditional)**
- **Python 3.8+**
- **LangChain** (latest version)
- **LM Studio** (for local LLM hosting)
- **Vector Database** (ChromaDB, FAISS, or similar)
- **Data Processing** (Pandas, NumPy)
- **Forecasting** (scikit-learn, statsmodels, or prophet)

**Option B: n8n Workflow Implementation (Visual)**
- **n8n** (latest version - local or cloud)
- **LM Studio** (for local LLM hosting)
- **Vector Database** (Pinecone, Qdrant, or similar with API)
- **HTTP Request nodes** for API integration
- **Code Nodes** for data processing and forecasting logic
- See `n8n_implementation_guide.md` for detailed guidance

Both approaches are equally valid. Choose based on your strengths and the approach you'd use in production.

#### LM Studio Setup

1. Download and install LM Studio
2. Load a suitable model
3. Start local server (typically http://localhost:1234)
4. Ensure API endpoint is accessible for your application

#### Expected Architecture

**Python Implementation:**

```
manufacturing_rag/
├── main.py                    # Entry point and chat interface
├── data_processor.py          # Manufacturing data preprocessing
├── rag_pipeline.py            # LangChain RAG implementation
├── llm_client.py              # LM Studio integration
├── vector_store.py            # Vector database management
├── forecasting_module.py      # Inventory forecasting
├── requirements.txt           # Python dependencies
├── config.yaml                # Configuration settings
└── README.md                  # Setup and usage instructions
```

**n8n Implementation:**

```
manufacturing_rag_n8n/
├── workflows/
│   ├── data_ingestion.json           # Load and process data
│   ├── vector_embedding.json         # Create embeddings
│   ├── rag_query_handler.json        # Main RAG processing
│   ├── forecasting_workflow.json     # Forecasting pipeline
│   └── chat_interface.json           # User interaction
├── complete_system_export.json       # Full workflow export
├── credentials_template.json         # API credentials template
├── README.md                          # Setup and usage
└── ARCHITECTURE.md                    # Design decisions
```

See `n8n_implementation_guide.md` for comprehensive n8n workflow guidance.

---

### 🔍 Sample Queries to Support

Your system should accurately handle queries such as:

#### Performance Analysis

- "What was the average OEE for MC001 yesterday?"
- "Show me the production speed trend for all machines last Tuesday"
- "Which machine had the highest productivity this week?"

#### Fault Investigation

- "What caused the downtime on MC002 between 14:00-16:00 on January 16th?"
- "How many times did fault E002 occur across all machines?"
- "What's the average duration of material jam faults?"

#### Operational Insights

- "When did the temperature exceed 75°C and what was the impact?"
- "Show correlation between vibration levels and fault occurrences"
- "What time of day do most faults occur?"

#### Trend Analysis

- "Compare the OEE performance of all three machines"
- "What patterns do you see in the production data?"
- "Generate a summary of yesterday's production performance"

#### Inventory Forecasting Queries

- "What's the predicted consumption for Test liner 2000mm next month?"
- "How much White top 1950mm should we order based on current trends?"
- "Show me the forecast for all Flute paper types for the next quarter"
- "Which paper combinations are running low and need restocking?"
- "What's the confidence level for the 2100mm Test liner forecast?"

---

### 📦 Deliverables

#### 1. Working Application

- Functional RAG system with chat interface
- Successful integration with LM Studio
- Accurate responses to manufacturing queries
- Working forecasting module with purchase recommendations
- Error handling and graceful failures

#### 2. Documentation

- **README.md** with setup instructions and usage examples and process for executing test
- **Architecture Overview** explaining your design decisions
- **Query Examples** demonstrating system capabilities
- **Performance Notes** (response times, limitations, optimisations)
- **Forecasting Methodology** explaining your modeling approach

#### 3. Code Quality

- Clean, well-commented, production-ready code
- Proper error handling and logging
- Modular architecture with clear separation of concerns
- Configuration management for different environments


---

### 🎯 Evaluation Criteria

#### Technical Implementation

- **LangChain Proficiency:** Effective use of RAG components and chains
- **Data Processing:** Intelligent handling of time-series manufacturing data
- **LLM Integration:** Successful local model integration and optimisation
- **System Architecture:** Clean, scalable, and maintainable code structure
- **Forecasting Accuracy:** Statistical rigor in inventory prediction model

#### Manufacturing Domain Understanding

- **Contextual Accuracy:** Understanding of OEE, downtime, fault patterns
- **Query Handling:** Appropriate responses to manufacturing-specific questions
- **Data Interpretation:** Correct analysis of operational metrics and trends
- **Business Relevance:** Insights that would be valuable to manufacturing engineers
- **Inventory Intelligence:** Practical purchase recommendations based on consumption

#### Innovation & Problem-Solving

- **Creative Solutions:** Novel approaches to manufacturing data embedding
- **Performance Optimisation:** Efficient retrieval and response generation
- **User Experience:** Intuitive interface and helpful error messages
- **Edge Cases:** Handling of complex or ambiguous queries
- **Forecast Robustness:** Handling seasonality, outliers, and data gaps

#### Code Quality & Documentation

- **Best Practices:** Clean code, proper structure, comprehensive documentation
- **Reproducibility:** Clear setup instructions and dependency management
- **Testing:** Evidence of testing and validation
- **Production Readiness:** Consideration of deployment and scalability

---

### 💡 Bonus Challenges (Optional)

#### Advanced Features

- **Multi-Modal Analysis:** Combine numerical data with generated visualisations
- **Context Memory:** Maintain conversation context across multiple queries
- **Real-time Streaming:** Simulate processing of streaming data updates
- **API Endpoints:** Create REST API for programmatic access

#### Manufacturing-Specific Enhancements

- **Shift Analysis:** Recognise and analyse shift patterns in responses
- **Predictive Insights:** Generate forward-looking recommendations
- **Root Cause Analysis:** Deep-dive investigation of fault patterns
- **Performance Benchmarking:** Compare against industry standards
- **Multi-period Forecasting:** Extend forecasts to quarterly/annual planning
- **Safety Stock Calculations:** Recommend optimal buffer inventory levels

---

### 📤 Submission Instructions

#### Deliverable Format

- **Compressed Archive** (.zip or .tar.gz) containing all project files
- **Repository Link** (GitHub, GitLab) with complete codebase
- **Demo Video** (5-10 minutes) showing system functionality (optional but appreciated)

#### Submission Details

- **Email Subject:** "Software Engineer Assessment - [Your Name]"
- **Include:** Brief description of your approach and any special features
- **Deadline:** Wednesday 28th January 2026

#### What to Include

- Complete source code with all dependencies
- Detailed README with setup instructions
- Sample queries and expected outputs
- Any additional documentation or architectural diagrams

---

### 🤔 FAQs

**Q: Should I use Python or n8n?**

A: Choose the approach that best showcases your skills and matches how you'd implement this in production:
- **Python**: Better for complex algorithms, custom ML models, fine-grained control
- **n8n**: Better for rapid prototyping, visual workflows, easier maintenance
- Both are equally acceptable and will be evaluated on the same criteria

**Q: Can I mix Python and n8n?**

A: Yes! You can use Python scripts within n8n Code Nodes or call Python APIs from n8n workflows. Document your architecture clearly.

**Q: What if I can't get LM Studio working?**

A: Document the issue and implement a fallback using OpenAI API or another accessible LLM service. Focus on the RAG architecture and data processing.

**Q: Can I use additional libraries?**

A: Yes, but justify your choices and ensure they add meaningful value. Stick to well-established libraries for production readiness.

**Q: How detailed should the responses be?**

A: Responses should be accurate, concise, and include data citations. Think about what a manufacturing engineer would need to make informed decisions.

**Q: What if I find issues with the data?**

A: Document any data quality issues you discover and explain how you handle them. This demonstrates real-world data processing skills.

**Q: What forecasting approach should I use?**

A: Choose any appropriate method (ARIMA, SARIMAX, Prophet, ML models, etc.) but justify your choice and explain limitations. Simple, interpretable models are often better than complex black boxes.

---

### 🚀 Success Tips

#### Focus Areas

- **Manufacturing Context:** Show understanding of operational metrics and industrial processes
- **Technical Excellence:** Demonstrate clean code and system design skills
- **Practical Application:** Build something that could realistically be deployed
- **Problem-Solving:** Handle edge cases and provide helpful error messages

---

**Good luck! We're excited to see how you approach this challenge and look forward to discussing your solution.**

*For technical questions during the assessment, contact: [admin@informatx.digital]*
