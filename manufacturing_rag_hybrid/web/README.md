# DakrIQ - Dakri Cartons Factory Intelligence Platform

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Status](https://img.shields.io/badge/status-production-success)

## 🏭 Overview

**DakrIQ** is an intelligent chat interface for Dakri Cartons manufacturing operations, powered by RAG (Retrieval-Augmented Generation) and advanced forecasting algorithms. Get instant insights on machine performance, inventory forecasting, and operational analytics.

![DakrIQ Interface](screenshot.png)

---

## ✨ Features

- 🤖 **RAG-Powered Insights** - Context-aware answers from manufacturing data
- 📊 **Holt-Winters Forecasting** - Advanced time-series predictions with 95% confidence intervals
- ⚡ **Real-Time Analysis** - Instant processing of 6,000+ manufacturing data points
- 🎨 **Modern UI** - Glassmorphism design with factory-themed aesthetics
- 📱 **Responsive** - Works seamlessly on desktop, tablet, and mobile

---

## 🚀 Quick Start

### Option 1: GitHub Pages (Recommended)

Visit the live demo: **https://ocholar.github.io/dakriq**

### Option 2: Local Development

1. Clone the repository:
```bash
git clone https://github.com/ocholar/manufacturing-rag-hybrid.git
cd manufacturing-rag-hybrid/web
```

2. Open `index.html` in your browser or use a local server:
```bash
# Using Python
python -m http.server 8080

# Using Node.js
npx serve .
```

3. Access at `http://localhost:8080`

---

## ⚙️ Configuration

### Backend Setup

**DakrIQ requires an n8n backend with LM Studio integration.**

1. **Start LM Studio** with Llama 3:
   - Download from https://lmstudio.ai
   - Load Llama 3 model
   - Start server on port 1234

2. **Start n8n**:
   ```bash
   cd ../
   npx n8n
   ```

3. **Import Workflows**:
   - In n8n UI (http://localhost:5678)
   - Import all 4 workflows from `n8n_workflows/`
   - Configure Pinecone credentials

4. **Update Webhook URL** in `script.js`:
   ```javascript
   const CONFIG = {
       WEBHOOK_URL: 'https://your-n8n-instance.com/webhook/chat'
   };
   ```

---

## 📖 Usage Examples

### RAG Queries
- "What was the average OEE for MC001 yesterday?"
- "What were the main faults on MC002 this week?"
- "Show me production trends for all machines"

### Forecasting Queries
- "Forecast Flute 1700mm for next 7 days"
- "How much should we order for next month?"
- "Show inventory consumption trends"

---

## 🏗️ Project Structure

```
web/
├── index.html          # Main HTML structure
├── styles.css          # Glassmorphism CSS
├── script.js           # n8n integration logic
├── README.md           # This file
└── screenshot.png      # UI preview (optional)
```

---

## 🎨 Design System

### Color Palette
- **Primary**: #3B82F6 (Blue) - Technology, trust
- **Secondary**: #F97316 (Orange) - Alerts, actions
- **Success**: #10B981 (Green) - Status indicators
- **Background**: #0F172A → #1E293B (Dark gradient)

### Typography
- **Headings**: Inter (700 weight)
- **Body**: Inter (400-600 weight)
- **Code/Data**: JetBrains Mono

---

## 🔧 Tech Stack

| Technology | Purpose |
|------------|---------|
| **n8n** | Workflow orchestration |
| **LM Studio** | Local LLM (Llama 3) |
| **Pinecone** | Vector database |
| **Vanilla JS** | Frontend logic |
| **HTML5/CSS3** | Modern web standards |

---

## 📊 System Capabilities

### Manufacturing Data Analysis
- **OEE Tracking**: Overall Equipment Effectiveness monitoring
- **Fault Detection**: Real-time alerts and historical patterns
- **Shift Analysis**: Performance by time periods
- **Trend Visualization**: Production insights

### Inventory Forecasting
- **Holt-Winters Algorithm**: Triple exponential smoothing
- **Confidence Intervals**: 95% prediction ranges
- **Safety Stock**: Automated recommendations
- **Multi-Product**: Support for various paper types

---

## 🚢 Deployment to GitHub Pages

1. **Prepare Repository**:
   ```bash
   cd web/
   git init
   git add .
   git commit -m "Initial DakrIQ deployment"
   ```

2. **Create GitHub Repository**:
   - Name: `dakriq` (or your preferred name)
   - Initialize without README

3. **Push to GitHub**:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/dakriq.git
   git branch -M main
   git push -u origin main
   ```

4. **Enable GitHub Pages**:
   - Go to repository Settings
   - Pages → Source: `main branch` / `root`
   - Save

5. **Access**:
   - Your site will be live at: `https://YOUR_USERNAME.github.io/dakriq`

---

## 🔒 Security Notes

- **CORS**: Ensure n8n webhook allows requests from your GitHub Pages domain
- **API Keys**: Never expose Pinecone or LM Studio credentials in frontend code
- **Rate Limiting**: Consider implementing rate limits on n8n webhooks

---

## 🐛 Troubleshooting

### Issue: CORS Error
**Solution**: Add CORS headers to n8n webhook response or use a proxy

### Issue: Webhook Timeout
**Solution**: Increase timeout in `script.js` fetch configuration

### Issue: No Response from n8n
**Solution**: Verify n8n is running and webhook URL is correct

---

## 📜 License

MIT License - See parent repository for details

---

## 👥 Contributing

Contributions are welcome! For Dakri Cartons internal use, please follow the established code style and testing procedures.

---

## 📞 Support

For technical support or questions:
- Email: admin@informatx.digital
- GitHub Issues: [Report a bug](https://github.com/ocholar/manufacturing-rag-hybrid/issues)

---

**Built with ❤️ for Dakri Cartons Manufacturing Excellence**
