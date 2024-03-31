import React from 'react';
import { useState } from 'react';
import Map from '../../../components/Map/Map';

const LocationForm = () => {
    const [location, setLocation] = useState('');

    return (
        <div className="location-form border flex center light-gray-bg border-radius box-shadow">
            <div className="input-container flex column center">
                <h1 className='regular'>Where are you?</h1>
                <input className='border-radius-l border input-btn-lg' type="text" name="location" placeholder='Location' required />
                <button className="location-btn primary-bg white-text box-shadow border-radius-l input-btn-lg">{location ? 'Continue' : 'Submit'}</button>
            </div>
            <div className="map-container">
                <Map></Map>
            </div>
        </div>
    );
};

export default LocationForm;
