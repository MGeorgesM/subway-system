import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { sendRequest } from '../../core/tools/apiRequest';
import { requestMethods } from '../../core/tools/apiRequestMethods';

import './index.css';

const Navbar = ({ bg = 'no-bg' }) => {
    const navigate = useNavigate();
    const navBg = scrolled ? 'black-bg-trsp' : bg;
    const [scrolled, setScrolled] = useState(false);
    const [userRoleId, setUserRoleId] = useState('');
    
    const token = localStorage.getItem('token');


    const signOut = async () => {
        try {
            const response = await sendRequest(requestMethods.POST, '/auth/logout', null);
            if (response.status === 200) {
                setUserRoleId('');
                localStorage.clear();
                navigate('/');
            } else {
                return;
            }
        } catch (error) {
            console.log(error.response.data.message);
        }
    };
    const handleScroll = () => {
        if (window.scrollY > 50) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    };

    const getUserRole = async () => {
        try {
            const response = await sendRequest(requestMethods.GET, '/users/get', null);
            if (response.status === 200) {
                setUserRoleId(response.data.user.role_id);
            } else {
                return;
            }
        } catch (error) {
            console.log(error.response.data.message);
        }
    };

    useEffect(() => {
        token && getUserRole();

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={`navbar ${navBg}`}>
            <nav className="nav-elements flex space-between light">
                <img className="logo" alt="logo" src="./images/Assets/logo.png" onClick={() => navigate('/browse')} />
                <div>
                    <div className="nav-list flex center">
                        <button
                            className="nav-link white-text no-bg"
                            onClick={() => {
                                userRoleId === 3
                                    ? navigate('/admin-panel')
                                    : userRoleId === 2
                                    ? navigate('/branch-panel')
                                    : userRoleId === 1
                                    ? navigate('/profile')
                                    : navigate('/welcome');
                            }}
                        >
                            {userRoleId === 3
                                ? 'Admin Panel'
                                : userRoleId === 2
                                ? 'Manager Panel'
                                : userRoleId === 1
                                ? 'Profile'
                                : 'About'}
                        </button>
                        <button
                            className="nav-login white-text primary-bg box-shadow border-radius regular"
                            onClick={() => {
                                if (userRoleId) {
                                    signOut();
                                } else {
                                    navigate('/auth');
                                }
                            }}
                        >
                            {userRoleId ? 'Sign Out' : 'Sign In'}
                        </button>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
