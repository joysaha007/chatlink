import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Logoa from "../../img/alogo.png";
import './Auth.css'
import { useDispatch, useSelector } from "react-redux";
import { logIn, signUp } from "../../components/actions/AuthAction";
import { useNavigate } from "react-router-dom";  // Import useNavigate
import TermsModal from "./TermsModal";

const Auth = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.authReducer.loading)
  const error = useSelector((state) => state.authReducer.error);
  const [isSignUp, setIsSignUp] = useState(true);



  const [data, setData] = useState({ firstname: "", lastname: "", username: "", password: "", confirmpass: "" })
  const [showAlert1, setShowAlert1] = useState(false);
  const [showAlert2, setShowAlert2] = useState(false);
  const [showAlert3, setShowAlert3] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const handleForgotPassword = () => {
    setShowAlert1(true);
    setTimeout(() => {
      setShowAlert1(false);
    }, 3000);
  };
  const handle2 = () => {
    if (data.username !== "" && data.password !== "") {
      setShowAlert2(error ? true : false);
    }
    setTimeout(() => {
      setShowAlert2(false);
    }, 3000);
  };
  const handle3 = () => {
    if (data.username !== "" && data.password !== ""&& isAgreed) {
      setShowAlert3(error ? true : false);
    }
    setTimeout(() => {
      setShowAlert3(false);
    }, 3000);
  };
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }
  const [confirmpass, setConfirmPass] = useState(true);
  const navigate = useNavigate();  // Initialize navigate

  const handleSubmit = (e) => {
    e.preventDefault();


    // Check if username and password are "admin1" and navigate to admin page
    if (data.username === "admin1" && data.password === "admin1") {
      localStorage.setItem("userId", "6757eeeabacab91a5683007c");
      navigate("/admin");  // Navigate to the admin page
      return;  // Stop further execution
    }


    if (isSignUp) {
      data.password === data.confirmpass ? dispatch(signUp(data)) : setConfirmPass(false);

    } else {
      dispatch(logIn(data));
    }
  }
  const resetForm = () => {
    setConfirmPass(true);
    setData({
      firstname: "",
      lastname: "",
      username: "",
      password: "",
      confirmpass: ""
    })
  }
  const handleShowTermsModal = () => {
    setShowTermsModal(true);
  };

  const handleCloseTermsModal = () => {
    setShowTermsModal(false);
  };

  return (
    // Left Side

    <div className="mainBody">
      <div className="d-flex  align-items-center justify-content-center vh-100">
        <div className="a-left p-3 d-flex flex-column align-items-center text-center text-md-start  ">
          <img
            src={ Logoa }
            alt="ChatLink Logo"
            className='logo3'
            style={ { width: '100px', height: '100px', borderRadius: '50%', marginBottom: '20px' } }
          />
          <div className="Webname text-center">
            <h1 className="text-light">
              { isSignUp ? "Welcome to ChatLink!" : "Welcome to Login!" }
            </h1>
            <span className="text-light" style={ { fontSize: '16px' } }>
              { isSignUp ? "Already have an account? " : "Don't have an account? " }</span><br /><br />
            <button onClick={ () => { setIsSignUp((prev) => !prev); resetForm() } } className="btn btn-outline-warning w-20" disabled={ loading }>{ loading ? "Loading..." : isSignUp ? "Login" : "Sign up" }</button>
          </div>
        </div>

        {/* Right Side */ }
        <div className="a-right ">
          <form className="infoForm authForm p-4 rounded border form3" onSubmit={ handleSubmit }>
            <h3 className=" text-center">{ isSignUp ? <span className="heading1">Create an Account</span> : <span className="heading1">Login</span> }</h3><br />


            { isSignUp &&
              <div className="row g-2 mb-3">
                <div className="col">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="form-control"
                    name="firstname"
                    onChange={ handleChange }
                    required
                  />
                </div>
                <div className="col">
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="form-control"
                    name="lastname"
                    onChange={ handleChange }
                    required
                  />
                </div>
              </div>
            }

            <div className="mb-3">
              <input
                type="text"
                className="form-control tinput"
                name="username"
                placeholder="Username"
                onChange={ handleChange }
                value={ data.username }
                required
              />
            </div>
            <div className="row g-2 mb-3">
              <div className="col">
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Password"
                  onChange={ handleChange }
                  value={ data.password }
                  required
                />
              </div>
              { isSignUp &&
                <div className="col">
                  <input
                    type="password"
                    className="form-control"
                    name="confirmpass"
                    placeholder="Confirm Password"
                    onChange={ handleChange }
                    value={ data.confirmpass }
                  />
                </div>
              }

            </div>
            <div className="mb-3 text-center">
              <span className="text-danger" style={ { fontSize: '12px', display: confirmpass ? "none" : "block" } } >* Confirm Password is not same!</span>
            </div>
            { isSignUp ? <div class="form-check" style={ { display: 'inline' } }>
              <input className="form-check-input" style={ { marginLeft: '2%' } } type="checkbox"
                    value="" id="flexCheckDefault" required onChange={(e) => setIsAgreed(e.target.checked)}/>
              <label className="form-check-label text-light " for="flexCheckDefault">
                I agree all statements in <span className="text-primary" style={{cursor:'pointer'}} onClick={handleShowTermsModal}>Terms of service </span>
              </label>
            </div> : "" }
            <button className="button w-100 mt-3 mb-3" type="submit" onClick={() => { handle2(); handle3(); }} disabled={ loading }>{ loading ? "Loading..." : isSignUp ? "Sign up" : "Login" }</button>
            { isSignUp ? "" : <div class="form-check" style={ { display: 'inline' } }>
              <input className="form-check-input" style={ { marginLeft: '2%' } } type="checkbox" value="" id="flexCheckDefault" />
              <label className="form-check-label text-light" style={ { marginRight: '30%' } } for="flexCheckDefault">
                Remember Me?
              </label>
            </div> }
            { isSignUp ? "" : <span className="text-danger" style={ { cursor: 'pointer' } } onClick={ handleForgotPassword }>Forgot Password</span> }
            { showAlert2 && !isSignUp && (
              <div className="alert alert-warning mt-3" role="alert">
                <strong>Warning!</strong> Invalid Username and Password!
              </div>
            ) }
            { showAlert3 && isSignUp && (
              <div className="alert alert-danger mt-3" role="alert">
                <strong>Warning!</strong> User is already registered!
              </div>
            ) }
            { showAlert1 && (
              <div className="alert alert-primary mt-3" role="alert">
                <strong>Attention!</strong> Please contact the admin for password recovery.
              </div>
            ) }
          </form>
        </div>

      </div>
      {/* Render Terms Modal */}
      <TermsModal show={showTermsModal} handleClose={handleCloseTermsModal} />
    </div>
  );
};



export default Auth;
