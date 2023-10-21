import React from 'react';
import UserProfile from './components/UserProfile';
import MapView from './components/MapView'

function App() {
  return (
    <div className="App">
      <h1>Neighbor Connect</h1>
      <UserProfile />
      <MapView />
    </div>
  );
}

export default App;
