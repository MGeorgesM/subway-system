import { formatTime } from '../../core/tools/formatTime';
import { useStationLogic } from './logic';

import Map from '../Map/Map';
import Ridecard from './Ridecard/Ridecard';
import Popup from '../Elements/Popup/Popup';
import StarsRating from '../Elements/StarsRating/StarsRating';
import Facilities from '../Elements/Facilities/Facilities';

import './index.css';


const Station = () => {

    const {
        station,
        stations,
        stationRating,
        stationId,
        startingRides,
        endingRides,
        selectedRide,
        showPopup,
        popupMessage,
        setShowPopup,
        handleProceed,
        addRide,
    } = useStationLogic();

    if (station)
        return (
            <>
                <div className="main-station white-bg flex column">
                    <Map
                        locationTextInput={station.location}
                        markersInput={stations}
                        // setIsMapLoading={setIsMapLoading}
                    ></Map>
                </div>
                <div className="section-header flex space-between">
                    <div className="header-text">
                        <h1>{station.name}</h1>
                        <h3>
                            {`${station.location}, Lebanon`} - {station.active ? 'Active' : 'Inactive'}
                        </h3>
                        <p>Opens at {formatTime(station.opening_time)}</p>
                        <p>Closes at {formatTime(station.closing_time)}</p>
                    </div>
                    <div className="header-icons flex column center">
                        <div className="rating">
                            <StarsRating rating={parseFloat(stationRating)} />
                        </div>
                        <div className="facilities">
                            <Facilities stationId={stationId} />
                        </div>
                    </div>
                </div>
                <div className="section-header">
                    <h2 className="bold">Outgoing Rides</h2>
                </div>
                {startingRides.length > 0 ? (
                    startingRides.map((ride) => (
                        <Ridecard
                            key={ride.id}
                            ride={ride}
                            addRide={addRide}
                            selectedRide={selectedRide}
                            stationLocation={station.location}
                        ></Ridecard>
                    ))
                ) : (
                    <p>No Rides Currently Available</p>
                )}
                <div className="section-header">
                    <h2 className="bold">Incoming Rides</h2>
                </div>
                {endingRides.length > 0 ? (
                    endingRides.map((ride) => (
                        <Ridecard key={ride.id} ride={ride} stationLocation={station.location}></Ridecard>
                    ))
                ) : (
                    <p>No Rides Currently Available</p>
                )}
                <div className="proceed">
                    <div className="proceed-btn-container flex center ">
                        <button className="proceed-btn primary-bg white-text bold" onClick={handleProceed}>
                            Book Now
                        </button>
                    </div>
                </div>
                {showPopup && <Popup message={popupMessage} handleContinue={() => setShowPopup(false)}></Popup>}
            </>
        );
};
export default Station;
