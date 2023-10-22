import React from 'react';
import UserProfile from './components/UserProfile';
import MapView from './components/MapView';
import ChatBot from './components/ChatBot'

function App() {
  return (
    <div className="App">
      <h1>Neighbor Connect</h1>
      <UserProfile />
      
      <ChatBot />
    </div>
  );
}

export default App;
