import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation here

import Navbar from './components/Navbar/Navbar';
import Welcome from './components/Welcome/Welcome';
import Authentication from './components/Authentication/Authentication';
import LocationForm from './components/Authentication/Forms/LocationForm';
import Home from './components/Home/Home';
import Station from './components/Station/Station';
import Profile from './components/profile/profile';
import Ticket from './components/Ticket/Ticket';
import Footer from './components/Footer/Footer';

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
                <Route path="/profile" element={<Profile />} />
                <Route path="/ticket" element={<Ticket />} />
                <Route path="*" element={<Welcome />} />
            </Routes>
            {isNavbarVisible && <Footer />}
        </>
    );
};

export default App;
