import { useState, useMemo, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";
import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";

export default function MapView() {
    const [map, setMap] = useState(null);
    const [center, setCenter] = useState({ lat: 43.45, lng: -80.49 });
    const [selected, setSelected] = useState(null);
    const [zoom, setZoom] = useState(10);
    const [markerPositions, setMarkerPositions] = useState([]); // Store marker positions
    const [userProfiles, setUserProfiles] = useState([]); // Store user data

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries: ["places"],
    });

    // Function to receive user data from UserProfile component
    const receiveUserData = (userData) => {
        // Add the user data to the list of user profiles
        setUserProfiles([...userProfiles, userData]);
    };

    useEffect(() => {
        if (!isLoaded) return;

        if (window.google && map) {
            const latlngbounds = new window.google.maps.LatLngBounds();
            markerPositions.forEach((position) => {
                latlngbounds.extend(position);
            });
            map.fitBounds(latlngbounds);
        }
    }, [isLoaded, map, markerPositions]);

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
            setSelected({ lat, lng });

            // Add the selected location to markerPositions
            setMarkerPositions([...markerPositions, { lat, lng }]);
            // Trigger a re-render to update the map with the new marker
            setCenter({ lat, lng });
            setZoom(15);
        };

        return (
            <Combobox onSelect={handleSelect}>
                <ComboboxInput
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    disabled={!ready}
                    className="combobox-input"
                    placeholder="Search an address"
                />
                <ComboboxPopover>
                    <ComboboxList>
                        {status === "OK" &&
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
    
            <GoogleMap
                zoom={zoom}
                center={center}
                mapContainerStyle={{ height: "400px", width: "100%" }}
                mapContainerClassName="map-container"
            >
                {markerPositions.map((position, index) => (
                    <Marker key={index} position={position} />
                ))}
    
                {userProfiles.map((profile, index) => (
                    <Marker
                        key={index}
                        position={{ lat: profile.lat, lng: profile.lng }}
                        onClick={() => setSelected(profile)}
                    />
                ))}
                
                {selected && (
                    <InfoWindow
                        position={{ lat: selected.lat, lng: selected.lng }}
                        onCloseClick={() => setSelected(null)}
                    >
                        <div>
                            <h2>{selected.username}</h2>
                            <p>First Name: {selected.firstName}</p>
                            <p>Last Name: {selected.lastName}</p>
                            {/* Display assistanceOffered details here */}
                        </div>
                    </InfoWindow>
                )}
            </GoogleMap>
        </>
    );
}