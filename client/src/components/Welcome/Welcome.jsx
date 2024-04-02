import { useNavigate } from 'react-router-dom';

import './index.css';

const Welcome = () => {
    const navigate = useNavigate();

    return (
        <div className="main-welcome flex column center">
            <div className="welcome-text flex column center">
                <h1>Welcome to Onward</h1>
                <p>
                    Welcome aboard, your gateway to seamless urban transit Explore the city with ease as you embark on
                    your journey with us
                </p>
            </div>
            <div className="welcome-btns flex center">
                <button className="primary-btn border-radius-m" onClick={() => navigate('/auth')}>
                    Sign Up
                </button>
                <button className="clicked secondary border-radius-m bold" onClick={() => navigate('/browse')}>
                    Browse
                </button>
            </div>
        </div>
    );
};

export default Welcome;
