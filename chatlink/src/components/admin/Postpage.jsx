import React from 'react'
import Sidebar from './Sidebar'
import PostList from './PostList'
function Postpage() {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          {/* Sidebar */}
          <div className="col-3 col-md-2 bg-dark text-white vh-100 position-fixed">
            <Sidebar/>
          </div>

          {/* Main content area with offset */}
          <div className="col-9 col-md-10 offset-md-2 ms-auto p-4">
            <PostList/>
          </div>
        </div>
      </div>
    </>
  )
}

export default Postpage