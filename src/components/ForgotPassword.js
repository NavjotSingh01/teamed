import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { resetPassword } from "../actions/authActions";
import Header from "./Header";
import { BounceLoader } from "react-spinners";
import Man from "../assets/images/man.svg";
import LeavesMobile from "../assets/images/leaves-mobile.svg";

function ForgotPassword() {
  const isFetching = useSelector((state) => state.authenticateUser.isFetching);
  const isAuthenticated = useSelector(
    (state) => state.authenticateUser.isAuthenticated
  );
  const errorMessage = useSelector(
    (state) => state.authenticateUser.errorMessage
  );
  const profileReceived = useSelector(
    (state) => state.authenticateUser.profileReceived
  );
  const isResettingPassword = useSelector(
    (state) => state.authenticateUser.isResettingPassword
  );

  const confirmationMessage = useSelector(
    (state) => state.authenticateUser.confirmationMessage
  );
  const dispatch = useDispatch();
  const email = useRef(null);
  const password = useRef(null);

  return (
    <div>
      <Header />
      <section class="main-bg-sectoin registration-page">
        <div class="container">
          <div class="row">
            <div class="col-lg-4 col-md-12 col-sm-12 col-12">
              <h1>Reset Password</h1>
              <div class="account-sign-register">
                Don’t have an account? <Link to="/signup/">Register Now</Link>
              </div>
              <form class="register-form">
                <div class="fild-row">
                  <input
                    type="email"
                    class="form-control"
                    name="name"
                    placeholder="Email Address"
                    ref={email}
                  />
                </div>

                {confirmationMessage ? <p>{confirmationMessage}</p> : ""}
                <div class="fild-row">
                  {!isResettingPassword ? (
                    <button
                      type="submit"
                      class="primary-btn"
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(resetPassword(email.current.value));
                      }}
                    >
                      Reset Password
                    </button>
                  ) : (
                    <BounceLoader color={"#052D64"} size={50} />
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
        <div class="img-wrppaer full-img">
          <img src={Man} class="man-img" alt="man" />
        </div>
        <div class="mobile-leaves">
          <img src={LeavesMobile} alt="" />
        </div>
      </section>
      {profileReceived ? <Redirect to="/dashboard" /> : ""}
    </div>
  );
}

export default ForgotPassword;
