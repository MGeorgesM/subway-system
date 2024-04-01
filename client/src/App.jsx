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

import './App.css';
import './styles/colors.css';
import './styles/utilities.css';
import './styles/queries.css';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/auth" element={<Authentication />} />
                <Route path ="/location" element={<LocationForm />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/coin-request" element={<CoinRequest />} />
                <Route path="/branch-invitation" element={<BranchInvitationForm />} />
                <Route path="/display-users" element={<DisplayUser />} />
                <Route path="/display-branches" element={<DisplayBranch />} />
                <Route path="/display-rides" element={<DisplayRide />} />
                <Route path="/display-stations" element={<DisplayStation />} />
                <Route path="/branch-management" element={<BranchManagement />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
