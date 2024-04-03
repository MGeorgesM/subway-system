import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faToilet,
    faUtensils,
    faParking,
    faWifi,
    faMoneyBillAlt,
    faClinicMedical,
    faShoppingCart,
} from '@fortawesome/free-solid-svg-icons';

import { sendRequest } from '../../../core/tools/apiRequest';
import { requestMethods } from '../../../core/tools/apiRequestMethods';

const Facilities = ({ stationId }) => {
    const [facilities, setFacilities] = useState([]);

    const getFacilities = async () => {
        try {
            const response = await sendRequest(requestMethods.GET, `/stationsfacilities/get?id=${stationId}`);
            if (response.status === 200) {
                console.log('facilities', response.data.stationFacilities[0].facility.name)
                setFacilities(response.data.stationFacilities);
            } else {
                throw new Error();
            }
        } catch (error) {
            console.log(error.response.data.message);
        }
    };

    useEffect(() => {
        getFacilities();
    }, [stationId]);

    const renderFacilityIcon = (name) => {
        switch (name.toLowerCase()) {
            case 'toilets':
                return <FontAwesomeIcon icon={faToilet} color="#6D6B6C" />;
            case 'restaurant':
                return <FontAwesomeIcon icon={faUtensils} color="#6D6B6C" />;
            case 'parking':
                return <FontAwesomeIcon icon={faParking} color="#6D6B6C" />;
            case 'wifi':
                return <FontAwesomeIcon icon={faWifi} color="#6D6B6C" />;
            case 'atm':
                return <FontAwesomeIcon icon={faMoneyBillAlt} color="#6D6B6C" />;
            case 'pharmacy':
                return <FontAwesomeIcon icon={faClinicMedical} color="#6D6B6C" />;
            case 'store':
                return <FontAwesomeIcon icon={faShoppingCart} color="#6D6B6C" />;
            default:
                return null;
        }
    };

    return (
        <div>
            {facilities.map((facility, index) => (
                <span key={index} title={facility.facility.name}>
                    {renderFacilityIcon(facility.facility.name)}
                </span>
            ))}
        </div>
    );
};

export default Facilities;
