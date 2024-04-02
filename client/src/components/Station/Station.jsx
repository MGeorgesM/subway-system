import { useState, useEffect } from 'react';

import { useSearchParams, useNavigate } from 'react-router-dom';
import { sendRequest } from '../../core/tools/apiRequest';
import { requestMethods } from '../../core/tools/apiRequestMethods';
import { formatTime } from '../../core/tools/formatTime';

import Map from '../Map/Map';
import Ridecard from './Ridecard/Ridecard';
import Popup from '../Elements/Popup/Popup';

import './index.css';


const Station = () => {
    const [stations, setStations] = useState([]);
    const [station, setStation] = useState(null);
    const [startingRides, setStartingRides] = useState([]);
    const [endingRides, setEndingRides] = useState([]);
    const [searchParams] = useSearchParams();
    const [selectedRide, setSelectedRide] = useState('');

    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');

    const stationId = parseInt(searchParams.get('id'));

    const navigate = useNavigate();

    useEffect(() => {
        const getStations = async () => {
            try {
                const response = await sendRequest(requestMethods.GET, `/stations/getAll`, null);
                if (response.status === 200) {
                    const station = response.data.stations.find((station) => station.id === stationId);
                    setStations(response.data);
                    setStation(station);
                } else {
                    throw new Error();
                }
            } catch (error) {
                console.log(error.response.data.message);
            }
        };

        const getRides = async () => {
            try {
                const response = await sendRequest(requestMethods.GET, '/rides/getAll', null);
                if (response.status === 200) {
                    const startingRides = response.data.rides.filter((ride) => ride.start_station_id === stationId);
                    const endingRides = response.data.rides.filter((ride) => ride.end_station_id === stationId);
                    setStartingRides(startingRides);
                    setEndingRides(endingRides);
                    console.log('startingRides', startingRides);
                    console.log('endingRides', endingRides);
                } else {
                    throw new Error();
                }
            } catch (error) {
                console.log(error.response.data.message);
            }
        };

        getStations();
        getRides();
    }, [stationId]);

    const addRide = (rideId) => {
        selectedRide === rideId ? setSelectedRide('') : setSelectedRide(rideId);
    };

    const handleProceed = () => {
        console.log('Proceed', selectedRide);
        if (!selectedRide) {
            setPopupMessage('Please select a ride to proceed');
            setShowPopup(true);
            return;
        }
        navigate(`/ticket?stationid=${stationId}&rideid=${selectedRide}`);
    };

    if (station)
        return (
            <>
                <div className="main-station white-bg flex column">
                    <Map locationTextInput={station.location} markersInput={stations}></Map>
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
                            <i className="fa-regular fa-star"></i>
                            <i className="fa-regular fa-star"></i>
                            <i className="fa-regular fa-star"></i>
                            <i className="fa-regular fa-star"></i>
                            <i className="fa-regular fa-star"></i>
                        </div>
                        <div className="facilities">
                            <i className="fa-regular fa-star"></i>
                            <i className="fa-regular fa-star"></i>
                            <i className="fa-regular fa-star"></i>
                            <i className="fa-regular fa-star"></i>
                            <i className="fa-regular fa-star"></i>
                            <i className="fa-regular fa-star"></i>
                            <i className="fa-regular fa-star"></i>
                        </div>
                    </div>
                </div>
                <div className="section-header">
                    <h2 className="bold">Outgoing Rides</h2>
                </div>
                {startingRides.length > 0 ? (
                    startingRides.map((ride) => (
                        <Ridecard key={ride.id} ride={ride} addRide={addRide} selectedRide={selectedRide} stationName={station.name}></Ridecard>
                    ))
                ) : (
                    <p>No rides found</p>
                )}
                <div className="section-header">
                    <h2 className="bold">Incoming Rides</h2>
                </div>
                {endingRides.length > 0 ? (
                    endingRides.map((ride) => <Ridecard key={ride.id} ride={ride} stationName={station.name}></Ridecard>)
                ) : (
                    <p>No rides found</p>
                )}
                <div className="proceed">
                    <div className="proceed-btn-container flex center ">
                        <button className="proceed-btn primary-bg white-text bold" onClick={handleProceed}>Book Now</button>
                    </div>
                </div>
                {showPopup && <Popup message={popupMessage} handleContinue={() => setShowPopup(false)}></Popup>}
            </>
        );
};
export default Station;
