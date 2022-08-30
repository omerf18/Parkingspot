import React from 'react';
import './locate.scss';

const Locate = ({ panTo }) => {
    return (
        <div className='locate-btn' onClick={() => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    panTo({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    });
                },
                () => null);
        }}>My location</div>
    );
}

export default Locate;