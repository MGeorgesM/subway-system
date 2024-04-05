import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { sendRequest } from '../../core/tools/apiRequest';
import { requestMethods } from '../../core/tools/apiRequestMethods';

export const useTicketLogic = () => {
    const navigate = useNavigate();

    const [count, setCount] = useState(1);
    const [ride, setRide] = useState({});
    const [user, setUser] = useState({});

    const [popupMessage, setPopupMessage] = useState('');
    const [showPopup, setShowPopup] = useState(false);

    const [searchParams] = useSearchParams();
    const [passSelected, setPassSelected] = useState(false);

    const rideId = parseInt(searchParams.get('rideid'));
    const stationId = parseInt(searchParams.get('stationid'));

    useEffect(() => {
        const getRide = async () => {
            try {
                const response = await sendRequest(requestMethods.GET, `rides/get/${rideId}`, null);
                if (response.status === 200) {
                    setRide(response.data.rides);
                } else {
                    throw new Error();
                }
            } catch (error) {
                console.log(error.response.data.message);
            }
        };
        const getUser = async () => {
            try {
                const response = await sendRequest(requestMethods.GET, '/users/get', null);
                if (response.status === 200) {
                    setUser(response.data.user);
                } else {
                    throw new Error();
                }
            } catch (error) {
                console.log(error.response.data.message);
            }
        };
        getUser();
        getRide();
    }, [rideId]);

    const handleIncrement = () => {
        setCount(count + 1);
    };

    const handleDecrement = () => {
        if (count > 1) {
            setCount(count - 1);
        }
    };

    const handleChange = (e) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value) && value >= 1) {
            setCount(value);
        }
    };

    const handleCheckout = async () => {
        let response = null;
        try {
            if (passSelected) {
                response = await sendRequest(requestMethods.POST, '/passes/add', null);
            } else {
                response = await sendRequest(requestMethods.POST, 'tickets/create', { rideId, count });
            }
            if (response.status === 201) {
                setShowPopup(true);
                setPopupMessage('Payment Successfull');
            } else {
                throw new Error();
            }
        } catch (error) {
            setShowPopup(true);
            setPopupMessage(`${error.response.data.message}`);
        }
    };

    const handleCancel = () => {
        navigate(`/station?id=${stationId}`);
    };

    const handleProceed = () => {
        navigate('/browse');
        setShowPopup(false);
    };

    const handlePassSelection = () => {
        setPassSelected(!passSelected);
    };

    return {
        count,
        ride,
        user,
        popupMessage,
        showPopup,
        passSelected,
        navigate,
        handleIncrement,
        handleDecrement,
        handleChange,
        handleCheckout,
        handleCancel,
        handleProceed,
        handlePassSelection,
    };
};
