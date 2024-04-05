import React, { useState } from 'react';
import './index.css';
import { Link, useNavigate } from 'react-router-dom';
import { sendRequest } from '../../../core/tools/apiRequest';
import { requestMethods } from '../../../core/tools/apiRequestMethods';

const Sidebar = () => {
    const [activeLink, setActiveLink] = useState('');
    const [userRoleId, setUserRoleId] = useState('');

    const navigate = useNavigate();

    const handleSetActive = (link) => {
        setActiveLink(link);
    };

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

    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <div className="sidebar-logo">
                    <img src="./images/Assets/logo.png" alt="logo" onClick={() => navigate('/browse')} />
                </div>
                Admin Panel
            </div>
            <ul className="sidebar-menu">
                <li className={activeLink === 'display-users' ? 'active' : ''}>
                    <Link to="/display-users" onClick={() => handleSetActive('display-users')}>
                        Display Users
                    </Link>
                </li>
                <li className={activeLink === 'display-branches' ? 'active' : ''}>
                    <Link to="/display-branches" onClick={() => handleSetActive('display-branches')}>
                        Display Branches
                    </Link>
                </li>
                <li className={activeLink === 'display-stations' ? 'active' : ''}>
                    <Link to="/display-stations" onClick={() => handleSetActive('display-stations')}>
                        Display Stations
                    </Link>
                </li>
                <li className={activeLink === 'display-rides' ? 'active' : ''}>
                    <Link to="/display-rides" onClick={() => handleSetActive('display-rides')}>
                        Display Rides
                    </Link>
                </li>
                <li className={activeLink === 'coin-request' ? 'active' : ''}>
                    <Link to="/coin-request" onClick={() => handleSetActive('coin-request')}>
                        Coin Request
                    </Link>
                </li>
                <li className={activeLink === 'branch-management' ? 'active' : ''}>
                    <Link to="/branch-management" onClick={() => handleSetActive('branch-management')}>
                        Branch Management
                    </Link>
                </li>
                <li className={activeLink === 'branch-invitation' ? 'active' : ''}>
                    <Link to="/branch-invitation" onClick={() => handleSetActive('branch-invitation')}>
                        Branch Invitation
                    </Link>
                </li>
                <li className="sidebar-menu sidebar-bottom" onClick={signOut}>
                    Sign Out
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
