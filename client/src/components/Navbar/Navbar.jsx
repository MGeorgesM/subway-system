import { useEffect , useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { sendRequest } from '../../core/tools/apiRequest';
import { requestMethods } from '../../core/tools/apiRequestMethods';

import './index.css';

const Navbar = ({ bg = 'no-bg' }) => {
    const [scrolled, setScrolled] = useState(false);
    // const [userRoleId, setUserRoleId] = useState('');

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

        // const getUserRole = async () => {
        //     try {
        //         const response = await sendRequest(requestMethods.GET, '/users/get', null);
        //         if (response.status === 200) {
        //             setUserRoleId(response.data.user.role_id);
        //         } else {
        //             throw new Error();
        //         }
        //     } catch (error) {
        //         console.log(error.response.data.message);
        //     }
        // };
        // getUserRole();
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    return (
        <div className={`navbar ${navBg}`}>
            <nav className="nav-elements flex space-between light">
                <img className="logo" alt="logo" src="./images/Assets/logo.png" onClick={() => navigate('/browse')}/>
                <div>
                    <div className="nav-list flex center">
                        <button className="nav-link white-text no-bg">Welcome</button>
                        <button className="nav-login white-text primary-bg box-shadow border-radius regular" onClick={
                            () => {
                                if (userSignedIn) {
                                    navigate('/');
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
