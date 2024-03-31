import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Map from '../../../components/Map/Map';

import { sendRequest } from '../../../core/tools/apiRequest';
import { requestMethods } from '../../../core/tools/apiRequestMethods';


const LocationForm = () => {
    const [submittedLocation, setSubmittedLocation] = useState('');
    const [locationCoordinates, setLocationCoordinates] = useState({});
    const [location, setLocation] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        localStorage.setItem('location', JSON.stringify(locationCoordinates));
        
    }, [locationCoordinates]);

    const handleLocationSubmit = async () => {
        if (locationCoordinates) {
            const data = new FormData();
            data.append('lat', locationCoordinates[0]);
            data.append('lng', locationCoordinates[1]);

            
            try {
                console.log(data)
                const response =  await sendRequest(requestMethods.POST, '/users/update', data);
                console.log(response);
                
                            if (response.status === 200) {
                                navigate('/');
                            }
                
            } catch (error) {
                console.log(error);
            }

        } else {
            setSubmittedLocation(location);
        }
    };

    const saveLocationCoordinates = (coordinates) => {
        setLocationCoordinates(coordinates);
    };

    return (
        <div className="location-form border flex center light-gray-bg border-radius box-shadow">
            <div className="input-container flex column center">
                <h1 className="regular">Where are you?</h1>
                <input
                    className="border-radius-l border input-btn-lg"
                    type="text"
                    name="location"
                    placeholder="Location"
                    onChange={(e) => setLocation(e.target.value)}
                    required
                />
                <button
                    className="location-btn primary-bg white-text box-shadow border-radius-l input-btn-lg"
                    onClick={handleLocationSubmit}
                >
                    {locationCoordinates ? 'Continue' : 'Submit'}
                </button>
            </div>
            <div className="map-container">
                <Map locationTextInput={submittedLocation} saveLocationCoordinates={saveLocationCoordinates}></Map>
            </div>
        </div>
    );
};

export default LocationForm;
