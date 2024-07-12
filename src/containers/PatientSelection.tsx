import React, { useEffect, useState } from "react";

import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { useHistory } from "react-router-dom";
import { getUserProfile, selectPrimaryProfile } from "../actions/authActions";
import Header from "../components/Header";
import PlusIcon from "../assets/images/plus-icon.svg";
import UserIcon from "../assets/images/user-icon.jpg";
import { DependantModal } from "../components/DependantModal";
import { Flower } from "../components/Flower";

function PatientSelect() {
  const [showWarning, setShowWarning] = useState<boolean>(false);
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const profileReceived = useSelector(
    (state: RootStateOrAny) => state.authenticateUser.profileReceived
  );
  const profile = useSelector(
    (state: RootStateOrAny) => state.authenticateUser.profile
  );

  useEffect(() => {
    dispatch(getUserProfile());
  }, [modalIsOpen]);

  useEffect(() => {
    if (!localStorage.getItem("show-warning")) {
      setShowWarning(true);
    }
  }, []);

  return profileReceived ? (
    <div>
      <Header />
      {modalIsOpen && <DependantModal setIsOpen={setIsOpen} />}
      <section className="main-bg-sectoin select-visitor">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-12 col-sm-12 col-12">
              <div className="who-visited">
                <h1>Who's visiting today?</h1>
              </div>
              {showWarning && (
                <div className="building-profile">
                  <div className="registration-tab">
                    <a
                      href="#"
                      title="Registration"
                      className="registration-link"
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
                      <span>Registration</span>
                    </a>
                  </div>
                  <a
                    href="#"
                    title="close"
                    className="close-building"
                    onClick={(e) => {
                      e.preventDefault();
                      localStorage.setItem("show-warning", "false");
                      setShowWarning(false);
                    }}
                  ></a>
                  <div className="wait-info">
                    <h3>Finish building your profile</h3>
                  </div>
                  <p>
                    If you’re booking appointments for more members of your
                    family, be sure to add dependents to your account.
                  </p>
                  <a
                    href="#"
                    title="Add Dependents"
                    className="primary-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsOpen(true);
                    }}
                  >
                    Add Dependents
                  </a>
                </div>
              )}
            </div>
            <div className="col-lg-5 col-md-12 col-sm-12 col-12">
              <div className="main">
                {profile &&
                  profile.map((p: any) => (
                    <div
                      className="visited-list d-flex align-items-center"
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(selectPrimaryProfile(p));
                        //history.push('/dashboard')
                        history.push(`/office`);
                      }}
                    >
                      <div className="profile">
                        {p.profile_pic ? (
                          <img src={p.profile_pic} alt="img" />
                        ) : (
                          <img src={UserIcon} alt="img" />
                        )}
                      </div>
                      <div className="d-flex align-items-center justify-content-between details">
                        <h2>
                          {p.first_name} {p.last_name}
                        </h2>
                        {p.is_primary && <span>Admin</span>}
                      </div>
                    </div>
                  ))}

                <div
                  className="visited-list d-flex align-items-center some-one-else"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsOpen(true);
                  }}
                >
                  <div className="profile">
                    <img src={UserIcon} alt="img" />
                  </div>
                  <div className="d-flex align-items-center justify-content-between details">
                    <h2>Someone else</h2>
                    <span>
                      <img src={PlusIcon} alt="plus" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Flower />
      </section>
    </div>
  ) : (
    "LOADING"
  );
}

export default PatientSelect;
