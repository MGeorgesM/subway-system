import { BrowserRouter, Routes, Route } from "react-router-dom";
import Authentication from "./components/Authentication/Authentication";
import Profile from "./components/profile/profile";

import "./App.css";
import "./styles/colors.css";
import "./styles/utilities.css";
import "./styles/queries.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<Authentication />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
