import React, { useState } from 'react';
import Axios from 'axios';

const apiKey = "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";

const axiosInstance = Axios.create({
  baseURL: 'https://api.openai.com/v1',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`,
  },
});

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  const handleSendMessage = async () => {
    // Add the user's message to the chat interface
    setMessages([...messages, { text: userInput, isUser: true }]);

    // Send the user's message to the GPT-3 API
    const chatbotResponse = await sendToChatbot(userInput);

    // Add the chatbot's response to the chat interface
    setMessages([...messages, { text: chatbotResponse, isUser: false }]);

    // Clear the user's input field
    setUserInput('');
  };

  async function sendToChatbot(userInput) {
    try {
      const response = await axiosInstance.post('/completions', {
        model: 'text-davinci-002', // Specify the model you want to use
        prompt: userInput,
        max_tokens: 50,
      });
  
      if (response.status === 200) {
        return response.data.choices[0].text;
      } else if (response.status === 429) {
        // Handle rate limiting by retrying the request after a delay
        const retryAfter = parseInt(response.headers['retry-after']) * 1000; // Convert to milliseconds
        await new Promise((resolve) => setTimeout(resolve, retryAfter));
        return sendToChatbot(userInput); // Retry the request
      } else {
        console.error('Error: Request failed with status code ' + response.status);
        console.error('Response data:', response.data);
        return 'An error occurred while processing your request.';
      }
    } catch (error) {
      console.error('Error sending message to chatbot:', error);
      return 'An error occurred while processing your request.';
    }
  }
  

  return (
    <div className="chatbot">
      <div className="chat-window">
        {messages.map((message, index) => (
          <div
            key={index}
            className={message.isUser ? 'user-message' : 'chatbot-message'}
          >
            {message.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        placeholder="Type your message..."
        value={userInput}
        onChange={handleUserInput}
        style={{
          backgroundColor: '#D6EFFF',
          color: '#fff',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontFamily: 'Space Mono, monospace',
          fontWeight: 700,
          marginRight: '10px',
          marginTop: '10px',
        }}
      />
      <button
        onClick={handleSendMessage}
        style={{
          backgroundColor: '#77B6EA',
          color: '#fff',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontFamily: 'Space Mono, monospace',
          fontWeight: 700,
          marginBottom: '10px',
        }}
      >
        Send
      </button>
    </div>
  );
}

export default Chatbot;