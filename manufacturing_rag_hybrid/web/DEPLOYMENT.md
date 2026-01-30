# GitHub Pages Deployment Guide - DakrIQ

## 🚀 Option 1: Deploy to Organization (Recommended)

Since you have access to the `Ocholar` organization, deploy under:
**`https://ocholar.github.io/dakriq`**

### Steps:

1. **Create Repository in Ocholar Organization**:
   ```bash
   # On GitHub: New Repository
   - Organization: Ocholar
   - Name: dakriq
   - Description: Dakri Cartons Factory Intelligence Platform
   - Public
   - Do NOT initialize with README
   ```

2. **Push Web Interface**:
   ```bash
   cd web/
   git init
   git add .
   git commit -m "Initial DakrIQ deployment"
   git branch -M main
   git remote add origin https://github.com/Ocholar/dakriq.git
   git push -u origin main
   ```

3. **Enable GitHub Pages**:
   - Go to https://github.com/Ocholar/dakriq
   - Settings → Pages
   - Source: Deploy from branch
   - Branch: `main` / `root`
   - Save

4. **Access**:
   - Live URL: `https://ocholar.github.io/dakriq`
   - DNS (optional): Add custom domain in Pages settings

---

## 🔧 Option 2: Deploy to Personal Account

**URL**: `https://YOUR_USERNAME.github.io/dakriq`

Same steps as above, but use your personal GitHub account.

---

## ⚙️ Post-Deployment Configuration

### 1. Update Webhook URL

Edit `script.js` with your production n8n instance:

```javascript
const CONFIG = {
    WEBHOOK_URL: 'https://your-n8n-instance.com/webhook/chat'
};
```

### 2. Configure CORS on n8n

In your n8n webhook, add response headers:
```
Access-Control-Allow-Origin: https://ocholar.github.io
Access-Control-Allow-Methods: POST, OPTIONS
Access-Control-Allow-Headers: Content-Type
```

### 3. SSL Certificate

GitHub Pages automatically provides SSL (https://). Ensure your n8n instance also uses HTTPS for security.

---

## 📊 Recommended Architecture

```
┌─────────────────────┐
│  GitHub Pages       │
│  (ocholar.github.io)│
│  - Static HTML/CSS  │
│  - JavaScript UI    │
└──────────┬──────────┘
           │ POST /webhook/chat
           ▼
┌─────────────────────┐
│  n8n Instance       │
│  (your-server.com)  │
│  - Cloud/VPS hosted │
│  - LM Studio local  │
└──────────┬──────────┘
           │
     ┌─────┴─────┐
     ▼           ▼
┌─────────┐  ┌─────────┐
│LM Studio│  │Pinecone │
│ (Local) │  │ (Cloud) │
└─────────┘  └─────────┘
```

---

## 🔒 Security Checklist

- [ ] n8n webhook uses HTTPS
- [ ] CORS headers configured
- [ ] No API keys in frontend code
- [ ] Rate limiting enabled on webhook
- [ ] Content Security Policy (CSP) headers

---

## 🎨 Customization

### Branding
- Update logo SVG in `index.html`
- Modify color palette in `styles.css` (`:root` variables)
- Change company name references

### Functionality
- Add more example queries in `index.html`
- Customize bot responses in `script.js`
- Add analytics (Google Analytics, etc.)

---

## 📈 Monitoring

- **GitHub Pages Status**: Check repository Actions tab
- **n8n Webhook**: Monitor execution logs in n8n UI
- **Browser Console**: Check for JavaScript errors

---

## 🆘 Troubleshooting

**Issue**: 404 on GitHub Pages  
**Fix**: Ensure `index.html` is in repository root, check Pages settings

**Issue**: CORS error from n8n  
**Fix**: Add proper CORS headers to webhook response node

**Issue**: Slow responses  
**Fix**: Optimize n8n workflows, consider caching frequent queries

---

**Ready to Deploy!** 🚀
