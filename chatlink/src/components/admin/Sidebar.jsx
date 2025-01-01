import React from 'react'
import './Sidebar.css'
import logo from '../../img/alogo.png'
import post from "../../img/share.png";
import noti from "../../img/noti.png";
import logout from "../../img/logout1.png";
import user1 from "../../img/user1.png";
import dashboard from "../../img/dashboard1.png";
import { useNavigate, Link } from 'react-router-dom'; // Import useNavigate
const Sidebar = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        // Redirect to the authentication page on logout
        localStorage.clear();
        navigate('/auth');
    };

    return (
        <>
            <div className="sidebar text-white p-3" style={ { width: '17%' } }>
                <div className="text-center">
                    <img
                        src={ logo }
                        alt="ChatLink Logo"
                        className='logo3'
                        style={ { width: '100px', height: '100px', borderRadius: '50%', marginBottom: '20px' } }
                    />
                </div>
                <div className="d-flex flex-column">
                    <Link to="/admin" className="text-white text-decoration-none mb-3 d-flex align-items-center a1">
                        <img src={ dashboard } className="imglogo " alt="Dashboard Icon" />
                        Dashboard
                    </Link>
                    <Link to="/admin/viewUser" className="text-white text-decoration-none mb-3 d-flex align-items-center a1">
                        <img src={ user1 } className="imglogo " alt="User Icon" />
                        View Users
                    </Link>
                    <Link to="/admin/viewPost" className="text-white text-decoration-none mb-3 d-flex align-items-center a1">
                        <img src={ post } className="imglogo " alt="Post Icon" />
                        View Posts
                    </Link>
                    <Link to="/admin/Notification" className="text-white text-decoration-none mb-3 d-flex align-items-center a1">
                        <img src={ noti } className="imglogo " alt="Notification Icon" />
                        Notification
                    </Link>
                    <a href='/' className='a1'
                        onClick={ handleLogout }
                    >
                        <img src={ logout } className="imglogo" alt="Logout Icon" />
                        Logout
                    </a>
                </div>
            </div>

        </>
    )
}

export default Sidebar
