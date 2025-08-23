# My Chatbot

LINK: 


A simple chatbot built with **HTML, CSS, and JavaScript** for the frontend, and **Node.js (Express)** as the backend.  
It connects to the **GEMINI API** to generate responses.

---

## 📂 Project Structure

```
my-chatbot/
│── index.htm        # Chatbot UI (HTML)
│── style.css        # Stylesheet (CSS)
│── script.js        # Frontend logic (JS) - sends/receives messages
│── server.js        # Backend (Node.js + Express + OpenAI API)
│── package.json     # Node.js dependencies
│── node_modules/    # Installed dependencies
```

---

## 🚀 Setup Instructions

### 1. Clone the repo
```bash
git clone https://github.com/your-username/my-chatbot.git
cd my-chatbot
```

### 2. Install dependencies
```bash
npm install
```

### 3. Add your OpenAI API key
Open `server.js` and replace:
```js
const OPENAI_API_KEY = "YOUR_API_KEY_HERE";
```

### 4. Run the backend server
```bash
node server.js
```
You should see:
```
✅ Server running on http://localhost:5000
```

### 5. Open the chatbot UI
- Open `index.htm` in your browser (double-click or use VSCode Live Server).  
- Type a message → the backend sends it to OpenAI → reply is shown.

---

## ⚠️ Notes
- Do **NOT** expose your API key in frontend code. Keep it in `server.js` only.  
- If you want to deploy, use services like **Render, Vercel, or Heroku** for the backend.  
- Default model used: `gpt-3.5-turbo` (you can change inside `server.js`).

---

## 📜 License
MIT License
