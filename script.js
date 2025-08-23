const toggleBtn = document.getElementById("toggleBtn");
let darkMode = true;

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  darkMode = !darkMode;

  // toggle icon
  toggleBtn.innerHTML = darkMode
    ? '<i class="fa-solid fa-moon"></i>'
    : '<i class="fa-solid fa-sun"></i>';
});







// Get references to the HTML elements
const chat = document.getElementById('chat');
const input = document.getElementById('input');
const button = document.getElementById('button');

// The URL of your backend server
const BACKEND_URL = '/chat';      // Ensure this matches the port in server.js

// Function to append a message to the chat interface
function appendMessage(sender, text) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);

    const avatarElement = document.createElement('div');
    avatarElement.classList.add('avatar');

    const textElement = document.createElement('div');
    textElement.classList.add('text');
    textElement.innerText = text;

    if (sender === 'user') {
        messageElement.appendChild(textElement);
        messageElement.appendChild(avatarElement);
    } else {
        messageElement.appendChild(avatarElement);
        messageElement.appendChild(textElement);
    }
    chat.appendChild(messageElement);
    // Scroll to the bottom of the chat
    chat.scrollTop = chat.scrollHeight;
}

// Function to send a message to your backend server
async function sendMessageToBackend(message) {
    try {
        const response = await fetch(BACKEND_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            // Send the user's message in the request body
            body: JSON.stringify({ message: message })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Backend API Error:', errorData);
            return "Oops! There was an issue with the backend server. Please check the server console for errors.";
        }

        const data = await response.json();
        // The backend should return the bot's response in a 'response' field
        return data.response;

    } catch (error) {
        console.error('Fetch error:', error);
        return "Could not connect to the backend server. Make sure it's running!";
    }
}

// Event listener for the send button
button.addEventListener('click', async () => {
    const userMessage = input.value.trim();
    if (userMessage) {
        appendMessage('user', userMessage);
        input.value = ''; // Clear the input field

        // Add a loading message from the bot
        appendMessage('bot', 'Thinking...');

        // Send the message to your backend
        const botResponse = await sendMessageToBackend(userMessage);

        // Remove the loading message before adding the actual response
        const messages = chat.querySelectorAll('.message');
        if (messages.length > 0) {
            const lastMessage = messages[messages.length - 1];
            if (lastMessage.classList.contains('bot') && lastMessage.querySelector('.text').innerText === 'Thinking...') {
                chat.removeChild(lastMessage);
            }
        }
        appendMessage('bot', botResponse);
    }
});

// Event listener for the Enter key in the input field
input.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        button.click(); // Simulate a click on the send button
    }
});
