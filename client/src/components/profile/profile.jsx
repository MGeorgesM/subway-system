import { React, useState, useEffect } from "react";
import "./profile.css";
import userImage from "../../assets/user-image.jpeg";
import adminImage from "../../assets/admin-image.jpg";
import { MdEdit } from "react-icons/md";
import { FaStar, FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa";
import { sendRequest } from "../../core/tools/apiRequest";
import { requestMethods } from "../../core/tools/apiRequestMethods";

function Profile() {
  const [user, setUser] = useState("");
  const [displayContent, setDisplayContent] = useState("user-reviews");
  const [activeButton, setActiveButton] = useState("userReviews");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    getUserInfo();
  }, []);

  const handleClick = (button) => {
    setActiveButton(button);

    if (button === "userReviews") {
      setDisplayContent("user-reviews");
    } else if (button === "adminMessages") {
      setDisplayContent("admin-messages");
    }
  };

  const getUserInfo = async () => {
    try {
      const response = await sendRequest(requestMethods.GET, `/users/get`);
      if (response.status !== 200) {
        console.log("error");
        throw new Error(
          `Failed to fetch user data. Status: ${response.status}`
        );
      }
      const data = response.data;
      if (data) {
        setUser(data.user);
      } else {
        console.error("Empty response data");
      }
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

  function editUser() {
    setIsEditing(true);
  }

  return (
    <div className="profile-wrapper">
      {isEditing && <div className="blurred"></div>}
      {isEditing && (
        <div className="is-editting">
          <h1>is editting div</h1>
        </div>
      )}
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
                {user.first_name} {user.last_name}{" "}
                <MdEdit className="edit-buttton" onClick={editUser} />
              </b>
            </p>
            <p>
              <b>{user.email}</b>
            </p>
          </div>

          <div className="personal-info-right">
            <p>
              <b>Balance:</b>
            </p>
            <p>
              <b>{user.coins_balance}</b>
            </p>
            <button className="general-btn">Request Coins</button>
          </div>
        </div>
      </div>

      <div className="user-reviews-wrapper">
        <div className="button-switcher">
          <h1
            className={activeButton === "userReviews" ? "active" : ""}
            onClick={() => handleClick("userReviews")}
          >
            User Reviews
          </h1>
          <h1
            className={activeButton === "adminMessages" ? "active" : ""}
            onClick={() => handleClick("adminMessages")}
          >
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
            <div className="chat-header">
              <div className="chat-header-left">
                <p>My chats</p>
              </div>

              <div className="chat-header-right">
                <img src={adminImage}></img>
                <p>Admin Name</p>
              </div>
            </div>

            <div className="middle-wrapper">
              <div className="choose-chat">
                <p>Station Name</p>
                <p>Station Name</p>
                <p>Station Name</p>
                <p>Station Name</p>
              </div>
              <div className="chat-section">
                <div className="chat">
                  <p>Hello!</p>
                </div>
                <div className="enter-message">
                  <input placeholder="Send message"></input>
                  <button className="send-btn">Send</button>
                </div>
              </div>
            </div>
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
