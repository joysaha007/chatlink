import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import Blur from './components/blur/Blur';
import Admin from './pages/admin/Admin';
import Auth from './pages/auth/Auth';
import Profile from './pages/profile/Profile';
import Home from './pages/home/Home';
import Chat from './pages/Chat/Chat';
import Userpage from './components/admin/Userpage';
import Postpage from './components/admin/Postpage';
import AdminDashboard from './components/admin/AdminDashboard';

function App() {
  const user= useSelector((state)=>state.authReducer.authData)
  return (
    <>
      <div className="main">
        <Blur />

        <Routes>      
          <Route path='/' element={user?<Navigate to ="home"/>:<Navigate to= "auth"/>}/>
          <Route path='/home' element={ user ? <Home /> : <Navigate to="../auth" /> } />
          <Route path='/auth' element={ user ? <Navigate to='../home' /> : <Auth /> } />
          <Route path='/profile/:id' element={ user ? <Profile /> : <Navigate to="../auth" /> } />
          <Route path='/chat' element={ user ? <Chat /> : <Navigate to="../auth" /> } />
          <Route path='/admin' element ={<Admin/>}/>
          <Route path="/admin/viewUser" element={<Userpage />} />
          <Route path="/admin/viewPost" element={<Postpage />} />
          <Route path="/admin/notification" element={<AdminDashboard />} />
        </Routes>


        {/* <Admin/> */ }
        {/* <Home/> */ }
        {/* <Profile/> */ }
        {/* <Auth/> */ }
      </div>
    </>
  );
}

export default App; 