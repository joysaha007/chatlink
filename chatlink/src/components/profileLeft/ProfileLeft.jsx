import React from 'react'
import "./ProfileLeft.css"
import InfoCard from '../infoCard/InfoCard'
import FollowersCard from '../followersCard/FollowersCard'
import Search from '../logoSearch/Search'
const ProfileLeft = () => {
  return (
    <>
      <div className="ProfileLeft">
        <Search/>
        <InfoCard/>
        <FollowersCard/>
      </div>
    </>
  )
}

export default ProfileLeft
