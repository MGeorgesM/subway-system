import { React, useState, useEffect } from "react";
import "./index.css";

import { MdEdit } from "react-icons/md";
import { FaStar, FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa";
import { sendRequest } from "../../core/tools/apiRequest";
import { requestMethods } from "../../core/tools/apiRequestMethods";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Profile() {
  const [user, setUser] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [displayContent, setDisplayContent] = useState("user-reviews");
  const [activeButton, setActiveButton] = useState("userReviews");
  const [isEditing, setIsEditing] = useState(false);
  const [image, setImage] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [requstCoins, setRequestCoins] = useState(false);
  const [amount, setAmount] = useState("");
  const [coinsMessage, setCoinsMessage] = useState("");

  const CustomPrevArrow = (props) => (
    <button {...props} className="slick-prev">
      Previous
    </button>
  );

  const CustomNextArrow = (props) => (
    <button {...props} className="slick-next">
      Next
    </button>
  );

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    arrows: true,
  };

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
      if (data && Array.isArray(data.reviews)) {
        setReviews(data.reviews);
        console.log(data.reviews);
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

  const userRequestsCoins = async () => {
    try {
      const formData = new FormData();
      formData.append("amount", amount);

      const response = await sendRequest(
        requestMethods.POST,
        "/coins-requests",
        formData
      );

      if (response.status === 200) {
        console.log("Requested amount is pending");
        setCoinsMessage("Requested amount is pending");
      } else {
        console.log("Failed to request coins: ", response.data.message);
        setCoinsMessage("Failed to request coins");
      }
    } catch (error) {
      console.log("Error requesting coins: ", error.message);
      setCoinsMessage("You can only use numbers");
    }
  };

  function editUser() {
    setIsEditing(true);
  }

  function closeEditUser() {
    setIsEditing(false);
  }

  function openRequestCoins() {
    setRequestCoins(true);
  }

  function closeRequestCoins() {
    setRequestCoins(false);
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
        <div className="is-editting light-gray-bg">
          <div className="edit-inputs">
            {image && <img src={`${image}`} alt="User" />}
            <input
              className="choose-image-button"
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

      {requstCoins && <div className="blurred"></div>}
      {requstCoins && (
        <div className="is-requesting-coins light-gray-bg">
          <div>
            <h1>Request Coins</h1>
          </div>

          <div className="request-coins-wrapper ">
            <input
              placeholder="Amout"
              onChange={(e) => {
                setAmount(e.target.value);
              }}
            ></input>
          </div>

          {coinsMessage && <p className="coins-message">{coinsMessage}</p>}

          <div className="editting-buttons">
            <button className="general-btn" onClick={userRequestsCoins}>
              Confirm
            </button>
            <button className="general-btn" onClick={closeRequestCoins}>
              Close
            </button>
          </div>
        </div>
      )}

      <div className="profile-header"></div>

      <div className="user-info-wrapper">
        <img src="./images/assets/avatar.png" alt="user-profile"></img>
        <div className="personal-info-wrapper">
          <div className="personal-info">
            <p>
              <b className="person-info-first-name">
                {user.first_name} {user.last_name}
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
            <button className="primary-btn btn-s border-radius" onClick={openRequestCoins}>
              Request Coins
            </button>
          </div>
        </div>
      </div>

      <div className="user-reviews-wrapper">
        <div className="button-switcher">
          <h1
            className={activeButton === "userReviews" ? "black-text" : "light-text"}
            onClick={() => handleClick("userReviews")}
          >
            User Reviews
          </h1>
          <h1
            className={activeButton === "adminMessages" ? "black-text" : "light-text"}
            onClick={() => handleClick("adminMessages")}
          >
            Admin Messages
          </h1>
        </div>

        {displayContent === "user-reviews" && (
          <div className="reviews-cards-wrapper">
            <Slider {...sliderSettings}>
              {reviews.map((review, index) => (
                <div key={index} className="review-slide light-gray-bg dark-text flex column center border">
                  <p>Ride ID: {review.ride_id}</p>
                  <p>Station ID: {review.station_id}</p>
                  <p>Rating: {review.rating}</p>
                  <p>Comment: {review.comment}</p>
                  {/* Add any other fields you want to display */}
                </div>
              ))}
            </Slider>
          </div>
        )}
        {displayContent === "admin-messages" && (
          <div className="admin-messages-wrapper">
            <div className="chat-header">
              <div className="chat-header-left">
                <p>My chats</p>
              </div>

              <div className="chat-header-right">
                <img src="./images/assets/mohamadDELETE/admin-image.jpg" alt="admin-image"></img>
                <p>Manager Name</p>
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
    </div>
  );
}

export default Profile;
