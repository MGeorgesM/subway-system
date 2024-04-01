import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';

import { Icon } from 'leaflet';
import { formatTime } from '../../core/tools/formatTime';

import './index.css';
import 'leaflet/dist/leaflet.css';


const Map = ({ locationTextInput, markersInput, saveLocationCoordinates }) => {
    const [userLocation, setUserLocation] = useState(
        JSON.parse(localStorage.getItem('location')).length > 0 ? JSON.parse(localStorage.getItem('location')) : null
    );
    const navigate = useNavigate();

    useEffect(() => {
        if (locationTextInput) {
            handleInput();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [locationTextInput, markersInput]);

    const LocationMarker = () => {
        const map = useMapEvents(
            {
                click(e) {
                    const { lat, lng } = e.latlng;
                    map.flyTo([lat, lng], map.getZoom());
                    setUserLocation([lat, lng]);
                    saveLocationCoordinates && saveLocationCoordinates([lat, lng]);
                },
            },
            locationTextInput
        );

        if (userLocation && map) {
            map.flyTo(userLocation, map.getZoom());
        }

        return userLocation === null ? null : <Marker position={userLocation} icon={customUserIcon}></Marker>;
    };

    const handleInput = async () => {
        const apiKey = '660737a1376dd241495384iohcb525f';

        try {
            const response = await fetch(`https://geocode.maps.co/search?q=${locationTextInput}&api_key=${apiKey}`);
            const data = await response.json();

            if (data.length > 0) {
                console.log('data', data[0]);
                const { lat, lon } = data[0];
                saveLocationCoordinates && saveLocationCoordinates([parseFloat(lat), parseFloat(lon)]);
                setUserLocation([parseFloat(lat), parseFloat(lon)]);
            } else {
                console.log('No data found');
            }
        } catch (error) {
            console.log('error', error);
        }
    };

    const customUserIcon = new Icon({
        iconUrl: 'https://cdn-icons-png.flaticon.com/512/2776/2776067.png',
        iconSize: [50, 50],
    });

    const customMarkIcon = new Icon({
        iconUrl: 'https://cdn-icons-png.flaticon.com/512/6571/6571498.png',
        iconSize: [32, 32],
    });

    return (
        <>
            {/* <div className="searh=container">
                <input type="text" value={searchQuery} onChange={handleInputChange} placeholder="Enter your city" />
                <button onClick={handelInput}>Search</button>
            </div> */}
            <MapContainer
                center={userLocation ? userLocation : [33.88863, 35.49548]}
                scrollWheelZoom={false}
                zoom={13}
                zoomControl={false}
                attributionControl={false}
            >
                <TileLayer url="https://tile.jawg.io/jawg-dark/{z}/{x}/{y}{r}.png?access-token=mAcRzbD1ube5o9h5uLquwxDCBvrejwwAbGRwYBhNElxs0oz896WWl2JIy9QQn7pN" />
                {markersInput &&
                    markersInput.stations &&
                    markersInput.stations.map((station) => (
                        <Marker key={station.id} position={[station.lat, station.lng]} icon={customMarkIcon}>
                            <Popup>
                                <div className='popup-text'>
                                    <h3>{station.name}</h3>
                                    <p>{station.location}</p>
                                    <p>Open from {formatTime(station.opening_time)} til {formatTime(station.closing_time)}</p>
                                    <p onClick={() => navigate(`/station?id=${station.id}`)}>More Info</p>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                ;
                <LocationMarker />
            </MapContainer>
        </>
    );
};

export default Map;
