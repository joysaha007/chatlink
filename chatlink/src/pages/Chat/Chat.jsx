import React, { useEffect, useRef, useState } from 'react';
import './Chat.css';
import { Link } from "react-router-dom";
import Search from '../../components/logoSearch/Search';
import { useSelector } from 'react-redux';
import { userChats } from '../../components/api/ChatRequest';
import Conversation from '../../components/Conversation/Conversation';
import Home from "../../img/home.png";
import Noti from "../../img/noti.png";
import Comment from "../../img/comment.png";
import Profile from "../../img/profile.png";
import ChatBox from '../../components/ChatBox/ChatBox';
import { io } from 'socket.io-client';

const Chat = () => {
  const [Chats, setChats] = useState([]);
  const { user } = useSelector((state) => state.authReducer.authData);
  const [currentChat, setCurrentChat] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);
  const socket = useRef();

  useEffect(() => {
    socket.current = io('http://localhost:8800');
    socket.current.emit("new-user-add", user._id);
    socket.current.on('get-user', (users) => {
      setOnlineUsers(users);
    });

    return () => {
      socket.current.disconnect(); // Clean up the socket connection on component unmount
    };
  }, [user]);

  useEffect(() => {
    const getChats = async () => {
      try {
        const { data } = await userChats(user._id);
        setChats(data);
      } catch (error) {
        console.log(error);
      }
    };
    getChats();
  }, [user._id]);

  // Send Message to socket server
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  // Get the message from socket server
  useEffect(() => {
    socket.current.on("recieve-message", (data) => {
      setReceivedMessage(data);
    });

    socket.current.on("user-offline", (userId) => {
      setOnlineUsers((prevOnlineUsers) =>
        prevOnlineUsers.filter((user) => user.userId !== userId)
      );
    });
  }, []);

  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== user._id);
    const online = onlineUsers.find((user) => user.userId === chatMember);
    return online ? true : false;
  };

  return (
    <>
      <div className="Chat">
        {/* Left Side */}
        <div className="Left-side-chat">
          <Search />
          <div className="Chat-container">
            <h2 className='text-primary'>Chats</h2>
            <div className="Chat-list">
              {Chats.map((chat) => (
                <div onClick={() => setCurrentChat(chat)} key={chat._id}>
                  <Conversation data={chat} currentUser={user._id} online={checkOnlineStatus(chat)} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="Right-side-chat">
          <div style={{ width: '20rem', alignSelf: 'flex-end', marginRight: '10px' }}>
            <div className="navIcons">
              <Link to={'/home'}><img src={Home} alt="Home" /></Link>
              <Link to={`/profile/${user._id}`}><img src={Profile} alt="Profile" /></Link>
              <img src={Noti} alt="Notifications" />
              <Link to={'/chat'}><img src={Comment} alt="Comments" /></Link>
            </div>
          </div>
          {/* Chat Body */}
          <ChatBox chat={currentChat} currentUser={user._id} setSendMessage={setSendMessage} receivedMessage={receivedMessage} />
        </div>
      </div>
    </>
  );
};

export default Chat;
