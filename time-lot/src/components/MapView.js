import React from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

export default function MapView() {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyB_cM8VABwDeong2IWTyedphnrShWG-ZtE"
    });

    if (!isLoaded) {
        return <div>...Loading...</div>;
    }

    return (
        <div>
            <Map />
        </div>
    );
}

function Map() {
    return (
        <div>
            <GoogleMap
                id="example-map"
                mapContainerStyle={{ height: "400px", width: "100%" }}
                zoom={10}
                center={{ lat: 0, lng: 0 }}
            >
                <Marker position={{ lat: 0, lng: 0 }} />
            </GoogleMap>
        </div>
    );
}