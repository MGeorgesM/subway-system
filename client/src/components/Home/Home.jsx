import { useEffect, useState } from 'react';

import Map from '../Map/Map';
import Ad from './Ad/Ad';
import Loading from '../Elements/Loading/Loading';

import { sendRequest } from '../../core/tools/apiRequest';
import { requestMethods } from '../../core/tools/apiRequestMethods';
import { findNearestStation } from '../../core/tools/calculateDistance';

import { getUserLocation } from '../../core/tools/getUserLocation';

import './index.css';

const Home = () => {
    const [nearestStation, setNearestStation] = useState(null);
    const [topStation, setTopStation] = useState(null);
    const [location, setLocation] = useState([]);
    const [stations, setStations] = useState([]);
    const [search, setSearch] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isMapLoading, setIsMapLoading] = useState(true);

    const storedLocation = JSON.parse(localStorage.getItem('location'));
    const defaultLocation = [33.88863, 35.49548];

    const [userLocation, setUserLocation] = useState(
        storedLocation && storedLocation.length > 0 ? storedLocation : defaultLocation
    );

    useEffect(() => {
        const getStations = async () => {
            try {
                const response = await sendRequest(requestMethods.GET, '/stations/getAll', null);
                if (response.status === 200) {
                    let nearestStation = findNearestStation(response.data.stations, userLocation[0], userLocation[1]);
                    const nearestStationRatingRequest = await sendRequest(
                        requestMethods.GET,
                        `/reviews/average?stationId=${nearestStation.id}`,
                        null
                    );
                    nearestStation = { ...nearestStation, rating: nearestStationRatingRequest.data.station_rating };
                    setNearestStation(nearestStation);
                    setStations(response.data);
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
                    setIsLoading(false);
                } else {
                    throw new Error();
                }
            } catch (error) {
                console.log(error.response.data.message);
            }
        };
        // const getRides = async () => {
        //     try {
        //         const response = await sendRequest(requestMethods.GET, '/rides/getAll', null);
        //         if (response.status === 200) {
        //             console.log('rides', response.data.rides);
        //         } else {
        //             throw new Error();
        //         }
        //     } catch (error) {
        //         console.log(error.response.data.message);
        //     }
        // };
        getStations();
        getTopStation();
        // getRides();
        setLocation(userLocation);
        console.log('isMapLoading', isMapLoading);
    }, []);

    return (
        <>
            {!nearestStation && !topStation && <Loading />}
            {nearestStation && topStation && (
                <>
                    <div className="main white-bg flex column">
                        <div className="welcome-home">
                            <h2>Step Into</h2>
                            <h1>The World of Onwards</h1>
                        </div>
                        <Map
                            locationTextInput={search}
                            saveLocationCoordinates={setLocation}
                            markersInput={stations}
                            setIsMapLoading={setIsMapLoading}
                            userLocationProp={location}
                        ></Map>
                        <div className="home-search">
                            <input
                                className="input-btn-lg border-dark border-radius-l off-white-bg-trsp"
                                type="text"
                                placeholder="Search for available stations..."
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
                        <Ad
                            count={1}
                            adTypeName={'Your Nearest Station'}
                            avgRating={nearestStation.rating}
                            name={nearestStation.name}
                            stationId={nearestStation.id}
                        />
                        <Ad
                            count={2}
                            adTypeName={'Our Most Popular'}
                            avgRating={topStation.rating}
                            name={topStation.name}
                            stationId={topStation.id}
                        />
                    </div>
                </>
            )}
        </>
    );
};

export default Home;
