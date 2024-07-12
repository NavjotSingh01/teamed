import React, { useState, useRef, useEffect } from "react";
import AuthHeader from "./AuthHeader";
import { BounceLoader } from "react-spinners";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import UserIcon from "../assets/images/user-icon.jpg";
import passwordHide from "../assets/images/password-hide.svg";
import passwordShow from "../assets/images/password-show.svg";
import {
  updateProfile,
  changeUserPassword,
  resetUpdateProfile,
} from "../actions/authActions";
import "../assets/styles/pages/_editprofile.scss";

export const EditProfile = (props: any) => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const primaryProfile = useSelector(
    (state: RootStateOrAny) => state.authenticateUser.primaryProfile
  );
  const errorUpdatingProfile = useSelector(
    (state: RootStateOrAny) => state.authenticateUser.errorUpdatingProfile
  );
  const isUpdatingProfile = useSelector(
    (state: RootStateOrAny) => state.authenticateUser.isUpdatingProfile
  );
  const hasUpdatedProfile = useSelector(
    (state: RootStateOrAny) => state.authenticateUser.hasUpdatedProfile
  );
  const history = useHistory();
  const animatedComponents = makeAnimated();
  const [gender, setGender] = useState(null);

  const { control, register, handleSubmit, watch, errors } = useForm();
  const password = useRef({});
  password.current = watch("password", "");

  const [profilePicture, setProfilePicture] = useState(
    primaryProfile.profile_pic
  );
  const [profileLoader, setProfileLoader] = useState(false);

  const profilePictureHandler = (event: any) => {
    setProfileLoader(true);
    const fileData = event.target.files[0];
    const formData = new FormData();
    formData.append("profile_pic", fileData);
    const token = localStorage.getItem("id_token");
    axios({
      method: "put",
      url: `${process.env.REACT_APP_DEV_API}/update_patient_profile_pic/${primaryProfile.pk}/`,
      data: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.data)
      .then((data) => {
        setProfilePicture(data.profile_pic);
        setProfileLoader(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteProfileHandler = (e: any) => {
    e.preventDefault();
    const token = localStorage.getItem("id_token");
    axios
      .delete(
        `${process.env.REACT_APP_DEV_API}/remove-patient/${primaryProfile.pk}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        history.push({
          pathname: `/patient-select`,
        });
      })
      .catch((err) => console.log(err));
  };

  const formSubmit = (data: any) => {
    console.log(data);
    dispatch(updateProfile(data, primaryProfile.pk));
  };

  useEffect(() => {
    return () => {
      dispatch(resetUpdateProfile());
    };
  }, []);

  return (
    <div>
      <AuthHeader />
      <section className="main-bg-sectoin">
        <div className="container">
          <div className="edit-profile-page">
            <div className="row">
              <div className="col-md-12 col-lg-4 col-xl-5">
                <div className="cancel-wrapper">
                  <a
                    onClick={() => {
                      history.push({
                        pathname: `/patient-select`,
                      });
                    }}
                    title="home"
                  >
                    <i
                      className="fas fa-chevron-circle-left arrow_icon d-show"
                      aria-hidden="true"
                    ></i>
                    <img
                      src={require("../assets/images/back-arrow.png")}
                      alt="back"
                      className="d-mobile"
                    />{" "}
                    home
                  </a>
                </div>
                <h1 className="d-none d-lg-block">
                  {primaryProfile.first_name} <br />
                  {primaryProfile.last_name}
                </h1>
              </div>
              <div className="col-md-12 col-lg-8 col-xl-7">
                <form onSubmit={handleSubmit(formSubmit)}>
                  <div className="appointment-box mb-5">
                    <div className="profile-edit-main">
                      {/* <div className="profile-edit">
                        {profileLoader ? (
                          <div
                            className="profileImg"
                            style={{ background: "none" }}
                          >
                            {" "}
                            <BounceLoader size={60} color={"#052D64"} />{" "}
                          </div>
                        ) : (
                          <div className="profileImg">
                            {profilePicture ? (
                              <img
                                src={profilePicture}
                                alt="Profile images"
                                width="100%"
                                height="100%"
                              />
                            ) : (
                              <img
                                src={UserIcon}
                                alt="Profile images"
                                width="100%"
                                height="100%"
                              />
                            )}
                          </div>
                        )}

                        <div className="btns d-flex">
                          <label className="btn primary-btn">
                            <input
                              type="file"
                              name="profile_image"
                              id="profile_image"
                              onChange={profilePictureHandler}
                            />
                            Upload{" "}
                            <span className="d-only-desk">
                              &nbsp; New Photo
                            </span>
                          </label>
                          <a
                            href="#"
                            className="btn secondary-btn"
                            onClick={deleteProfileHandler}
                          >
                            Delete
                          </a>
                        </div>
                      </div> */}
                      <div className="edit-form">
                        {primaryProfile.is_primary && (
                          <div className="edit-row">
                            <h3>Account</h3>
                            <div className="form-label-group">
                              <input
                                type="email"
                                className="form-control"
                                placeholder="Email Address"
                                required
                                name="email"
                                defaultValue={primaryProfile.user.email}
                                ref={register()}
                              />
                              <label htmlFor="m-code">Email Address</label>
                            </div>
                            <div className="form-label-group password">
                              <input
                                type={!showPassword ? "password" : "text"}
                                id="password-field"
                                className="form-control"
                                name="password"
                                placeholder="Create Password"
                                ref={register()}
                              />
                              <label htmlFor="m-code">Create Password</label>
                              <span className="toggle-password">
                                {!showPassword ? (
                                  <img
                                    src={passwordHide}
                                    onClick={(e) =>
                                      setShowPassword(!showPassword)
                                    }
                                  />
                                ) : (
                                  <img
                                    src={passwordShow}
                                    onClick={(e) =>
                                      setShowPassword(!showPassword)
                                    }
                                  />
                                )}
                              </span>
                            </div>
                            <div className="form-label-group password">
                              <input
                                type={!showPassword ? "password" : "text"}
                                id="confirm_password"
                                className="form-control"
                                name="confirm_password"
                                ref={register({
                                  validate: (value) =>
                                    value === password.current ||
                                    "Please make sure your passwords match",
                                })}
                                placeholder="Create Password"
                              />
                              <label htmlFor="m-code">Confirm Password</label>
                              <span className="toggle-password">
                                {!showPassword ? (
                                  <img
                                    src={passwordHide}
                                    onClick={(e) =>
                                      setShowPassword(!showPassword)
                                    }
                                  />
                                ) : (
                                  <img
                                    src={passwordShow}
                                    onClick={(e) =>
                                      setShowPassword(!showPassword)
                                    }
                                  />
                                )}
                              </span>
                            </div>
                            {errors.confirm_password && (
                              <p className="error">
                                {errors.confirm_password.message}
                              </p>
                            )}
                          </div>
                        )}
                        <div className="edit-row">
                          <h3>Personal Details</h3>
                          <div className="form-label-group">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Preferred Name"
                              name="preferred_name"
                              ref={register()}
                              required
                              defaultValue={primaryProfile.preferred_name}
                            />
                            <label htmlFor="m-code">Preferred Name</label>
                          </div>
                          <div className="form-label-group">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="First Name"
                              name="first_name"
                              ref={register()}
                              required
                              defaultValue={primaryProfile.first_name}
                            />
                            <label htmlFor="m-code">First Name</label>
                          </div>
                          <div className="form-label-group">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Last Name"
                              name="last_name"
                              ref={register()}
                              required
                              defaultValue={primaryProfile.last_name}
                            />
                            <label htmlFor="m-code">Last Name</label>
                          </div>

                          <div className="form-label-group">
                            <select
                              className="form-control"
                              name="gender"
                              ref={register()}
                              defaultValue={primaryProfile.gender}
                            >
                              <option value="male">Male</option>
                              <option value="female">Female</option>
                              <option value="male">Other</option>
                              <option value="male">Male</option>
                            </select>
                          </div>

                          <div className="form-label-group">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Phone Number"
                              defaultValue={primaryProfile.phone}
                              name="phone"
                              ref={register()}
                            />
                            <label htmlFor="m-code">Phone Number</label>
                          </div>

                          <div className="form-label-group">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Address"
                              required
                              name="address"
                              ref={register()}
                              defaultValue={primaryProfile.address}
                            />
                            <label htmlFor="m-code">Address</label>
                          </div>
                          <div className="form-label-group">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="City"
                              required
                              defaultValue={primaryProfile.city}
                              name="city"
                              ref={register()}
                            />
                            <label htmlFor="m-code">City</label>
                          </div>
                          <div className="form-label-group">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Postal Code"
                              required
                              defaultValue={primaryProfile.postal_code}
                              name="postal_code"
                              ref={register()}
                            />
                            <label htmlFor="m-code">Postal Code</label>
                          </div>
                          <div className="form-label-group">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Health Card #"
                              required
                              name="ohip_num"
                              ref={register()}
                              defaultValue={primaryProfile.ohip_num}
                            />
                            <label htmlFor="m-code">
                              OHIP # (10 Characters)
                            </label>
                          </div>
                          <div className="form-label-group">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="OHIP VC"
                              required
                              defaultValue={primaryProfile.ohip_vc}
                              name="ohip_vc"
                              ref={register()}
                            />
                            <label htmlFor="m-code">
                              OHIP VC (2 Characters)
                            </label>
                          </div>
                          <div className="form-label-group">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Dr John Smith"
                              required
                              name="doctor"
                              ref={register()}
                              defaultValue={primaryProfile.doctor}
                            />
                            <label htmlFor="m-code">
                              Your Primary Care (Doctor)
                            </label>
                          </div>
                          {errorUpdatingProfile && (
                            <p>There was an error updating profile.</p>
                          )}
                          {hasUpdatedProfile && (
                            <p>Successfully updated profile.</p>
                          )}
                          <div className="fild-row">
                            {!isUpdatingProfile ? (
                              <button type="submit" className="primary-btn">
                                Save Profile
                              </button>
                            ) : (
                              <BounceLoader color={"#052D64"} size={30} />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
