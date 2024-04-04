import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';

import { Icon } from 'leaflet';
import { formatTime } from '../../core/tools/formatTime';
import { getUserLocation, defaultLocation } from '../../core/tools/getUserLocation';

import './index.css';
import 'leaflet/dist/leaflet.css';

const Map = ({
    locationCoordinatesInput,
    locationTextInput,
    markersInput,
    saveLocationCoordinates,
    userLocationProp,
    updateLocation = false,
    showUserLocation = true,
}) => {
    const [userLocation, setUserLocation] = useState(
        updateLocation ? null : userLocationProp ? userLocationProp : getUserLocation()
    );

    const navigate = useNavigate();

    useEffect(() => {
        if (locationTextInput || locationCoordinatesInput) {
            handleInput();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [locationTextInput, locationCoordinatesInput, markersInput]);

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

        return <Marker position={userLocation} icon={customUserIcon}></Marker>;
    };

    const handleInput = async () => {
        const apiKey = '660737a1376dd241495384iohcb525f';

        if (locationCoordinatesInput && locationCoordinatesInput.length > 0) {
            // saveLocationCoordinates && saveLocationCoordinates([locationCoordinatesInput[0], locationCoordinatesInput[1]]);
            setUserLocation([locationCoordinatesInput[0], locationCoordinatesInput[1]]);
            return;
        }

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
        iconUrl: './images/assets/user-marker.svg',
        iconSize: [20, 20],
    });

    const customMarkIcon = new Icon({
        iconUrl: './images/assets/station-marker.svg',
        iconSize: [30, 30],
    });

    return (
        <>
            <MapContainer
                center={userLocation ? userLocation : defaultLocation}
                scrollWheelZoom={false}
                zoom={13}
                zoomControl={false}
                attributionControl={false}
                // whenReady={() => setIsMapLoading(false)}
            >
                <TileLayer url="https://tile.jawg.io/jawg-dark/{z}/{x}/{y}{r}.png?access-token=mAcRzbD1ube5o9h5uLquwxDCBvrejwwAbGRwYBhNElxs0oz896WWl2JIy9QQn7pN" />
                {markersInput &&
                    markersInput.stations &&
                    markersInput.stations.map((station) => (
                        <Marker key={station.id} position={[station.lat, station.lng]} icon={customMarkIcon}>
                            <Popup>
                                <div className="popup-text">
                                    <h3 onClick={() => navigate(`/station?id=${station.id}`)}>{station.name}</h3>
                                    <p>{station.location}</p>
                                    <p>
                                        {formatTime(station.opening_time)} till {formatTime(station.closing_time)}
                                    </p>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                ;{userLocation !== null && showUserLocation && <LocationMarker />}
            </MapContainer>
        </>
    );
};

export default Map;
