import React from 'react'
import logo from '../../img/logo.png'
import {UilSearch} from '@iconscout/react-unicons'
import "./Search.css"
const Search = () => {
  return (
    <>
      <div className="search">
        <img src={logo} alt="logo" />
        <div className="isearch">
            <input type="text" placeholder='#Discover...' />
            <div className="s-icon">
                <UilSearch/>
            </div>
        </div>
      </div>
    </>
  )
}

export default Search
