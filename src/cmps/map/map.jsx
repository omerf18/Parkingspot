import React from 'react'
import './map.scss';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '80vh'
};

const center = {
    lat: 32.082399,
    lng: 34.779824
};

function Map() {
    return (
        <div className="map-container">
            <LoadScript
                googleMapsApiKey="AIzaSyBkwnReNU7ptf8v__Y2fK65AorzcxhKqmE"
            >
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={16}
                    containerStyle={containerStyle}
                >
                    { /* Child components, such as markers, info windows, etc. */}
                    <></>
                </GoogleMap>
            </LoadScript>
        </div>
    )
}

export default React.memo(Map)