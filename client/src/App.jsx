import { BrowserRouter, Routes, Route } from "react-router-dom";
import Authentication from "./components/Authentication/Authentication";
import Profile from "./components/profile/profile";
import { React, useState } from "react";

import "./App.css";
import "./styles/colors.css";
import "./styles/utilities.css";
import "./styles/queries.css";

function App() {
  const [userId, setUserId] = useState(null);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/auth"
          element={<Authentication userId={userId} setUserId={setUserId} />}
        />
        <Route
          path="/profile"
          element={<Profile userId={userId} setUserId={setUserId} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
