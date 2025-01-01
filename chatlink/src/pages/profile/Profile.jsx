import React from 'react'
import "./Profile.css"
import ProfileLeft from '../../components/profileLeft/ProfileLeft'
import ProfileCard from '../../components/profileCard/ProfileCard'
import RightSide from '../../components/rightSide/RightSide'
import PostSide from '../../components/postside/PostSide'
const Profile = () => {
  return (
    <>
      <div className="Profile">
        <ProfileLeft/>
        
        <div className="Profile-center">
            <ProfileCard location={"ProfilePage"}/>
            <PostSide/>
        </div>
        <RightSide/>
      </div>
    </>
  )
}

export default Profile
