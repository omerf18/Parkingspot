import React, { useEffect } from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { formatRelative } from 'date-fns';
import AppHeader from '../header/app-header';
import mapStyles from './map-styles';
import SearchBar from './search-bar/search-bar';
import Locate from './locate/locate';
import './map.scss';

const libaries = ['places'];

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

const Map = ({ parkings }) => {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libaries: ['places']
    });

    const [selectedParking, setSelectedParking] = React.useState(null);

    const mapRef = React.useRef();

    const onMapLoad = React.useCallback((map) => {
        mapRef.current = map;
    }, []);

    const panTo = React.useCallback(({ lat, lng }) => {
        mapRef.current.panTo({ lat, lng });
        mapRef.current.setZoom(22);
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
                onLoad={onMapLoad}
                onClick={() => {
                    setSelectedParking(null);
                }}
                id="google-map"
            >
                {
                    parkings.map((parking) => (
                        <Marker
                            key={parking.id}
                            position={{ lat: parking.location.latitude, lng: parking.location.longitude }}
                            onClick={() => {
                                setSelectedParking(parking);
                            }}
                        />
                    ))
                }
                {selectedParking &&
                    <InfoWindow
                        position={{ lat: selectedParking.location.latitude, lng: selectedParking.location.longitude }}
                        onCloseClick={() => { setSelectedParking(null) }}
                    >
                        <div>
                            <h4>{selectedParking.address}</h4>
                            <p>{selectedParking.isAvailable ? 'Available' : 'Not available'}</p>
                            <p>Price: <span>&#8362;</span> {selectedParking.price}</p>
                            <p>{'Rank: ' + selectedParking.rank + ' stars'}</p>
                        </div>
                    </InfoWindow>}
            </GoogleMap>
        </div>
    )
}

export default Map;