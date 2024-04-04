import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import Navbar from './components/Elements/Navbar/Navbar';
import Welcome from './components/Welcome/Welcome';
import Footer from './components/Elements/Footer/Footer';
import Home from './components/Home/Home';
import Station from './components/Station/Station';
import Profile from './components/Profile/Profile';
import Authentication from './components/Authentication/Authentication';
import LocationForm from './components/Authentication/Forms/LocationForm';
import Ticket from './components/Ticket/Ticket';

import './App.css';
import './styles/colors.css';
import './styles/utilities.css';
import './styles/queries.css';

const App = () => {
    const [isNavbarVisible, setIsNavbarVisible] = useState(true);
    const location = useLocation();

    const hiddenRoutes = ['/auth', '/ticket', '/location'];

    const isRouteHidden = () => {
        return hiddenRoutes.includes(location.pathname);
    };

    const updateNavbarVisibility = () => {
        setIsNavbarVisible(!isRouteHidden());
    };

    useEffect(() => {
        updateNavbarVisibility();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname]);

    const getNavbarBgColor = () => {
        if (location.pathname === '/') {
            return 'black-bg';
        }
    };

    return (
        <>
            {isNavbarVisible && <Navbar bg={getNavbarBgColor()} />}
            <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/browse" element={<Home />} />
                <Route path="/auth" element={<Authentication />} />
                <Route path="/location" element={<LocationForm />} />
                <Route path="/station" element={<Station />} />
                <Route path="*" element={<Welcome />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/ticket" element={<Ticket />} />
            </Routes>
            {isNavbarVisible && <Footer />}
            {/* <Route path="/admin-panel" element={<Sidebar />} /> */}
            {/* <div className="content">
                <Routes>
                    <Route
                        path="/coin-request"
                        element={
                            <>
                                <Sidebar />
                                <CoinRequest />
                            </>
                        }
                    />
                    <Route
                        path="/branch-invitation"
                        element={
                            <>
                                <Sidebar />
                                <BranchInvitationForm />
                            </>
                        }
                    />
                    <Route
                        path="/display-users"
                        element={
                            <>
                                <Sidebar />
                                <DisplayUser />
                            </>
                        }
                    />
                    <Route
                        path="/display-branches"
                        element={
                            <>
                                <Sidebar />
                                <DisplayBranch />
                            </>
                        }
                    />
                    <Route
                        path="/display-rides"
                        element={
                            <>
                                <Sidebar />
                                <DisplayRide />
                            </>
                        }
                    />
                    <Route
                        path="/display-stations"
                        element={
                            <>
                                <Sidebar />
                                <DisplayStation />
                            </>
                        }
                    />
                    <Route
                        path="/branch-management"
                        element={
                            <>
                                <Sidebar />
                                <BranchManagement />
                            </>
                        }
                    />
                </Routes>
            </div> */}
        </>
    );
};

export default App;
