import { useState, useEffect } from 'react';

import { useSearchParams } from 'react-router-dom';
import { sendRequest } from '../../core/tools/apiRequest';
import { requestMethods } from '../../core/tools/apiRequestMethods';

import Map from '../Map/Map';
import Ridecard from './Ridecard/Ridecard';

import './index.css';

const Station = () => {
    const [stations, setStations] = useState([]);
    const [station, setStation] = useState(null);

    const [startingRides, setStartingRides] = useState([]);
    const [endingRides, setEndingRides] = useState([]);
    const [searchParams] = useSearchParams();

    const stationId = searchParams.get('id');
    console.log('stationId', stationId);

    useEffect(() => {
        const getStation = async () => {
            try {
                const response = await sendRequest(requestMethods.GET, `/stations/getAll`, null);
                if (response.status === 200) {
                    setStations(response.data.stations);
                    const station = response.data.stations.find((station) => station.id === stationId);
                    setStation(station);
                    console.log('station', response.data);
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

        getStation();
        getRides();
    }, [stationId]);

    return (
        <>
            <div className="main-station white-bg flex column">
                <Map locationTextInput={[station?.lat, station?.lng]} markersInput={stations}></Map>
            </div>
            <div className="section-header flex space-between">
                <div className="header-text">
                    <h1>{STATION NAME}</h1>
                    <h3>Location - STATUS</h3>
                    <p>Opens at</p>
                    <p>Closes at</p>
                </div>
                <div className="header-icons flex column center">
                    <div className="rating">
                        <i class="fa-regular fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                    </div>
                    <div className="facilities">
                        <i class="fa-regular fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                    </div>
                </div>
            </div>
            <div className="section-header">
                <h2 className="bold">Outgoing Rides</h2>
            </div>
            {startingRides.length > 0 ? (
                startingRides.map((ride) => <Ridecard key={ride.id} ride={ride}></Ridecard>)
            ) : (
                <p>No rides found</p>
            )}
            <div className="section-header">
                <h2 className="bold">Incoming Rides</h2>
            </div>
            {endingRides.length > 0 ? (
                endingRides.map((ride) => <Ridecard key={ride.id} ride={ride}></Ridecard>)
            ) : (
                <p>No rides found</p>
            )}
        </>
    );
};

export default Station;
