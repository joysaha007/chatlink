import React from 'react'
import Profile from '../../components/profile/Profile'
import './Home.css'
import PostSide from '../../components/postside/PostSide'
import RightSide from '../../components/rightSide/RightSide'

const Home = () => {
  return (
    <>
      <div className="home">
        <Profile/>
        <PostSide/>
        <RightSide/>
      </div>
    </>
  )
}

export default Home
