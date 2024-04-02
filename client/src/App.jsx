import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation here

import Navbar from './components/Navbar/Navbar';
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

    // Define routes where the navbar should be hidden
    const hiddenRoutes = ['/auth', '/ticket', '/location'];

    // Function to check if the current route is in hiddenRoutes
    const isRouteHidden = () => {
        return hiddenRoutes.includes(location.pathname);
    };

    // Function to change the navbar visibility based on the route
    const updateNavbarVisibility = () => {
        setIsNavbarVisible(!isRouteHidden());
    };

    // Change navbar visibility when route changes
    useEffect(() => {
        updateNavbarVisibility();
    }, [location.pathname]);

    // Define navbar background color based on the route
    const getNavbarBgColor = () => {
        if (location.pathname === '/welcome') {
            return 'black-bg';
        }
    };

    return (
        <>
            {isNavbarVisible && <Navbar bg={getNavbarBgColor()} />}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/auth" element={<Authentication />} />
                <Route path="/location" element={<LocationForm />} />
                <Route path="/station" element={<Station />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/ticket" element={<Ticket />} />
                <Route path="*" element={<Home />} />
            </Routes>
            {isNavbarVisible && <Footer />}
        </>
    );
};

export default App;
