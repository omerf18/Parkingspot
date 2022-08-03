import React from 'react'
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { formatRelative } from 'date-fns';
import AppHeader from '../header/app-header';
import mapStyles from './map-styles';
import SearchBar from './search-bar/search-bar';
import Locate from './locate/locate';
import './map.scss';

const libaries = ["places"];

const containerStyle = {
    width: '100%',
    height: '100vh'
};

const center = {
    lat: 32.082399,
    lng: 34.779824
};

const options = {
    styles: mapStyles,
    disableDefaultUI: true
}

const Map = () => {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libaries
    });

    const [parkings, setParkings] = React.useState([]);

    const [selectedParking, setSelectedParking] = React.useState(null);

    const onMapClick = React.useCallback((event) => {
        setParkings((currentParkings) => [
            ...currentParkings,
            {
                lat: event.latLng.lat(),
                lng: event.latLng.lng(),
                time: new Date()
            }
        ]);
    }, []);

    const mapRef = React.useRef();

    const onMapLoad = React.useCallback((map) => {
        mapRef.current = map;
    }, []);

    const panTo = React.useCallback(({ lat, lng }) => {
        mapRef.current.panTo({ lat, lng });
        mapRef.current.setZoom(18);
    }, []);

    if (loadError) return 'Error - Loading map failed';
    if (!isLoaded) return 'Loading maps..'

    return (
        <div className="map-container">
            <div className="app-header">
                <AppHeader />
            </div>
            <SearchBar panTo={panTo} />
            <Locate panTo={panTo} />
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={13}
                options={options}
                onClick={onMapClick}
                onLoad={onMapLoad}
            >
                {
                    parkings.map((parking) => (
                        <Marker
                            key={parking.time.toISOString()}
                            position={{ lat: parking.lat, lng: parking.lng }}
                            onClick={() => {
                                setSelectedParking(parking);
                            }}
                        />
                    ))
                }
                {selectedParking ? (
                    <InfoWindow
                        position={{ lat: selectedParking.lat, lng: selectedParking.lng }}
                        onCloseClick={() => { setSelectedParking(null) }}
                    >
                        <div>
                            <h1>Hi</h1>
                            <p>Parking at: {formatRelative(selectedParking.time, new Date())}</p>
                        </div>
                    </InfoWindow>) : null}
            </GoogleMap>
        </div >
    );
}

// export default React.memo(Map)
export default Map;