import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

import { sendRequest } from '../../core/tools/apiRequest';
import { requestMethods } from '../../core/tools/apiRequestMethods';

export const useStationLogic = () => {
    // const [stationsData, setStationsData] = useState({
    //     stations: '',
    //     station: '',
    //     rating: '',
    //     startingRides: '',
    //     endingRides: '',
    // });

    const [stations, setStations] = useState([]);
    const [station, setStation] = useState(null);
    const [stationRating, setStationRating] = useState(0);
    const [startingRides, setStartingRides] = useState([]);
    const [endingRides, setEndingRides] = useState([]);

    const [searchParams] = useSearchParams();
    const [selectedRide, setSelectedRide] = useState('');

    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');

    // const [isLoading, setIsLoading] = useState(true);
    const [isMapLoading, setIsMapLoading] = useState(true);

    const stationId = parseInt(searchParams.get('id'));

    const navigate = useNavigate();

    const getStations = async () => {
        try {
            const response = await sendRequest(requestMethods.GET, `/stations/getAll`, null);
            if (response.status === 200) {
                const station = response.data.stations.find((station) => station.id === stationId); // setStationsData({ ...stationsData, station: station, stations: response.data.stations });
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

                // setStationsData({ ...stationsData, startingRides: startingRides, endingRides: endingRides });
                setStartingRides(startingRides);
                setEndingRides(endingRides);
            } else {
                throw new Error();
            }
        } catch (error) {
            console.log(error.response.data.message);
        }
    };

    const getAvgRating = async () => {
        try {
            const response = await sendRequest(requestMethods.GET, `/reviews/average?stationId=${stationId}`, null);
            if (response.status === 200) {
                // setStationsData({ ...stationsData, rating: response.data.station_rating });
                setStationRating(response.data.station_rating);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleProceed = () => {
        console.log('Proceed', selectedRide);
        if (!selectedRide) {
            setPopupMessage('Please select a ride to proceed');
            setShowPopup(true);
            return;
        }
        const token = localStorage.getItem('token');
        token ? navigate(`/ticket?stationid=${stationId}&rideid=${selectedRide}`) : navigate('/auth');
    };

    const addRide = (rideId) => {
        selectedRide === rideId ? setSelectedRide('') : setSelectedRide(rideId);
    };

    useEffect(() => {
        getStations();
        getRides();
        getAvgRating();
    }, [stationId]);
    
    return {
        stations,
        station,
        stationRating,
        startingRides,
        endingRides,
        selectedRide,
        showPopup,
        popupMessage,
        isMapLoading,
        handleProceed,
        addRide,
    };
};
