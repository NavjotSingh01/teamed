import React, { useState, useEffect } from "react";
import Footer from "../components/Footer/Footer";
import routes from "../routes/routes";
import s from "../assets/styles/PagesStyles.module.scss";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import {
  savePatientInfo,
  checkEmail,
  setProfileData,
} from "../actions/covidActions";
import * as yup from "yup";
const InputMask = require("react-input-mask");

const ProfilePage: React.FC = () => {
  const [isGenderListOpen, setIsGenderListOpen] = useState<boolean>(false);
  const [selectedGender, setSelectedGender] = useState<string>("");
  const { control, register, handleSubmit, watch, errors } = useForm();
  const toggleIsGenderListOpen = () => setIsGenderListOpen(!isGenderListOpen);
  const dispatch = useDispatch();

  const newUser = useSelector(
    (state: RootStateOrAny) => state.mainReducer.newUser
  );

  const profileData = useSelector(
    (state: RootStateOrAny) => state.mainReducer.profileData
  );

  const profileComplete = useSelector(
    (state: RootStateOrAny) => state.mainReducer.profileComplete
  );

  const [formData, setFormData] = useState({});
  const formSubmit = (data: any) => {
    // dispatch(savePatientInfo(data));
    console.log(data);
  };

  let questionnaireSchema = yup.object().shape({
    first_name: yup.string().required(),
    last_name: yup.string().required(),
    phone: yup.string().required(),
    email: yup.string().email(),
    password: yup
      .string()
      .test("len", "Must be 6 or more characters", (val:any) => val.length >= 6),
    ohipNum: yup
      .string()
      .required()
      .test(
        "len",
        "OHIP Number must be 10 characters",
        (val:any) => val.length === 10
      ),
    ohip_vc: yup
      .string()
      .required()
      .test("len", "OHIP VC must be 2 characters", (val:any) => val.length === 2),
    date_of_birth: yup.string().required(),
    doctor: yup.string().required(),
    address: yup.string().required(),
    gender: yup.string().required(),
    city: yup.string().required(),
    contact: yup.string().required(),
    contactDescription: yup.string(),
    requiredTesting: yup.string(),
    requiredTestingDescription: yup.string(),
    is_attending_school: yup.string(),
    sympton_startedfrom: yup.string(),
  });

  const handleFormChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    questionnaireSchema
      .isValid(formData)
      .then((res) => {
        dispatch(setProfileData(formData));
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="wizard clearfix">
              <div className="content clearfix">
                <section
                  className="common-step profile body current"
                  id="example-basic-p-1"
                  role="tabpanel"
                  aria-labelledby="example-basic-h-1"
                  aria-hidden="false"
                  // style="left: 0px;"
                >
                  <div className="left-side">
                    <h2>Set up your profile</h2>
                    <p>
                      We complete our triage process online to keep your in
                      person testing quick and safe.
                    </p>
                  </div>
                  <div className="right-side b-lbl">
                    <form onBlur={handleSubmit(formSubmit)}>
                      <div className="row">
                        <div className="col-lg-6">
                          <h3>Contact Information</h3>
                          <div className="form-label-group">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="First Name"
                              name="first_name"
                              onBlur={(e) => {
                                handleFormChange(e);
                              }}
                              defaultValue={profileData.first_name}
                            />
                            <label htmlFor="m-code">First Name</label>
                          </div>
                          <div className="form-label-group">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Last Name"
                              name="last_name"
                              onBlur={(e) => {
                                handleFormChange(e);
                              }}
                              defaultValue={profileData.last_name}
                            />
                            <label htmlFor="m-code">Last Name</label>
                          </div>
                          <div className="form-label-group">
                            <InputMask
                              name="phone"
                              className="form-control"
                              mask="9999999999"
                              placeholder="Phone Number"
                              onBlur={(e: any) => {
                                handleFormChange(e);
                              }}
                              defaultValue={profileData.phone}
                            />
                            {/* <input
                              type="text"
                              className="form-control"
                              placeholder="Phone Number"
                              name="phone"
                              onBlur={(e) => {
                                handleFormChange(e);
                              }}
                            /> */}
                            <label htmlFor="m-code">Phone Number</label>
                          </div>
                          <div className="form-label-group">
                            <input
                              type="email"
                              className="form-control"
                              placeholder="Email Address"
                              name="email"
                              onBlur={(e) => {
                                dispatch(checkEmail(e.target.value));
                                handleFormChange(e);
                              }}
                              defaultValue={profileData.email}
                            />
                            <label htmlFor="m-code">Email Address</label>
                            <p style={{ color: "red" }} className="error">
                              {newUser == false
                                ? "There is already a user affiliated with this email. Login to Corigan and continue the process there."
                                : ""}
                            </p>
                          </div>
                          <div className="form-label-group password d-only">
                            <input
                              type="password"
                              className="form-control"
                              name="password"
                              placeholder="Create Password"
                              onBlur={(e) => {
                                handleFormChange(e);
                              }}
                              defaultValue={profileData.password}
                            />
                            <label htmlFor="m-code">Create Password</label>
                          </div>

                          <div className="reminder-checkbox s-check m-only">
                            <input
                              id="check"
                              className="checkbox-custom"
                              name="check"
                              type="checkbox"
                            />
                            <label
                              htmlFor="check"
                              className="checkbox-custom-label"
                            >
                              <span>
                                Send me an email reminder on the day of my
                                appointment
                              </span>
                            </label>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <h3>Health Information</h3>
                          <div className="form-label-group">
                            <InputMask
                              name="ohip_num"
                              className="form-control"
                              mask="9999999999"
                              onBlur={(e: any) => {
                                handleFormChange(e);
                              }}
                              defaultValue={profileData.ohip_num}
                            />

                            <label htmlFor="m-code">OHIP Number</label>
                          </div>
                          <div className="form-label-group">
                            <InputMask
                              name="ohip_vc"
                              className="form-control"
                              mask="aa"
                              onBlur={(e: any) => {
                                handleFormChange(e);
                              }}
                              defaultValue={profileData.ohip_vc}
                            />
                            <label htmlFor="m-code">
                              OHIP VC (last 2 letters)
                            </label>
                          </div>
                          <div className="form-label-group">
                            <InputMask
                              name="date_of_birth"
                              placeholder="yyyy/mm/dd"
                              className="form-control"
                              mask="9999-99-99"
                              onBlur={(e: any) => {
                                handleFormChange(e);
                              }}
                              defaultValue={profileData.date_of_birth}
                            />
                            {/* <input
                              type="text"
                              className="form-control"
                              placeholder="dd/mm/yyyy"
                              name="date_of_birth"
                              onBlur={(e) => {
                                handleFormChange(e);
                              }}
                            /> */}
                            <label htmlFor="m-code">
                              Date of Birth (dd/mm/yyyy)
                            </label>
                          </div>
                          <div className="form-label-group">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="address"
                              name="address"
                              onBlur={(e) => {
                                handleFormChange(e);
                              }}
                              defaultValue={profileData.address}
                            />
                            <label htmlFor="m-code">Address</label>
                          </div>
                          <div className="fild-row">
                            <div className="drop-down">
                              <div className="selected">
                                <select
                                  name="gender"
                                  id=""
                                  className="form-control"
                                  style={{
                                    height: "72px",
                                    padding: "25px 15px",
                                    border: 0,
                                  }}
                                  defaultValue={profileData.gender}
                                >
                                  <option value="male">Male</option>
                                  <option value="female">Female</option>
                                </select>
                              </div>
                            </div>
                          </div>

                          <span className="note">
                            All information you provide is kept secure and will
                            be used only for the purpose of your COVID-19
                            testing.
                          </span>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="reminder-checkbox s-check d-only">
                            <input
                              id="check1"
                              className="checkbox-custom"
                              name="check1"
                              type="checkbox"
                            />
                            <label
                              htmlFor="check1"
                              className="checkbox-custom-label"
                            >
                              <span>
                                Send me an email reminder on the day of my
                                appointment
                              </span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer
        isAuthorized={false}
        nextLink={routes.SYMPTOMS_LIST_PAGE.path}
        prevLinkTitle="Pick a time"
        nextLinkTitle="Screening Questions"
        progressLevel={45}
        hideNextStep={
          newUser == null || newUser == false || !profileComplete ? false : true
        }
      />
    </>
  );
};

export default ProfilePage;
