import { useState , useEffect } from 'react';

import { useSearchParams } from 'react-router-dom';
import { sendRequest } from '../../core/tools/apiRequest';
import { requestMethods } from '../../core/tools/apiRequestMethods';

import './index.css';


const Station = () => {
    const [station, setStation] = useState(null);
    const [avgRating, setAvgRating] = useState(0);
    const [startingRides, setStartingRides] = useState([]);
    const [endingRides, setEndingRides] = useState([]);
    const [searchParams] = useSearchParams();

    const stationId = searchParams.get('id');
    console.log('stationId', stationId);

    useEffect(() => {
        const getStation = async () => {
            try {
                const response = await sendRequest(requestMethods.GET, `/stations/get/${stationId}`, null);
                if (response.status === 200) {
                    setStation(response.data.station);
                    setAvgRating(response.data.rating);
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


    return <div>{stationId}</div>;
};

export default Station;
