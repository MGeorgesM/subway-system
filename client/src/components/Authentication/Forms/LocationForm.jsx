import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationCrosshairs } from '@fortawesome/free-solid-svg-icons';

import { sendRequest } from '../../../core/tools/apiRequest';
import { requestMethods } from '../../../core/tools/apiRequestMethods';

import Map from '../../../components/Map/Map';

const LocationForm = () => {
    const [submittedLocation, setSubmittedLocation] = useState('');
    const [locationCoordinates, setLocationCoordinates] = useState([]);
    const [location, setLocation] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        localStorage.setItem('location', JSON.stringify(locationCoordinates));
    }, [locationCoordinates]);

    const handleLocationSubmit = async () => {
        if (locationCoordinates.length > 0) {
            const data = new FormData();
            data.append('lat', locationCoordinates[0]);
            data.append('lng', locationCoordinates[1]);

            try {
                const response = await sendRequest(requestMethods.POST, '/users/update', data);
                if (response.status === 200) {
                    navigate('/browse');
                } else {
                    throw new Error();
                }
            } catch (error) {
                console.log(error.response.data.message);
            }
        } else {
            setSubmittedLocation(location);
        }
    };

    const handleLocationRetrieval = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                setLocationCoordinates([latitude, longitude]);
            });
        } else {
            return;
        }
    };

    return (
        <div className="form-component flex center">
            <div className="location-form border flex center border-radius box-shadow">
                <div className="field input-container flex column center">
                    <h1 className="regular">Where are you?</h1>
                    <input
                        className="border-radius-l border input-btn-lg"
                        type="text"
                        name="location"
                        placeholder="Location"
                        onChange={(e) => setLocation(e.target.value)}
                        required
                    />
                    <FontAwesomeIcon
                        icon={faLocationCrosshairs}
                        className="getlocation-btn light-text"
                        onClick={handleLocationRetrieval}
                    />
                    <button
                        className="location-btn primary-bg white-text box-shadow border-radius-l input-btn-lg"
                        onClick={handleLocationSubmit}
                    >
                        {locationCoordinates.length > 0 ? 'Continue' : 'Submit'}
                    </button>
                </div>
                <div className="map-container">
                    <Map
                        locationCoordinatesInput={locationCoordinates}
                        locationTextInput={submittedLocation}
                        saveLocationCoordinates={setLocationCoordinates}
                        updateLocation={true}
                    ></Map>
                </div>
            </div>
        </div>
    );
};

export default LocationForm;
