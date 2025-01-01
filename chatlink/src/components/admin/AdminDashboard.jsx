import React from 'react';
import Sidebar from './Sidebar';
import Status from './Status';
import './AdminDashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Graph from './Graph';

//Admin User Id: 6757eeeabacab91a5683007c
const AdminDashboard = () => {



  return (
    <>
      <div className="container-fluid">
        <br/>
        <h1 className="text-center text-light">Admin Dashboard</h1>
        <div className="row">
          {/* Sidebar */}
          <div className="col-3 col-md-2 bg-dark text-white vh-100 position-fixed">
            <Sidebar/>
          </div>

          {/* Main content area with offset */}
          <div className="col-9 col-md-10 offset-md-2 ms-auto p-4">
            <Status />
            <Graph/>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
