import React, { useEffect, useState } from 'react'
import './FollowersCard.css'
import User from '../user/User'
import { useSelector } from 'react-redux'
import { getAllUser } from '../api/UserRequest'
const FollowersCard = () => {
    const [persons, setPersons] = useState([]);
    const {user} = useSelector((state)=>state.authReducer.authData);

    useEffect(()=>{
        const fetchPersons = async()=>{
            const {data} = await getAllUser();
            setPersons(data);
            console.log(data);
        };
        fetchPersons();
    },[]);
  return (
    <>
    <div className="FollowersCard">
            <h4>People you may know</h4>
            {persons.map((person, id) => 
                person._id !== user._id ? (
                    <User person={person} key={id} />
                ) : null
            )}
        </div>
      
    </>
  )
}

export default FollowersCard
