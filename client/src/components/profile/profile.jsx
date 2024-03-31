import React from "react";
import "./profile.css";
import userImage from "../../assets/user-image.jpeg";
import { MdEdit } from "react-icons/md";

function Profile() {
  return (
    <div className="profile-wrapper">
      <div className="profile-header">
        <div className="left-header">
          <h1>Onwards</h1>
          <p>Subway System</p>
        </div>

        <div className="right-header">
          <p>About Us</p>
          <button className="general-btn">Sign In</button>
        </div>
      </div>

      <div className="user-info-wrapper">
        <img src={userImage}></img>
        <div className="personal-info-wrapper">
          <div className="personal-info">
            <p>
              <b>
                Sara Smith <MdEdit className="edit-buttton" />
              </b>
            </p>
            <p>
              <b>US - Florida</b>
            </p>
            <p>
              <b>sarah.smith@gmail.com</b>
            </p>
          </div>

          <div className="personal-info-right">
            <p>
              <b>Balance:</b>
            </p>
            <p>
              <b>150 coins</b>
            </p>
            <button className="general-btn">Request Coins</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
