import React from 'react'
import Search from '../logoSearch/Search'
import './Profile.css'
import ProfileCard from '../profileCard/ProfileCard'
import FollowersCard from '../followersCard/FollowersCard'

const Profile = () => {
  return (
    <>
      <div className="profile">
        <Search />
        <ProfileCard location={"HomePage"} />
        <FollowersCard />
      </div>
    </>
  )
}

export default Profile
