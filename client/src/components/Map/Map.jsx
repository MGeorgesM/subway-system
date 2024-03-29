import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';

import './index.css';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';

const Map = () => {
    const [userLocation, setUserLocation] = useState(null);

    const LocationMarker = () => {
        useMapEvents({
            click(e) {
                // map.locate();
                console.log(e.latlng);
                setUserLocation(e.latlng);
            },
        });

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

    const customUserIcon = new Icon({
        iconUrl: 'https://cdn-icons-png.flaticon.com/512/2776/2776067.png',
        iconSize: [50, 50],
    });

    const customStationIcon = new Icon({
        iconUrl: 'https://cdn-icons-png.flaticon.com/512/6571/6571498.png',
        iconSize: [50, 50],
    });

    return (
        <MapContainer center={[33.88863, 35.49548]} zoom={13}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <TileLayer url="https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png" />

            {stations.map((station) => (
                <Marker position={station.location} key={station.name} icon={customStationIcon}>
                    <Popup>{station.name}</Popup>
                </Marker>
            ))}
            <LocationMarker />
        </MapContainer>
    );
};

export default Map;
