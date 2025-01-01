import React, { useState } from "react";
import "./RightSide.css";
import Home from "../../img/home.png";
import Noti from "../../img/noti.png";
import Comment from "../../img/comment.png";
import Profile from "../../img/profile.png";
import TrendCard from "../trendCard/TrendCard";
import ShareModal from "../shareModal/ShareModal";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Notification from "../admin/Notification.jsx";


const RightSide = () => {
  // State to control the modal visibility
  const [modalOpened, setModalOpened] = useState(false);
  const { user } = useSelector((state) => state.authReducer.authData)
  const [showNotifications, setShowNotifications] = useState(false);

  const handleClick = () => {
    setShowNotifications((prev) => !prev); // Toggle visibility
  };
  const profilePage = false;

  return (
    <div className="RightSide">
      {/* Navigation Icons */ }
      <div className="navIcons">
        <Link to={'../home'}><img src={ Home } alt="Home" /></Link>
        
        { profilePage ? (
          <img src="" alt="Profile" />
        ) : (
          <Link to={ `/profile/${user._id}` }>
            <img src={ Profile } alt="Profile" />
          </Link>
        ) }
        <img src={ Noti } alt="Notifications" onClick={handleClick} />{showNotifications && <Notification />}
        <Link to={'../chat'}><img src={ Comment } alt="Comments" /></Link>
      </div>

      {/* Trend Card */ }
      <TrendCard />

      {/* Button to open Share Modal */ }
      <button className="button r-button" onClick={ () => setModalOpened(true) }>
        Share
      </button>

      {/* Share Modal */ }
      <ShareModal modalOpened={ modalOpened } setModalOpened={ setModalOpened } />
    </div>
  );
}

export default RightSide;
