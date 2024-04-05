import { useState, useEffect } from 'react';

import { getUserLocation } from '../../core/tools/getUserLocation';
import { sendRequest } from '../../core/tools/apiRequest';
import { requestMethods } from '../../core/tools/apiRequestMethods';
import { findNearestStation } from '../../core/tools/calculateDistance';

export const useHomeLogic = () => {
    
    const [showWelcome, setShowWelcome] = useState(true);
    const [stations, setStations] = useState([]);
    const [nearestStation, setNearestStation] = useState(null);
    const [topStation, setTopStation] = useState(null);
    const [search, setSearch] = useState('');
    const [userLocation, setUserLocation] = useState(getUserLocation);

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
                } else {
                    throw new Error();
                }
            } catch (error) {
                console.log(error.response.data.message);
            }
        };
        getStations();
        getTopStation();
    }, []);

    return {
        showWelcome,
        setShowWelcome,
        stations,
        setStations,
        nearestStation,
        setNearestStation,
        topStation,
        setTopStation,
        search,
        setSearch,
        userLocation,
        setUserLocation,
    };
};
