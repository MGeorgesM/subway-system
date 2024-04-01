import { useEffect , useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './index.css';

const Navbar = ({ bg = 'no-bg' }) => {
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();
    const userSignedIn = localStorage.getItem('token') ? true : false;
    const navBg = scrolled ? 'black-bg-trsp' : bg;


    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    return (
        <div className={`navbar ${navBg}`}>
            <nav className="nav-elements flex space-between light">
                <img className="logo" alt="logo" src="./images/Assets/logo.png" onClick={() => navigate('/')}/>
                <div>
                    <div className="nav-list flex center">
                        <button className="nav-link white-text no-bg">About Us</button>
                        <button className="nav-login white-text primary-bg box-shadow border-radius regular" onClick={
                            () => {
                                if (userSignedIn) {
                                    navigate('/auth');
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
        </div>
    );
};

export default Navbar;
