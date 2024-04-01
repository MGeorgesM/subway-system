import { useEffect, useState } from 'react';

import Map from '../Map/Map';
import Ad from './Ad/Ad';

import { sendRequest } from '../../core/tools/apiRequest';
import { requestMethods } from '../../core/tools/apiRequestMethods';
import { findNearestStation } from '../../core/tools/calculateDistance';

import './index.css';

const Home = () => {
    const [nearestStation, setNearestStation] = useState(null);
    const [topStation, setTopStation] = useState(null);
    const [location, setLocation] = useState([]);
    const [stations, setStations] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const userLocation = JSON.parse(localStorage.getItem('location')) || [33.88863, 35.49548];
        const getStations = async () => {
            try {
                const response = await sendRequest(requestMethods.GET, '/stations/getAll', null);
                if (response.status === 200) {
                    const stationAvgRating = 
                    setStations(response.data);
                    const nearestStation = findNearestStation(response.data.stations, userLocation[0], userLocation[1]);
                    setNearestStation(nearestStation);
                    console.log('nearestStation', nearestStation);
                } else {
                    throw new Error();
                }
            } catch (error) {
                console.log(error.response.data.message);
            }
        };
        const getTopStation = async () => {
            try {
                const response = await sendRequest(requestMethods.GET, '/reviews/topstation', null);
                if (response.status === 200) {
                    setTopStation(response.data);
                    console.log('topStation', response.data);
                } else {
                    throw new Error();
                }
            } catch (error) {
                console.log(error.response.data.message);
            }
        };
        getStations();
        getTopStation();
        setLocation(userLocation);
    }, []);

    return (
        <>
            <div className="main white-bg flex column">
                <Map locationTextInput={search} saveLocationCoordinates={setLocation} markersInput={stations}></Map>
                <div className="search">
                    <input
                        className="input-btn-lg border-dark border-radius-l off-white-bg-trsp"
                        type="text"
                        placeholder="Search for nearest stations"
                        onKeyUp={(e) => e.key === 'Enter' && setSearch(e.target.value)}
                    ></input>
                </div>
            </div>
            <div className="recommendations white-bg">
                <div className="text">
                    <h1 className="bold">Recommended Stations</h1>
                    <h2>Discover top picks for your journey ahead</h2>
                </div>
            </div>
            <div className="stations flex center"></div>
            <div className="ads flex column center white-bg">
                <Ad count={1} adTypeName={'Your Nearest Station'} avgRating={} name={nearestStation.name} />
                <Ad count={2} adTypeName={'Our Most Popular'} avgRating={topStation.rating} name={topStation.name} />
            </div>
        </>
    );
};

export default Home;
