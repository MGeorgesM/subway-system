import { React, useState, useEffect } from "react";
import "./profile.css";
import userImage from "../../assets/user-image.jpeg";
import { MdEdit } from "react-icons/md";
import { FaStar, FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa";
import { sendRequest } from "../../core/tools/apiRequest";
import { requestMethods } from "../../core/tools/apiRequestMethods";

function Profile() {
  const [user, setUser] = useState("");
  const [displayContent, setDisplayContent] = useState("user-reviews");

  useEffect(() => {
    getUserInfo();
    console.log(user);
  }, []);

  const getUserInfo = async () => {
    try {
      const response = await sendRequest(requestMethods.GET, `/users/get/4`);
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const data = await response.json();
      setUser(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  function ReviewCard({ name, stationName, review }) {
    return (
      <div className="review-card">
        <img src={userImage} alt="User" />
        <p>{name}</p>
        <p>{stationName}</p>
        <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar />
        <p>{review}</p>
      </div>
    );
  }

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

      <div className="user-reviews-wrapper">
        <div className="button-switcher">
          <h1 onClick={() => setDisplayContent("user-reviews")}>
            User Reviews
          </h1>
          <h1 onClick={() => setDisplayContent("admin-messages")}>
            Admin Messages
          </h1>
        </div>

        {displayContent === "user-reviews" && (
          <div className="reviews-cards-wrapper">
            <ReviewCard
              name="John Doe"
              stationName="Station A"
              review="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Obcaecati
          sed aperiam facilis magnam itaque ea rem tenetur veritatis quidem
          eligendi! Velit aperiam totam veritatis dignissimos quo! Dignissimos
          ex asperiores cupiditate."
            />
            <ReviewCard
              name="John Doe"
              stationName="Station B"
              review="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Obcaecati
          sed aperiam facilis magnam itaque ea rem tenetur veritatis quidem
          eligendi! Velit aperiam totam veritatis dignissimos quo! Dignissimos
          ex asperiores cupiditate."
            />
            <ReviewCard
              name="John Doe"
              stationName="Station C"
              review="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Obcaecati
          sed aperiam facilis magnam itaque ea rem tenetur veritatis quidem
          eligendi! Velit aperiam totam veritatis dignissimos quo! Dignissimos
          ex asperiores cupiditate."
            />
          </div>
        )}
        {displayContent === "admin-messages" && (
          <div className="admin-messages-wrapper">
            <p>Admin Messages Content Goes Here</p>
          </div>
        )}
      </div>

      <div className="profile-footer">
        <div className="footer-icons">
          <FaTwitter className="icon" />
          <FaFacebook className="icon" />
          <FaInstagram className="icon" />
          <p>Subway System App - SE Factory - April 2024</p>
        </div>
        <div className="right-footer">
          <p>Careers</p>
          <p>About Us</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
