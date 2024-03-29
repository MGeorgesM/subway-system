import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';


import './index.css';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';

const Map = () => {
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

    const customIcon = new Icon({
        iconUrl: 'https://cdn-icons-png.flaticon.com/512/2776/2776067.png',
        iconSize: [50, 50],
    });

    return (
        <MapContainer center={[33.88863, 35.49548]} zoom={13}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {stations.map((station) => (
                <Marker position={station.location} key={station.name} icon={customIcon}>
                    <Popup>{station.name}</Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default Map;
