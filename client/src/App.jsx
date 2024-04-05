import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import AdminRoutes from './components/ProtectedRoutes/AdminRoutes';
import Navbar from './components/Elements/Navbar/Navbar';
import Welcome from './components/Welcome/Welcome';
import Footer from './components/Elements/Footer/Footer';
import Home from './components/Home/Home';
import Station from './components/Station/Station';
import Profile from './components/Profile/Profile';
import Authentication from './components/Authentication/Authentication';
import LocationForm from './components/Authentication/Forms/LocationForm';
import Ticket from './components/Ticket/Ticket';

import CoinRequest from './components/AdminPanel/AdminCoinRequest/CoinRequest';
import BranchInvitationForm from './components/AdminPanel/BranchInvitation/BranchInvitationForm';
import DisplayUser from './components/AdminPanel/DisplayUser/DisplayUser';
import DisplayBranch from './components/AdminPanel/DisplayBranch/DisplayBranch';
import DisplayRide from './components/AdminPanel/DisplayRide/DisplayRide';
import DisplayStation from './components/AdminPanel/DisplayStation/DisplayStation';
import BranchManagement from './components/AdminPanel/BranchManagement/BranchManagement';
import DisplayStations from './components/BranchPanel/DisplayStations/DisplayStations';
import Facilities from './components/BranchPanel/Facilities/Facilities';
import Rides from './components/BranchPanel/Rides/Rides';
import Sidebar from './components/AdminPanel/Sidebar/Sidebar';
import BranchSidebar from './components/BranchPanel/BranchSidebar/BranchSidebar';

import './App.css';
import './styles/colors.css';
import './styles/utilities.css';
import './styles/queries.css';
import AuthenticatedRoutes from './components/ProtectedRoutes/PassengerRoutes';
import ManagerRoutes from './components/ProtectedRoutes/ManagerRoutes';
import GuestRoutes from './components/ProtectedRoutes/GuestRoutes';

const App = () => {
    const [isNavbarVisible, setIsNavbarVisible] = useState(true);
    const location = useLocation();

    const hiddenRoutes = [
        '/auth',
        '/location',
        '/admin-panel',
        '/display-users',
        '/display-branches',
        '/display-stations',
        '/display-rides',
        '/coin-request',
        '/branch-management',
        '/branch-invitation',
        '/branch-panel',
        '/facilities-panel',
        '/Rides',
    ];

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
        if (location.pathname === '/' || location.pathname === '/ticket' || location.pathname === '/profile') {
            return 'black-bg';
        }
    };

    return (
        <>
            {isNavbarVisible && <Navbar bg={getNavbarBgColor()} />}
            <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/browse" element={<Home />} />
                <Route path="/station" element={<Station />} />
            </Routes>

            <GuestRoutes>
                <Routes>
                    <Route path="/auth" element={<Authentication />} />
                    <Route path="/location" element={<LocationForm />} />
                </Routes>
            </GuestRoutes>

            <AuthenticatedRoutes>
                <Routes>
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/ticket" element={<Ticket />} />
                </Routes>
            </AuthenticatedRoutes>

            <ManagerRoutes>
                <Routes>
                    <Route
                        path="/facilities-panel"
                        element={
                            <>
                                <BranchSidebar /> <Facilities />
                            </>
                        }
                    ></Route>
                    <Route
                        path="/rides"
                        element={
                            <>
                                <BranchSidebar /> <Rides />
                            </>
                        }
                    ></Route>
                    <Route
                        path="/branch-panel"
                        element={
                            <>
                                <DisplayStations />
                                <BranchSidebar />
                            </>
                        }
                    />
                </Routes>
            </ManagerRoutes>

            <AdminRoutes>
                <Routes>
                    <Route path="/admin-panel" element={<Sidebar />} />
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
            </AdminRoutes>
            {isNavbarVisible && <Footer />}
        </>
    );
};
export default App;
