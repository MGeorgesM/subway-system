import React, { useState } from "react";
import "./index.css";
import { Link, useNavigate } from "react-router-dom";

const BranchSidebar = () => {
  const [activeLink, setActiveLink] = useState("");
  const navigate = useNavigate();

  const handleSetActive = (link) => {
    setActiveLink(link);
  };

  const homePage = () => {
    navigate("/");
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <img src="./images/Assets/logo.png" alt="logo" onClick={homePage} />
        </div>
        Branch Panel
      </div>
      <ul className="sidebar-menu">
        <li className={activeLink === "display-users" ? "active" : ""}>
          <Link
            to="/branch-panel"
            onClick={() => handleSetActive("display-users")}
          >
            Display Stations
          </Link>
        </li>

        <li className={activeLink === "display-users" ? "active" : ""}>
          <Link to="/Rides" onClick={() => handleSetActive("display-users")}>
            Rides
          </Link>
        </li>

        {/* <li className={activeLink === "display-users" ? "active" : ""}>
          <Link
            to="/facilities-panel"
            onClick={() => handleSetActive("display-users")}
          >
            Facilities
          </Link>
        </li>

        <li className={activeLink === "display-branches" ? "active" : ""}>
          <Link
            to="/branch-panel"
            onClick={() => handleSetActive("display-branches")}
          >
            User Chats
          </Link>
        </li> */}
      </ul>
    </div>
  );
};

export default BranchSidebar;
