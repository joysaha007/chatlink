import React from 'react'
import './ProfileCard.css'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const ProfileCard = ({location}) => {
 
  const {user}=useSelector((state)=>state.authReducer.authData);
  const posts=useSelector((state)=>state.postReducer.posts);
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER
  return (
    <>
      <div className="profileCard">
        <div className="profileImg">
          <img src={ user.coverPicture? serverPublic + user.coverPicture : serverPublic + 'defaultCover.jpg'} alt="cover" />
          <img src={ user.profilePicture? serverPublic + user.profilePicture : serverPublic + 'defaultProfile.png'} alt="profile" />
        </div>
        <div className="profileName">
          <span>{user.firstname} {user.lastname}</span>
          <span>{user.worksAt? user.worksAt: "Write about yourself"}</span>
        </div>
        <div className="followStatus">
          <hr />
          <div>
            <div className="follow">
              <span>{user.following.length}</span>
              <span>Following</span>
            </div>
            <div className="vl"></div>
            <div className="follow">
              <span>{user.followers.length}</span>
              <span>Followers</span>
            </div>
            {location==="ProfilePage" && (
              <>
                <div className="vl"></div>
                <div className="follow">
                  <span>{posts.filter((post)=>post.userId===user._id).length}</span>
                  <span>Posts</span>
                </div>
              </>
            ) }
          </div>
          <hr />
        </div>
        { location==="ProfilePage" ? ("" ): (<span><Link style={{textDecoration:'none', color:'#2980b9',fontWeight:'bold'}} to={`/profile/${user._id}`}>My Profile</Link></span> )}
      </div>
    </>
  )
}

export default ProfileCard