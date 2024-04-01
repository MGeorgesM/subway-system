import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Authentication from './components/Authentication/Authentication';
import LocationForm from './components/Authentication/Forms/LocationForm';
import Home from './components/Home/Home';
import Profile from './components/profile/profile';

import './App.css';
import './styles/colors.css';
import './styles/utilities.css';
import './styles/queries.css';

function App() {
    return (
        <BrowserRouter>
        <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/auth" element={<Authentication />} />
                <Route path="/location" element={<LocationForm />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
