import React, { useEffect } from 'react';
import './parking-item.scss';

const ParkingItem = ({ parking }) => {

const getStars = (rank) => {
    let stars = '';
    for (let i = 0; i < rank; i++) {
        stars += '⭐';
    }
    return stars;
}

    return (
        <div className='parking-item'>
            <div className="flex space-between">
                <h4>{parking.address}</h4>
                <p>Price: <span>&#8362;</span> {parking.price}</p>
            </div>
            <p>{parking.isAvailable ? 'Available' : 'Not available'}</p>
            <p>
            Rank: <span className='star-icon'>{getStars(parking.rank)}</span>
            </p>
        </div>
    );
}

export default ParkingItem;