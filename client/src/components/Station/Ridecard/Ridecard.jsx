import { useEffect, useState } from 'react';

import { sendRequest } from '../../../core/tools/apiRequest';
import { requestMethods } from '../../../core/tools/apiRequestMethods';
import { formatTime } from '../../../core/tools/formatTime';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const Ridecard = ({ ride, addRide, selectedRide, stationId, stationName }) => {
    const [startSation, setStartStation] = useState(null);
    const [endStation, setEndStation] = useState(null);

    const { id, name, price, start_time, end_time, start_station_id, end_station_id } = ride;

    useEffect(() => {
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
        getStartStation();
        getEndStation();
    }, [start_station_id, end_station_id]);

    return (
        <div className="rides-container flex column">
            <div className="ride-card flex space-around light-gray-bg box-shadow border">
                {addRide ? (
                    <div className="name-rating flex space-between">
                        <h3>{name}</h3>
                        <div className="rating flex center">
                            <FontAwesomeIcon icon={faStar} color="#6D6B6C" />
                            <FontAwesomeIcon icon={faStar} color="#6D6B6C" />
                            <FontAwesomeIcon icon={faStar} color="#6D6B6C" />
                            <FontAwesomeIcon icon={faStar} color="#6D6B6C" />
                            <FontAwesomeIcon icon={faStar} color="#6D6B6C" />
                        </div>
                    </div>
                ) : (
                    <div className="name-rating flex center">
                        <h3>{name}</h3>
                    </div>
                )}
                <div className="destinations flex center">
                    <div className="time-location-display flex column center">
                        <h3 className="location">{startSation}</h3>
                        <h3 className="time">{formatTime(start_time)}</h3>
                    </div>
                    <div className="arrow">
                        <img src="./images/assets/arrow.svg" alt="arrow" />
                    </div>
                    <div className="time-location-display flex column center">
                        <h3 className="location">{endStation}</h3>
                        <h3 className="time">{formatTime(end_time)}</h3>
                    </div>
                </div>
                {addRide ? (
                    <div className="price-select flex space-between">
                        <p>${price}</p>
                        <button
                            className={`select-btn border-radius-m box-shadow ${
                                selectedRide === id ? 'clicked' : 'primary-bg white-text'
                            } `}
                            onClick={() => addRide(id)}
                        >
                            {selectedRide === id ? 'Remove' : 'Select'}
                        </button>
                    </div>
                ) : (
                    <div className="name-rating flex center">
                        <div className="rating flex center">
                            <FontAwesomeIcon icon={faStar} color="#6D6B6C" />
                            <FontAwesomeIcon icon={faStar} color="#6D6B6C" />
                            <FontAwesomeIcon icon={faStar} color="#6D6B6C" />
                            <FontAwesomeIcon icon={faStar} color="#6D6B6C" />
                            <FontAwesomeIcon icon={faStar} color="#6D6B6C" />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Ridecard;
