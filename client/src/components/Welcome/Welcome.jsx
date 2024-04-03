import { useNavigate } from 'react-router-dom';

import './index.css';
import Button from '../Elements/Button/Button';

const Welcome = () => {
    const navigate = useNavigate();

    return (
        <div className="main-welcome flex column center">
            <div className="welcome-text flex column center">
                <h1>Welcome to Onward</h1>
                <p>
                    Your gateway to seamless urban transit, explore with ease as you embark on
                    your journey with us.
                </p>
            </div>
            <div className="welcome-btns flex center">
                <Button clickHandler={() => navigate('/auth')} text={'Sign In'} type={'primary-btn'} size={'btn-l'} />
                <Button clickHandler={() => navigate('/browse')} text={'Browse'} type={'secondary-btn'} size={'btn-l'} />
                {/* <button className="primary-btn border-radius-m" onClick={() => navigate('/auth')}>
                    Sign In
                </button>
                <button className="clicked secondary border-radius-m bold" onClick={() => navigate('/browse')}>
                    Browse
                </button> */}
            </div>
        </div>
    );
};

export default Welcome;
