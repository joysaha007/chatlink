import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { followUser, unFollowUser } from "../actions/userAction.js";
import { createChat } from "../actions/ChatAction.js";
const User = ({ person }) => {
  const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useSelector((state) => state.authReducer.authData);
  const dispatch = useDispatch()
  
  const [following, setFollowing] = useState(
    person.followers.includes(user._id)
  );



  const handleFollow = async () => {
    following
      ? dispatch(unFollowUser(person._id, user))
      : dispatch(followUser(person._id, user));
      setFollowing((prev) => !prev);
    if (!following) {
      try {
        // Prepare chat data
        const chatData = {
          senderId: user._id,
          receiverId: person._id,
        };
  
        // Dispatch the createChat action
        const chat = await dispatch(createChat(chatData));
        console.log("Chat result:", chat);
      } catch (error) {
        console.error("Error handling follow and chat creation:", error);
      }
    }
  
  };
  






  // const handleFollow = () => {
  //   following
  //     ? dispatch(unFollowUser(person._id, user))
  //     : dispatch(followUser(person._id, user));
  //     setFollowing((prev) => !prev);
  
  //   // Create a chat between the current user and the followed user
  //   if (!following) {
  //     const chatData = {
  //       senderId: user._id.toString(), // Ensure it's a string
  //       receiverId: person._id.toString(), // Ensure it's a string
  //     };
  //     dispatch(createChat(chatData)); // Dispatch the createChat action
  //   }
  
  // };
  

  // const handleFollow = () => {
  //   following
  //     ? dispatch(unFollowUser(person._id, user))
  //     : dispatch(followUser(person._id, user));
  //   setFollowing((prev) => !prev);
  // };

  return (
    <div className="follower">
      <div>
        <img
          src={
            publicFolder + person.profilePicture
              ? publicFolder + person.profilePicture
              : publicFolder + "defaultProfile.png"
          }
          alt="profile"
          className="followerImage"
        />
        <div className="name">
          <span>{person.firstname}</span>
          <span>@{person.username}</span>
        </div>
      </div>
      <button
        className={
          following ? "button fc-button UnfollowButton" : "button fc-button"
        }
        onClick={handleFollow}
      >
        {following ? "Unfollow" : "Follow"}
      </button>
    </div>
  );
};

export default User;
