// Configuration
const CONFIG = {
    // Change this to your deployed n8n webhook URL for production
    WEBHOOK_URL: 'http://localhost:5678/webhook-test/chat',
    // For GitHub Pages deployment, update to your n8n instance URL:
    // WEBHOOK_URL: 'https://your-n8n-instance.com/webhook/chat',
};

// DOM Elements
const chatMessages = document.getElementById('chatMessages');
const userInput = document.getElementById('userInput');
const sendButton = document.getElementById('sendButton');
const exampleQueries = document.getElementById('exampleQueries');

// Set welcome timestamp
document.getElementById('welcomeTime').textContent = formatTime(new Date());

// Auto-resize textarea
userInput.addEventListener('input', function () {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
});

// Send message on Enter (Shift+Enter for new line)
userInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

// Send button click
sendButton.addEventListener('click', sendMessage);

// Example query chips
document.querySelectorAll('.query-chip').forEach(chip => {
    chip.addEventListener('click', function () {
        const query = this.dataset.query;
        userInput.value = query;
        userInput.focus();
        sendMessage();
        // Hide example queries after first use
        exampleQueries.style.display = 'none';
    });
});

// Send Message Function
async function sendMessage() {
    const message = userInput.value.trim();
    if (!message || sendButton.disabled) return;

    // Add user message to chat
    addMessage(message, 'user');
    userInput.value = '';
    userInput.style.height = 'auto';

    // Disable input while processing
    sendButton.disabled = true;
    userInput.disabled = true;

    // Add loading message
    const loadingId = addLoadingMessage();

    try {
        // Send to n8n webhook
        const response = await fetch(CONFIG.WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: message
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Remove loading message
        removeLoadingMessage(loadingId);

        // Add bot response
        addBotResponse(data);

    } catch (error) {
        console.error('Error:', error);
        removeLoadingMessage(loadingId);
        addErrorMessage('Sorry, I encountered an error processing your request. Please ensure the n8n webhook is running and try again.');
    } finally {
        // Re-enable input
        sendButton.disabled = false;
        userInput.disabled = false;
        userInput.focus();
    }
}

// Add User Message
function addMessage(text, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}-message`;

    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';

    const headerDiv = document.createElement('div');
    headerDiv.className = 'message-header';
    headerDiv.innerHTML = `
        <span class="${type}-label">${type === 'user' ? 'You' : 'DakrIQ Assistant'}</span>
        <span class="timestamp">${formatTime(new Date())}</span>
    `;

    const textDiv = document.createElement('div');
    textDiv.className = 'message-text';
    textDiv.innerHTML = `<p>${escapeHtml(text)}</p>`;

    contentDiv.appendChild(headerDiv);
    contentDiv.appendChild(textDiv);
    messageDiv.appendChild(contentDiv);
    chatMessages.appendChild(messageDiv);

    scrollToBottom();
}

// Add Bot Response
function addBotResponse(data) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message bot-message';

    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';

    const headerDiv = document.createElement('div');
    headerDiv.className = 'message-header';
    headerDiv.innerHTML = `
        <span class="bot-label">DakrIQ Assistant</span>
        <span class="timestamp">${formatTime(new Date())}</span>
    `;

    const textDiv = document.createElement('div');
    textDiv.className = 'message-text';

    // Format the answer (preserve line breaks and formatting)
    const formattedAnswer = formatBotAnswer(data.answer || data.response || 'Response received successfully.');
    textDiv.innerHTML = formattedAnswer;

    // Add forecast data if present
    if (data.forecast) {
        const forecastDiv = document.createElement('div');
        forecastDiv.className = 'forecast-data';
        forecastDiv.innerHTML = formatForecastData(data.forecast);
        textDiv.appendChild(forecastDiv);
    }

    // Add sources if present
    if (data.sources && data.sources.length > 0) {
        const sourcesDiv = document.createElement('div');
        sourcesDiv.className = 'sources';
        sourcesDiv.innerHTML = '<h4>📎 Data Sources:</h4>';
        data.sources.forEach((source, idx) => {
            const sourceItem = document.createElement('div');
            sourceItem.className = 'source-item';
            sourceItem.textContent = `[${idx + 1}] ${source.machine_id || 'N/A'} - ${source.date || 'N/A'} (Score: ${(source.score * 100).toFixed(1)}%)`;
            sourcesDiv.appendChild(sourceItem);
        });
        textDiv.appendChild(sourcesDiv);
    }

    contentDiv.appendChild(headerDiv);
    contentDiv.appendChild(textDiv);
    messageDiv.appendChild(contentDiv);
    chatMessages.appendChild(messageDiv);

    scrollToBottom();
}

// Add Loading Message
function addLoadingMessage() {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message bot-message loading-message';
    messageDiv.id = 'loading-' + Date.now();

    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.innerHTML = `
        <div class="message-header">
            <span class="bot-label">DakrIQ Assistant</span>
            <span class="timestamp">${formatTime(new Date())}</span>
        </div>
        <div class="message-text">
            <div class="loading-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    `;

    messageDiv.appendChild(contentDiv);
    chatMessages.appendChild(messageDiv);
    scrollToBottom();

    return messageDiv.id;
}

// Remove Loading Message
function removeLoadingMessage(id) {
    const loadingMsg = document.getElementById(id);
    if (loadingMsg) {
        loadingMsg.remove();
    }
}

// Add Error Message
function addErrorMessage(text) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message bot-message error-message';

    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.innerHTML = `
        <div class="message-header">
            <span class="bot-label">System Error</span>
            <span class="timestamp">${formatTime(new Date())}</span>
        </div>
        <div class="message-text error-text">
            <p>⚠️ ${escapeHtml(text)}</p>
        </div>
    `;

    messageDiv.appendChild(contentDiv);
    chatMessages.appendChild(messageDiv);
    scrollToBottom();
}

// Format Bot Answer
function formatBotAnswer(text) {
    // Convert markdown-style formatting
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    text = text.replace(/\n/g, '<br>');
    return text;
}

// Format Forecast Data
function formatForecastData(forecast) {
    let html = '<div style="margin-top: 12px; padding: 12px; background: rgba(59, 130, 246, 0.05); border-radius: 8px;">';
    html += `<strong>📊 Forecast Details:</strong><br>`;
    html += `<div style="font-family: 'JetBrains Mono', monospace; font-size: 12px; margin-top: 8px;">`;
    html += `Total Predicted: ${forecast.total_predicted_kg}kg<br>`;
    html += `Confidence Interval (95%): ${forecast.lower_bound_total}kg - ${forecast.upper_bound_total}kg<br>`;
    html += `Recommendation: ${forecast.recommendation}`;
    html += `</div></div>`;
    return html;
}

// Utility Functions
function formatTime(date) {
    return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
    });
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function scrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Initialize
console.log('DakrIQ Factory Intelligence System initialized');
console.log('Webhook URL:', CONFIG.WEBHOOK_URL);
