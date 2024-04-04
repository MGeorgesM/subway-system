import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { sendRequest } from '../../core/tools/apiRequest';
import { requestMethods } from '../../core/tools/apiRequestMethods';

import { useTicketLogic } from './logic';

import Popup from '../Elements/Popup/Popup';
import Button from '../Elements/Button/Button';

import { formatTime } from '../../core/tools/formatTime';

import './index.css';

const Ticket = () => {
    const {
        user,
        ride,
        count,
        popupMessage,
        showPopup,
        passSelected,
        navigate,
        handleCancel,
        handleChange,
        handleProceed,
        handleCheckout,
        handleDecrement,
        handleIncrement,
        handlePassSelection,
    } = useTicketLogic();

    if (user && ride)
        return (
            <>
                {/* <div className='flex center'> */}
                <div className="ticket-main flex center">
                    <div className="ride-details-container flex column center border-radius box-shadow">
                        <div className="ride-details-title dark-text flex center column">
                            <div className="logo-order">
                                <img
                                    src="./images/assets/logo-dark-grey.png"
                                    alt="logo"
                                    onClick={() => navigate('/browse')}
                                ></img>
                            </div>
                            <h1>Order Details</h1>
                            <p>{user.first_name + ' ' + user.last_name}</p>
                        </div>
                        <div className="order-body flex center">
                            <div className="order-details">
                                <h2>
                                    {passSelected
                                        ? 'Multi-Ride Pass - 8 Rides'
                                        : `${ride.name} - ${ride.start_time && formatTime(ride.start_time)}`}
                                </h2>
                            </div>
                        </div>
                        {!passSelected && (
                            <div className="add-passengers">
                                <h2>Passengers</h2>
                                <div className="passenger-counter flex center">
                                    <button onClick={handleDecrement}>-</button>
                                    <input type="text" value={count} onChange={handleChange} />
                                    <button onClick={handleIncrement}>+</button>
                                </div>
                            </div>
                        )}
                        <div className="total">
                            <h1>
                                Due now: $<span>{passSelected ? '200' : ride.price && ride.price * count}</span>
                            </h1>
                            <h2>
                                Available Coins: $<span>{user.coins_balance}</span>
                            </h2>
                        </div>
                        <div className="checkout flex center">
                            <Button
                                text={'Checkout'}
                                type={'primary-btn'}
                                size={'btn-s'}
                                clickHandler={handleCheckout}
                            />
                            <Button text={'Cancel'} type={'secondary-btn'} size={'btn-s'} clickHandler={handleCancel} />
                        </div>
                        <div className="pass-prompt bold secondary-text">
                            <p onClick={handlePassSelection}>
                                {passSelected
                                    ? "I'll get a ticket for now..."
                                    : 'Get a Multi-Ride Pass and Start Saving!'}
                            </p>
                        </div>
                    </div>
                </div>
                {showPopup && <Popup message={popupMessage} handleContinue={handleProceed} />}
            </>
        );
};

export default Ticket;
