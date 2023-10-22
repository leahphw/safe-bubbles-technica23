import React from 'react';
import UserProfile from './components/UserProfile';
import MapView from './components/MapView';
import ChatBot from './components/ChatBot'
import { UserProvider } from "./components/UserContext";

function App() {
  return (
    <UserProvider>
      <div className="App">
        <h1>Neighbor Connect</h1>
        <UserProfile />
        <MapView />
      </div>
    </UserProvider>
  );
}

export default App;

