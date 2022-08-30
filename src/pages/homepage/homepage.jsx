import React, { useEffect, useState } from 'react';
import './homepage.scss';
import Map from '../../cmps/map/map';
import ParkingList from '../../cmps/parking-list/parking-list';

const Homepage = () => {

   const [isMapView, setView] = useState(true);
   const [parkings, setParkings] = useState([]);

   // npx json-server --watch ./data/parking-data.json --port 8000
   useEffect(() => {
      fetch('http://localhost:8000/parkings')
         .then(res => {
            return res.json();
         }).
         then((data) => {
            setParkings(data);
         })
   }, []);

   const toggleView = () => {
      setView(currView => !currView);
   }

   return (
      <section className='homepage'>
         {parkings && isMapView ? <Map parkings={parkings}></Map> : <ParkingList parkings={parkings} />}
         <div className='toggle-view-btn' onClick={toggleView}>{isMapView ? 'List' : 'Map'}</div>
      </section>
   );
}

export default Homepage;