import React, { useState } from 'react';
import Axios from 'axios';

const apiKey = process.env.REACT_APP_GPT3_API_KEY;

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
        prompt: userInput,
        max_tokens: 50,
      });
  
      console.log('GPT-3 Response:', response.data);
  
      if (response.status === 200) {
        return response.data.choices[0].text;
      } else {
        console.error('Error: Request failed with status code ' + response.status);
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
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
}

export default Chatbot;