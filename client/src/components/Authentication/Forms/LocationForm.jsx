import React, { useEffect } from 'react';
import { useState } from 'react';
import Map from '../../../components/Map/Map';

const LocationForm = () => {
    const [submittedLocation, setSubmittedLocation] = useState('');
    const [locationCoordinates, setLocationCoordinates] = useState({});
    const [location, setLocation] = useState('');

    useEffect(() => {
        console.log('Location Coordinates', locationCoordinates);
        localStorage.setItem('location', JSON.stringify(locationCoordinates));
    }, [locationCoordinates]);

    const handleLocationSubmit = () => {

        setSubmittedLocation(location);
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
