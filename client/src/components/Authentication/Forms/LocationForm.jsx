import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Map from '../../../components/Map/Map';

import { sendRequest } from '../../../core/tools/apiRequest';
import { requestMethods } from '../../../core/tools/apiRequestMethods';

const LocationForm = () => {
    const [submittedLocation, setSubmittedLocation] = useState('');
    const [locationCoordinates, setLocationCoordinates] = useState([]);
    const [location, setLocation] = useState('');

    const navigate = useNavigate();
    console.log(locationCoordinates);

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

    const saveLocationCoordinates = (coordinates) => {
        setLocationCoordinates(coordinates);
    };

    const handleLocationRetrieval = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                console.log(position);
                const { latitude, longitude } = position.coords;
                setLocationCoordinates([latitude, longitude]);
            });
        } else {
            console.log('Geolocation is not supported by this browser.');
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
                    <i
                        className="light-text getlocation-btn fa-solid fa-location-crosshairs"
                        onClick={handleLocationRetrieval}
                    ></i>
                    <button
                        className="location-btn primary-bg white-text box-shadow border-radius-l input-btn-lg"
                        onClick={handleLocationSubmit}
                    >
                        {locationCoordinates.length > 0 ? 'Continue' : 'Submit'}
                    </button>
                    {/* <div className="skip-prompt">
                        <p className="light-text">Skip for now</p>
                    </div> */}
                </div>
                <div className="map-container">
                    <Map locationTextInput={submittedLocation} saveLocationCoordinates={saveLocationCoordinates} updateLocation={true}></Map>
                </div>
            </div>
        </div>
    );
};

export default LocationForm;
