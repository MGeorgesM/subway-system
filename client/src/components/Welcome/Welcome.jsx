import { useNavigate } from 'react-router-dom';
import Button from '../Elements/Button/Button';

import './index.css';

const Welcome = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    return (
        <div className="main-welcome flex column center">
            <div className="welcome-text flex column center">
                <h1>Welcome to Onward</h1>
                <p>Your gateway to seamless urban transit, explore with ease as you embark on your journey with us.</p>
            </div>
            <div className="welcome-btns flex center">
                {!token && (
                <Button clickHandler={() => navigate('/auth')} text={'Sign In'} type={'primary-btn'} size={'btn-l'} />
                )}
                <Button
                    clickHandler={() => navigate('/browse')}
                    text={'Browse'}
                    type={'secondary-btn'}
                    size={'btn-l'}
                />
            </div>
        </div>
    );
};

export default Welcome;
