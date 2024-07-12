import React from "react";
import Header from "./Header";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const ValidateEmail = () => {
  const authenticateUser = useSelector((state) => state.authenticateUser.user);
  return (
    <>
      <Header />
      <section className="main-bg-sectoin landing-page validate-email-page">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-7 col-sm-9 col-12">
              <h2 className="text-center h2 d-block">
                Your account has been successfully created
              </h2>
              <div className="box-wrapper">
                <p>
                  We'have sent you a verification link to your email address{" "}
                  {authenticateUser}. Please check your email and verify your
                  email address.
                </p>
                <Link to="/login" title className="primary-btn">
                  Skip verification for now
                </Link>
                <Link to="" title className="primary-btn">
                  Resend verification email
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ValidateEmail;
