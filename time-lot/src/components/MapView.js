import React, { useState, useEffect } from 'react';
import { useUserContext } from './UserContext';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from 'use-places-autocomplete';
import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
} from '@reach/combobox';
import '@reach/combobox/styles.css';

const libraries = ['places'];

export default function MapView() {
    const { userProfiles, addUserProfile } = useUserContext(); // Added addUserProfile
    const [map, setMap] = useState(null);
    const [center, setCenter] = useState({ lat: 43.45, lng: -80.49 });
    const [selected, setSelected] = useState(null);
    const [zoom, setZoom] = useState(10);
    const [markerPositions, setMarkerPositions] = useState([]);
    const [selectedProfile, setSelectedProfile] = useState(null);

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    });

    const handleMapLoad = (map) => {
        setMap(map);
    };

    useEffect(() => {
        if (map) {
            const latlngbounds = new window.google.maps.LatLngBounds();
            markerPositions.forEach((position) => {
                latlngbounds.extend(position);
            });
            map.fitBounds(latlngbounds);
        }
    }, [map, markerPositions]);

    console.log(selectedProfile);

    const PlacesAutocomplete = ({ setSelected }) => {
        const {
            ready,
            value,
            setValue,
            suggestions: { status, data },
            clearSuggestions,
        } = usePlacesAutocomplete();

        const handleSelect = async (address) => {
            const results = await getGeocode({ address });
            const { lat, lng } = await getLatLng(results[0]);
            const selectedProfile = userProfiles.find((profile) => {
              return profile.lat === lat && profile.lng === lng;
            });
          
            if (selectedProfile) {
              setSelectedProfile(selectedProfile);
            }
          
            addMarkerWithProfile({ lat, lng, profile: selectedProfile });
          
            setCenter({ lat, lng });
            setZoom(10);
          };
          
          const addMarkerWithProfile = ({ lat, lng, profile }) => {
            const newMarker = { lat, lng, profile };
            setMarkerPositions([...markerPositions, newMarker]);
            setSelectedProfile(profile);
          };

        return (
            <Combobox onSelect={handleSelect}>
                <ComboboxInput
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    disabled={!ready}
                    className="combobox-input"
                    placeholder="search an address"
                    style={{
                        backgroundColor: '#D6EFFF   ',
                        color: '#fff',
                        padding: '10px 20px',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontFamily: 'Space Mono, monospace',
                        fontWeight: 700,
                        marginBottom: '10px',
                    }}
                />
                <ComboboxPopover
                    style={{
                        color: '#000',
                        padding: '10px 20px',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontFamily: 'Space Mono, monospace',
                        fontWeight: 700,
                        alignContent: 'left',
                    }}
                >
                    <ComboboxList>
                        {status === 'OK' &&
                            data.map(({ place_id, description }) => (
                                <ComboboxOption key={place_id} value={description} />
                            ))}
                    </ComboboxList>
                </ComboboxPopover>
            </Combobox>
        );
    };

    return (
        <>
            <div className="places-container">
                <PlacesAutocomplete setSelected={setSelected} />
            </div>

            {isLoaded ? (
                <GoogleMap
                    zoom={zoom}
                    center={center}
                    mapContainerStyle={{ height: '400px', width: '100%' }}
                    mapContainerClassName="map-container"
                    onLoad={handleMapLoad}
                >
                    {markerPositions.map((position, index) => (
                        <Marker
                            key={index}
                            position={position}
                        />
                    ))}

                    {userProfiles.map((profile, index) => (
                        <Marker
                            key={index}
                            position={{ lat: profile.lat, lng: profile.lng }}
                            onClick={() => setSelectedProfile(profile)}
                        />
                    ))}

                    {selectedProfile && (
                        <InfoWindow
                            position={{ lat: selectedProfile.lat, lng: selectedProfile.lng }}
                            onCloseClick={() => setSelectedProfile(null)}
                        >
                            <div>
                                <h2>{selectedProfile.username}</h2>
                                <p>First Name: {selectedProfile.firstName}</p>
                                <p>Last Name: {selectedProfile.lastName}</p>
                                {/* Display assistanceOffered details here */}
                            </div>
                        </InfoWindow>
                    )}
                </GoogleMap>
            ) : null}
        </>
    );
}
