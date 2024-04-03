import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

import { sendRequest } from '../../core/tools/apiRequest';
import { requestMethods } from '../../core/tools/apiRequestMethods';
import { formatTime } from '../../core/tools/formatTime';

import './index.css';
import Popup from '../Elements/Popup/Popup';

const Ticket = () => {
    const [count, setCount] = useState(1);
    const [searchParams] = useSearchParams();
    const [ride, setRide] = useState({});
    const [user, setUser] = useState({});
    const [popupMessage, setPopupMessage] = useState('');
    const [showPopup, setShowPopup] = useState(false);

    const navigate = useNavigate();

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
        try {
            const response = await sendRequest(requestMethods.POST, 'tickets/create', { rideId, count });
            if (response.status === 201) {
                setShowPopup(true);
                setPopupMessage('Your Purchase was successfull');
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
        setShowPopup(false);
    };

    if (user && ride)
        return (
            <>
                <div className="ticket-main flex center">
                    <div className="ride-details-container flex column center border-radius box-shadow">
                        <div className="ride-details-title dark-text flex center column">
                            <div className="logo-order">
                                <img src="./images/assets/logo-dark-grey.png" alt="logo" onClick={() => navigate('/')}></img>
                            </div>
                            <h1>Order Details</h1>
                            <p>{user.first_name + ' ' + user.last_name}</p>
                        </div>
                        <div className="order-body flex center">
                            <div className="order-details">
                                <h2>
                                    {ride.name} - {ride.start_time && formatTime(ride.start_time)}
                                </h2>
                            </div>
                        </div>
                        <div className="add-passengers">
                            <h2>Passengers</h2>
                            <div className="passenger-counter flex center">
                                <button onClick={handleDecrement}>-</button>
                                <input type="text" value={count} onChange={handleChange} />
                                <button onClick={handleIncrement}>+</button>
                            </div>
                        </div>
                        <div className="total">
                            <h1>
                                Due now: $<span>{ride.price && ride.price * count}</span>
                            </h1>
                            <h2>
                                Available Coins: $<span>{user.coins_balance}</span>
                            </h2>
                        </div>
                        <div className="checkout flex center">
                            <button
                                className="checkout-btn primary-btn box-shadow border-radius-m bold"
                                id="checkout-btn"
                                onClick={handleCheckout}
                            >
                                Checkout
                            </button>
                            <button
                                className="cancel-btn clicked box-shadow border-red border-radius-m bold"
                                id="cancel-btn"
                                onClick={handleCancel}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
                {showPopup && <Popup message={popupMessage} handleContinue={handleProceed} />}
            </>
        );
};

export default Ticket;
