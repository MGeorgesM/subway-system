import React from 'react';

const Ridecard = ({ride}) => {

    const {name, price, start_time, end_time, start_station_id, end_station_id} = ride;

    return (
        <div className="rides-container flex column">
            <div className="ride-card flex space-around light-gray-bg box-shadow border-radius-l">
                <div className="name-price flex center">
                    <h3>{name}</h3>
                    <p>{price}</p>
                </div>
                <div className="destinations flex center">
                    <div className="time-location-display flex column center">
                        <h3 className="location">{start_station_id}</h3>
                        <h3 className="time">{start_time}</h3>
                    </div>
                    <div className="arrow">
                        <img src="./images/assets/arrow.svg" alt="arrow" />
                    </div>
                    <div className="time-location-display flex column center">
                        <h3 className="location">{end_station_id}</h3>
                        <h3 className="time">{end_time}</h3>
                    </div>
                </div>
                <div className="rating-select flex">
                    <div className="rating flex center">
                        <i class="fa-regular fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                    </div>
                    <button className="select-btn primary-bg border-radius-m box-shadow white-text">Select</button>
                </div>
            </div>
        </div>
    );
};

export default Ridecard;
