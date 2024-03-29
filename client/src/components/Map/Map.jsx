import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';

import './index.css';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';

const Map = () => {
    const [userLocation, setUserLocation] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    // useEffect(() => {
    //     if(userLocation && map) {
    //         map.flyTo(userLocation, map.getZoom());
    //     }
    // })

    useEffect(() => {
        console.log('userLocation', userLocation);
    }, [userLocation]);

    const stations = [
        {
            name: 'Station 1',
            location: [33.88863, 35.49548],
        },
        {
            name: 'Station 2',
            location: [33.895233, 35.484355],
        },
        {
            name: 'Station 3',
            location: [33.897927, 35.501713],
        },
        {
            name: 'Station 4',
            location: [33.887171, 35.501027],
        },
        {
            name: 'Station 5',
            location: [33.894708, 35.510307],
        },
    ];

    const LocationMarker = () => {
        const map = useMapEvents({
            click(e) {
                // map.locate();
                const { lat, lng } = e.latlng;
                map.flyTo([lat, lng], map.getZoom());
                setUserLocation([lat, lng]);
            },

        });
        
        useEffect(() => {
            console.log('running')
            if (userLocation && map) {
                map.flyTo(userLocation, map.getZoom());
            }
        }, [map]);


        // const map = useMapEvents({
        //     click(e) {
        //         map.locate();
        //         console.log(e.latlng)
        //         setUserLocation(e.latlng);
        //     },
        // locationfound(e) {
        //     setUserLocation(e.latlng);
        //     map.flyTo(e.latlng, map.getZoom());
        // },
        // });

        return userLocation === null ? null : (
            <Marker position={userLocation} icon={customUserIcon}>
                <Popup>You are here</Popup>
            </Marker>
        );
    };

    // const handleMapMove = () => {
    //     useMapEvents({
    //         flyTo(userLocation, map.getZoom()),
    //     });
    // };

    const handleSearch = async () => {
        const apiKey = '660737a1376dd241495384iohcb525f';
        console.log('searchquery', searchQuery);
        const response = await fetch(`https://geocode.maps.co/search?q=${searchQuery}&api_key=${apiKey}`);
        const data = await response.json();

        console.log('data', data);

        if (data.length > 0) {
            const { lat, lon } = data[0];
            setUserLocation([parseFloat(lat), parseFloat(lon)]);
        } else {
            console.log('No data found');
        }

    };

    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const customUserIcon = new Icon({
        iconUrl: 'https://cdn-icons-png.flaticon.com/512/2776/2776067.png',
        iconSize: [50, 50],
    });

    const customStationIcon = new Icon({
        iconUrl: 'https://cdn-icons-png.flaticon.com/512/6571/6571498.png',
        iconSize: [32, 32],
    });

    return (
        <div className="map-container">
            <div className="searh=container">
                <input type="text" value={searchQuery} onChange={handleInputChange} placeholder="Enter your city" />
                <button onClick={handleSearch}>Search</button>
            </div>
            <MapContainer center={userLocation ? userLocation : [33.88863, 35.49548]} zoom={13}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <TileLayer url="https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png" />

                {stations.map((station) => (
                    <Marker position={station.location} key={station.name} icon={customStationIcon}>
                        <Popup>{station.name}</Popup>
                    </Marker>
                ))}
                <LocationMarker />
            </MapContainer>
        </div>
    );
};

export default Map;
