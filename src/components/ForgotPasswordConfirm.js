import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  resetPassword,
  resetPasswordConfirm,
  errorResetPassword,
} from "../actions/authActions";
import Header from "./Header";
import { BounceLoader } from "react-spinners";
import Man from "../assets/images/man.svg";
import LeavesMobile from "../assets/images/leaves-mobile.svg";

function ForgotPasswordConfirm() {
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
  const password1 = useRef(null);
  const password2 = useRef(null);

  return (
    <div>
      <Header />
      <section class="main-bg-sectoin registration-page">
        <div class="container">
          <div class="row">
            <div class="col-lg-4 col-md-12 col-sm-12 col-12">
              <h1>Reset Password</h1>
              <form class="register-form">
                <div class="fild-row">
                  <input
                    type="password"
                    class="form-control"
                    name="name"
                    placeholder="Enter New Password"
                    ref={password1}
                    required={true}
                  />
                  <input
                    type="password"
                    required={true}
                    class="form-control"
                    name=""
                    placeholder="Confirm New Password"
                    ref={password2}
                  />
                </div>
                <ul className="password-info">
                  <li>
                    Your password can’t be too similar to your other personal
                    information.
                  </li>
                  <li>Your password must contain at least 8 characters.</li>
                  <li>Your password can’t be a commonly used password.</li>
                  <li>Your password can’t be entirely numeric..</li>
                </ul>

                {confirmationMessage ? (
                  <p style={{ color: "red", marginTop: "20px" }}>
                    {confirmationMessage}
                  </p>
                ) : (
                  ""
                )}
                <div class="fild-row">
                  {!isResettingPassword ? (
                    <button
                      type="submit"
                      class="primary-btn"
                      onClick={(e) => {
                        e.preventDefault();
                        if (
                          password1.current.value !== password2.current.value
                        ) {
                          dispatch(
                            errorResetPassword("Passwords do not match")
                          );
                        } else {
                          const url_string = window.location.href;
                          const url = new URL(url_string);
                          const token = url.searchParams.get("token");
                          dispatch(
                            resetPasswordConfirm(password2.current.value, token)
                          );
                        }
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

export default ForgotPasswordConfirm;
