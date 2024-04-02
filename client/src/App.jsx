import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Authentication from './components/Authentication/Authentication';
import LocationForm from './components/Authentication/Forms/LocationForm';
import Profile from "./components/profile/profile";
import CoinRequest from './components/AdminCoinRequest/CoinRequest';
import BranchInvitationForm from './components/BranchInvitation/BranchInvitationForm';
import DisplayUser from './components/DisplayUser/DisplayUser';
import DisplayBranch from './components/DisplayBranch/DisplayBranch';
import DisplayRide from './components/DisplayRide/DisplayRide';
import DisplayStation from './components/DisplayStation/DisplayStation';
import BranchManagement from './components/BranchManagement/BranchManagement';
import Sidebar from './components/Sidebar/Sidebar';

import './App.css';
import './styles/colors.css';
import './styles/utilities.css';
import './styles/queries.css';

function App() {
    return (
        <BrowserRouter>
            <div className="app">
                <Routes>
                    <Route path="/auth" element={<Authentication />} />
                    <Route path="/location" element={<LocationForm />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/admin-panel" element={<Sidebar />} />
                </Routes>
                <div className="content">
                    <Routes>
                        <Route path="/coin-request" element={<>
                            <Sidebar />
                            <CoinRequest />
                        </>} />
                        <Route path="/branch-invitation" element={<>
                            <Sidebar />
                            <BranchInvitationForm />
                        </>} />
                        <Route path="/display-users" element={<>
                            <Sidebar />
                            <DisplayUser />
                        </>} />
                        <Route path="/display-branches" element={<>
                            <Sidebar />
                            <DisplayBranch />
                        </>} />
                        <Route path="/display-rides" element={<>
                            <Sidebar />
                            <DisplayRide />
                        </>} />
                        <Route path="/display-stations" element={<>
                            <Sidebar />
                            <DisplayStation />
                        </>} />
                        <Route path="/branch-management" element={<>
                            <Sidebar />
                            <BranchManagement />
                        </>} />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
