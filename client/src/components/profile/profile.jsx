import { React, useState, useEffect } from "react";
import "./profile.css";
import userImage from "../../assets/user-image.jpeg";
import adminImage from "../../assets/admin-image.jpg";
import { MdEdit } from "react-icons/md";
import { FaStar, FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa";
import { sendRequest } from "../../core/tools/apiRequest";
import { requestMethods } from "../../core/tools/apiRequestMethods";
// import test from "../../../public/images/Assets";

function Profile() {
  const [user, setUser] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [displayContent, setDisplayContent] = useState("user-reviews");
  const [activeButton, setActiveButton] = useState("userReviews");
  const [isEditing, setIsEditing] = useState(false);
  const [image, setImage] = useState(null);
  const [reviews, setReviews] = useState("");

  useEffect(() => {
    getUserInfo();
    getUserReviews();
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
        throw new Error(
          `Failed to fetch user data. Status: ${response.status}`
        );
      }
      const data = response.data;
      if (data) {
        setUser(data.user);
        setFirstName(data.user.first_name);
        setLastName(data.user.last_name);
        setEmail(data.user.email);
        setImage(data.user.image_url);
      } else {
        console.error("Empty response data");
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  const getUserReviews = async () => {
    try {
      const response = await sendRequest(requestMethods.GET, "/reviews/user");
      if (response.status !== 200) {
        throw new Error(
          `Failed to fetch user reviews. Status: ${response.status}`
        );
      }
      const data = response.data;
      if (data) {
        setReviews(data);
        console.log(data);
      } else {
        console.log("Empty response data");
      }
    } catch (error) {
      console.log("Error fetching data:", error.message);
    }
  };

  const updateUserInfo = async () => {
    try {
      const formData = new FormData();
      formData.append("first_name", firstName);
      formData.append("last_name", lastName);
      formData.append("email", email);
      formData.append("image_url", image);

      const response = await sendRequest(
        requestMethods.POST,
        "/users/update",
        formData
      );
      if (response.status === 200) {
        console.log("User updated successfully");
        getUserInfo();
        setIsEditing(false);
      } else {
        console.log("Failed to update user:", response.data.message);
      }
    } catch (error) {
      console.log("Error updating user:", error.message);
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

  function closeEditUser() {
    setIsEditing(false);
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profile-wrapper">
      {isEditing && <div className="blurred"></div>}
      {isEditing && (
        <div className="is-editting">
          <div className="edit-inputs">
            {image && <img src={`${image}`} alt="User" />}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            ></input>
            <input
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            ></input>
            <input
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            ></input>
            <input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
          <div className="editting-buttons">
            <button className="general-btn" onClick={updateUserInfo}>
              Confirm
            </button>
            <button className="general-btn" onClick={closeEditUser}>
              Close
            </button>
          </div>
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
        <img src={`${image}`} alt="User" />
        <div className="personal-info-wrapper">
          <div className="personal-info">
            <p>
              <b className="person-info-first-name">
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
