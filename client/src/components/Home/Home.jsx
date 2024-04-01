import { useEffect, useState } from 'react';

import Map from '../Map/Map';
import Ad from './Ad/Ad';

import { sendRequest } from '../../core/tools/apiRequest';
import { requestMethods } from '../../core/tools/apiRequestMethods';

import './index.css';

const Home = () => {
    const [location, setLocation] = useState([]);
    const [stations, setStations] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const userLocation = JSON.parse(localStorage.getItem('location'));
        const getStations = async () => {
            try {
                const response = await sendRequest(requestMethods.GET, '/stations/getAll', null);
                if (response.status === 200) {
                    console.log(response.data);
                    setStations(response.data);
                } else {
                    throw new Error();
                }
            } catch (error) {
                console.log(error.response.data.message);
            }
        };
        getStations();
        setLocation(userLocation);
        console.log(userLocation);
    }, []);

    return (
        <>
            <div className="main white-bg flex column">
                <Map locationTextInput={search} saveLocationCoordinates={setLocation} markersInput={stations}></Map>
                <div className="search">
                    <input
                        className="input-btn-lg border-dark border-radius-l off-white-bg-trsp"
                        type="text"
                        placeholder="Search for nearest stations"
                        onKeyUp={(e) => e.key === 'Enter' && setSearch(e.target.value)}
                    ></input>
                </div>
            </div>
            <div className="recommendations white-bg">
                <div className="text">
                    <h1 className="bold">Recommended Stations</h1>
                    <h2>Discover top picks for your journey ahead</h2>
                </div>
            </div>
            <div className="stations flex center"></div>
            <div className="ads flex column center white-bg">
                <Ad count={1} adTypeName={'Your Nearest Station'} avgRating={5} name={'Beirut Express'} />
                <Ad count={2} adTypeName={'Our Most Popular'} avgRating={5} name={'Beirut Express'} />
            </div>
        </>
    );
};

export default Home;
