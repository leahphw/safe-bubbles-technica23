import { useState, useEffect } from "react";
import { useUserContext } from "./UserContext";
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

const libraries = ["places"];

export default function MapView() {
    const { userProfiles } = useUserContext();
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

            setMarkerPositions([...markerPositions, { lat, lng }]);
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
                    style={{
                        backgroundColor: '#3498db',
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

            {isLoaded ? (
                <GoogleMap
                    zoom={zoom}
                    center={center}
                    mapContainerStyle={{ height: "400px", width: "100%" }}
                    mapContainerClassName="map-container"
                    onLoad={handleMapLoad}
                >
                    {markerPositions.map((position, index) => (
                        <Marker
                            key={index}
                            position={position}
                            icon={{
                                url: "../../assets/img/carz.png",
                                anchor: { x: 10, y: 10 },
                                scaledSize: { width: 20, height: 20 }
                            }}
                        />
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
            ) : null}
        </>
    );
}