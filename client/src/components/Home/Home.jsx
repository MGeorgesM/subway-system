import { useEffect, useState } from 'react';

import Map from '../Map/Map';

import { sendRequest } from '../../core/tools/apiRequest';
import { requestMethods } from '../../core/tools/apiRequestMethods';

import './index.css';

const Home = () => {
    const [location, setLocation] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const userLocation = JSON.parse(localStorage.getItem('location'));
        const getStationsResponse = await sendRequest(requestMethods.GET, 'stations')
        setLocation(userLocation);
        console.log(userLocation);
    }, []);



    return (
        <div className="main flex column center">
            <Map locationTextInput={search} saveLocationCoordinates={setLocation}></Map>
            <div className="search">
                <input
                    className="input-btn-lg border-dark border-radius-l off-white-bg-trsp"
                    type="text"
                    placeholder="Search for nearest stations"
                    onKeyUp={(e) => e.key === 'Enter' && setSearch(e.target.value)}
                ></input>
            </div>
        </div>
    );
};

export default Home;
