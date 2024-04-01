import { useNavigate } from 'react-router-dom';

import './index.css';

const Navbar = ({ bg = 'no-bg' }) => {
    const navigate = useNavigate();
    const userSignedIn = localStorage.getItem('token') ? true : false;


    return (
        <section className={`navbar ${bg}`}>
            <nav className="nav-elements flex space-between light">
                <img className="logo" alt="logo" src="./images/Assets/logo.png" onClick={() => navigate('/')}/>
                <div>
                    <div className="nav-list flex center">
                        <button className="nav-link white-text no-bg">About Us</button>
                        <button className="nav-login white-text primary-bg box-shadow border-radius regular" onClick={
                            () => {
                                if (userSignedIn) {
                                    navigate('/welcome');
                                    localStorage.clear()
                                } else {
                                    navigate('/auth');
                                }
                            }
                        }>
                            {userSignedIn ? 'Sign Out' : 'Sign In'}
                        </button>
                    </div>
                </div>
            </nav>
        </section>
    );
};

export default Navbar;
