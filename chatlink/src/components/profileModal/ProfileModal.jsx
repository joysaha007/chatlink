import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { uploadImage } from '../actions/uploadAction';
import { updateUser } from '../actions/userAction';

function ProfileModal({ modalOpened, setModalOpened,data }) {
  const {password, ...other}=data;
  const [formData,setFormData]=useState(other);
  const [profileImage,setProfileImage]=useState(null);
  const [coverImage,setCoverImage]=useState(null);
  const dispatch =useDispatch();
  const param = useParams();
  // const {user} = useSelector((state)=>state.authReducer.authData);

  const handleChange= (e)=>{
    setFormData({...formData, [e.target.name]: e.target.value});
  }
  const onImageChange=(event)=>{
    if(event.target.files && event.target.files[0]){
      let img= event.target.files[0];
      event.target.name==="profileImage"?setProfileImage(img):setCoverImage(img);
    }
  };
  const handleSubmit=(e)=>{
    e.preventDefault();
    let UserData=formData;
    if(profileImage){
      const data=new FormData();
      const fileName=Date.now()+ profileImage.name;
      data.append("name",fileName);
      data.append("file",profileImage);
      UserData.profilePicture=fileName;
      try {
        dispatch(uploadImage(data));
      } catch (error) {
        console.log(error);
      }
    }
    if(coverImage){
      const data=new FormData();
      const fileName=Date.now()+ coverImage.name;
      data.append("name",fileName);
      data.append("file",coverImage);
      UserData.coverPicture=fileName;
      try {
        dispatch(uploadImage(data));
      } catch (error) {
        console.log(error);

      }
    }
    dispatch(updateUser(param.id,UserData));
    setModalOpened(false);

  }

  return (
    <div
      className={`modal fade ${modalOpened ? 'show' : ''}`}
      style={{ display: modalOpened ? 'block' : 'none' }}
      id="profileModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden={!modalOpened ? 'true' : 'false'}
    >
      <div className="modal-dialog modal-dialog-centered modal-lg"> {/* Centered and larger for tablets */}
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title text-primary" id="exampleModalLabel">Your Info</h5>
          </div>
          <div className="modal-body">
            <form className="infoForm">
              <div className="row">
                <div className="col-md-6 mb-3">
                  <input
                    type="text"
                    className="form-control"
                    name="firstname"
                    placeholder="First Name"
                    onChange={handleChange}
                    value={formData.firstname}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <input
                    type="text"
                    className="form-control"
                    name="lastname"
                    placeholder="Last Name"
                    onChange={handleChange}
                    value={formData.lastname}
                  />
                </div>
                <div className="col-12 mb-3">
                  <input
                    type="text"
                    className="form-control"
                    name="worksAt"
                    placeholder="Works at"
                    onChange={handleChange}
                    value={formData.worksAt}
                  />
                </div>
                <div className="col-12 mb-3">
                  <input
                    type="text"
                    className="form-control"
                    name="livesin"
                    placeholder="Lives in"
                    onChange={handleChange}
                    value={formData.livesin}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <input
                    type="text"
                    className="form-control"
                    name="country"
                    placeholder="Country"
                    onChange={handleChange}
                    value={formData.country}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Relationship Status"
                    name='relationship'
                    onChange={handleChange}
                    value={formData.relationship}
                  />
                </div>
                <div className="col-12 mb-3">
                  <label>Profile Image</label>
                  <input
                    type="file"
                    className="form-control-file"
                    name="profileImage"
                    onChange={onImageChange}
                  />
                </div>
                <div className="col-12 mb-3">
                  <label>Cover Image</label>
                  <input
                    type="file"
                    className="form-control-file"
                    name="coverImage"
                    onChange={onImageChange}
                  />
                </div>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline-warning"
              onClick={() => setModalOpened(false)}
            >
              Close
            </button>
            <button type="button" className="btn btn-outline-primary" onClick={handleSubmit}> 
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileModal;
