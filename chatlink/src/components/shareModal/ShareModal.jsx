import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PostShare from "../postShare/PostShare";

function ShareModal({ modalOpened, setModalOpened }) {
  return (
    <div
      className={`modal fade ${modalOpened ? 'show' : ''}`}
      style={{ display: modalOpened ? 'block' : 'none' }}
      tabIndex="-1"
      aria-labelledby="shareModalLabel"
      aria-hidden={!modalOpened}
    >
      <div className="modal-dialog modal-dialog-centered modal-lg"> {/* Centered and larger for tablets */}
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title text-primary" id="shareModalLabel">Share a Post</h5>
          </div>
          <div className="modal-body">
            <PostShare />
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline-warning"
              onClick={() => setModalOpened(false)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShareModal;
