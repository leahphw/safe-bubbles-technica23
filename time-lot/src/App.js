import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '400px',
  height: '400px',
};

const center = {
  lat: 37.7749,
  lng: -122.4194,
};

function App() {
  const [userPosition, setUserPosition] = useState(null);

  useEffect(() => {
    // Get the user's current location using the Geolocation API
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  }, []);

  return (
    <div className="App">
      <LoadScript googleMapsApiKey="YOUR_API_KEY">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={userPosition || center}
          zoom={10}
        >
          {userPosition && <Marker position={userPosition} />}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

export default App;
