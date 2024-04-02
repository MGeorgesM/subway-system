import React from 'react';

import './Popup.css';

const Popup = ({message, handleContinue}) => {
    return (
        <div className="popupmain flex column center black-bg-trsp">
            <div className="popupmain-inner white-bg flex column space-evenly box-shadow border-radius">
                <div className="popupmain-text black-text">
                    <h1>Notice</h1>
                    <div>
                        <p className="notice-text">
                            {message}
                        </p>
                    </div>
                </div>
                <button className="popupmain-btn primary-btn border-radius border" onClick={handleContinue} >
                    Continue
                </button>
            </div>
        </div>
    );
};

export default Popup;
