import ParkingItem from "../parking-item/parking-item";

const ParkingList = ({ parkings }) => {

  return (
    <div className="parking-list-container">
      {
        parkings.map((parking) => (
          <ParkingItem
            key={parking.id}
            parking={parking}
          />
        ))
      }
    </div>
  );

}
export default ParkingList;