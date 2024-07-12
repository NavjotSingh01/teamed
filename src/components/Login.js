import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  loginUser,
  setTermsAndConditions,
  loginUserAndAcceptTerms,
} from "../actions/authActions";
import Header from "./Header";
import { BounceLoader } from "react-spinners";
import Man from "../assets/images/man.svg";
import LeavesMobile from "../assets/images/leaves-mobile.svg";
import Modal from "react-modal";
import InputMask from "react-input-mask";
import PrivacyPolicy from "./privacyPolicy";

import passwordHide from "../assets/images/password-hide.svg";
import passwordShow from "../assets/images/password-show.svg";

function Login() {
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
  const termsAndCondition = useSelector(
    (state) => state.authenticateUser.termsAndCondition
  );

  const dispatch = useDispatch();
  const email = useRef(null);
  const password = useRef(null);

  const [showPassword, setShowPassword] = useState(false);
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      maxHeight: "100vh",
      marginRight: "-50%",
      overflowY: "auto",
      transform: "translate(-50%, -50%)",
    },
  };

  return (
    <div>
      <Header />
      <section class="main-bg-sectoin registration-page login-page">
        <Modal
          isOpen={termsAndCondition}
          style={customStyles}
          onRequestClose={() => dispatch(setTermsAndConditions(false))}
        >
          <PrivacyPolicy />
          <button
            class="primary-btn"
            style={{
              float: "left",
              maxWidth: "100px",
              marginRight: "20px",
              fontSize: "16px",
              height: "50px",
            }}
            onClick={(e) => {
              e.preventDefault();
              dispatch(setTermsAndConditions(false));
            }}
          >
            Cancel
          </button>
          <button
            class="primary-btn"
            style={{
              float: "left",
              maxWidth: "100px",
              fontSize: "16px",
              height: "50px",
            }}
            onClick={(e) => {
              e.preventDefault();
              dispatch(
                loginUserAndAcceptTerms({
                  email: email.current.value,
                  password: password.current.value,
                })
              );
              dispatch(setTermsAndConditions(false));
            }}
          >
            I Accept
          </button>
          q
        </Modal>

        <div class="container">
          <div class="row">
            <div class="col-lg-4 col-md-12 col-sm-12 col-12">
              <h1 class="text-center">Sign In</h1>
              <form class="register-form">
                <div class="form-label-group">
                  <input
                    type="email"
                    class="form-control"
                    name="name"
                    placeholder="Email Address"
                    ref={email}
                  />
                  <label for="m-code">Email Address</label>
                </div>
                <div class="form-label-group password">
                  <input
                    type={!showPassword ? "password" : "text"}
                    class="form-control"
                    name="password"
                    placeholder="Password"
                    ref={password}
                  />
                  <label for="m-code">Password</label>
                  <span toggle="#password-field" class="toggle-password">
                    {!showPassword ? (
                      <img
                        src={passwordHide}
                        onClick={(e) => setShowPassword(!showPassword)}
                      />
                    ) : (
                      <img
                        src={passwordShow}
                        onClick={(e) => setShowPassword(!showPassword)}
                      />
                    )}
                  </span>
                </div>
                {errorMessage ? <p>{errorMessage}</p> : ""}
                <div class="fild-row">
                  {!isFetching ? (
                    <button
                      type="submit"
                      class="primary-btn"
                      onClick={(e) => {
                        e.preventDefault();
                        if (!email.current.value || !password.current.value) {
                          return;
                        } else {
                          dispatch(
                            loginUser({
                              email: email.current.value,
                              password: password.current.value,
                            })
                          );
                        }
                      }}
                    >
                      Sign In
                    </button>
                  ) : (
                    <BounceLoader color={"#052D64"} size={50} />
                  )}
                </div>
              </form>
              <div class="account-sign-register text-center mt-4">
                Don’t have an account? <Link to="/signup/">Register Now</Link>
              </div>
              <div
                class="account-sign-register text-center"
                style={{ marginTop: "20px" }}
              >
                Forgot your password?{" "}
                <Link to="/forgot-password/">Reset Now.</Link>
              </div>
            </div>
          </div>
        </div>
        <div class="img-wrppaer full-img">
          <img src={Man} class="man-img" alt="man" />
        </div>
      </section>

      {profileReceived ? <Redirect to="/patient-select" /> : ""}
    </div>
  );
}

export default Login;
