import React from 'react';
import UserProfile from './components/UserProfile';
import MapView from './components/MapView';
import ChatBot from './components/ChatBot'
import { UserProvider } from "./components/UserContext";

function App() {
  return (
    <UserProvider>
      <div className="App">
        <h1>safe bubbles</h1>
        <UserProfile />
        <h2>locate your area</h2>
        <MapView />
        <h2>chat with an AI assistant!</h2>
        <ChatBot />
      </div>
    </UserProvider>
  );
}

export default App;

