import { useEffect, useState } from 'react';

import { sendRequest } from '../../../core/tools/apiRequest';
import { requestMethods } from '../../../core/tools/apiRequestMethods';
import { formatTime } from '../../../core/tools/formatTime';

import StarsRating from '../../Elements/StarsRating/StarsRating';
import Button from '../../Elements/Button/Button';

const Ridecard = ({ ride, addRide, selectedRide, stationLocation }) => {
    const [startSation, setStartStation] = useState(addRide ? stationLocation : null);
    const [endStation, setEndStation] = useState(addRide ? null : stationLocation);
    const [rideRating, setRideRating] = useState(0);

    const { id, name, price, start_time, end_time, start_station_id, end_station_id } = ride;

    const getStartStation = async () => {
        try {
            const response = await sendRequest(requestMethods.GET, `/stations/get/${start_station_id}`, null);
            if (response.status === 200) {
                setStartStation(response.data.station.location);
            } else {
                throw new Error();
            }
        } catch (error) {
            console.log(error.response.data.message);
        }
    };
    const getEndStation = async () => {
        try {
            const response = await sendRequest(requestMethods.GET, `/stations/get/${end_station_id}`, null);
            if (response.status === 200) {
                setEndStation(response.data.station.location);
            } else {
                throw new Error();
            }
        } catch (error) {
            console.log(error.response.data.message);
        }
    };

    const getAvgRating = async () => {
        try {
            const response = await sendRequest(requestMethods.GET, `/reviews/average?rideId=${id}`, null);
            if (response.status === 200) {
                setRideRating(response.data.ride_rating);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        !startSation && getStartStation();
        !endStation && getEndStation();
        getAvgRating();
    }, [start_station_id, end_station_id]);

    const LocationDisplay = ({ stationLocation, time }) => {
        return (
            <div className="time-location-display flex column center">
                <h3 className="location">{stationLocation}</h3>
                <h3 className="time">{formatTime(time)}</h3>
            </div>
        );
    };

    return (
        <div className="rides-container flex column">
            <div className="ride-card flex space-around light-gray-bg box-shadow border">
                {addRide ? (
                    <div className="name-rating flex space-between">
                        <h3>{name}</h3>
                        <div className="rating flex center">
                            <StarsRating rating={rideRating} />
                        </div>
                    </div>
                ) : (
                    <div className="name-rating flex center">
                        <h3>{name}</h3>
                    </div>
                )}
                <div className="destinations flex center">
                    <LocationDisplay stationLocation={startSation} time={start_time} />
                    <div className="arrow">
                        <img src="./images/assets/arrow.svg" alt="arrow" />
                    </div>
                    <LocationDisplay stationLocation={endStation} time={end_time} />
                </div>
                {addRide ? (
                    <div className="price-select flex space-between">
                        <p>${price}</p>
                        <Button
                            clickHandler={() => addRide(id)}
                            type={selectedRide === id ? 'secondary-btn' : 'primary-btn'}
                            size={'btn-s'}
                            text={selectedRide === id ? 'Remove' : 'Select'}
                        />
                    </div>
                ) : (
                    <div className="name-rating flex center">
                        <div className="rating flex center">
                            <StarsRating rating={rideRating} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Ridecard;
