import moment from "moment";
import React, { useEffect, useState } from "react";
import Avatar from "react-avatar";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  getUserProfile,
  getOfficeRequests,
  selectPrimaryProfile,
} from "../../actions/authActions";

import Header from "../../components/Header";

import UserIcon from "../../assets/images/user-icon.jpg";

function AddDependant() {
  const history = useHistory();
  const dispatch = useDispatch();

  const profile = useSelector(
    (state: RootStateOrAny) => state.authenticateUser.profile
  );

  const primaryProfile = useSelector(
    (state: RootStateOrAny) => state.authenticateUser.primaryProfile
  );

  const questionnaireResponses = useSelector(
    (state: RootStateOrAny) => state.mainReducer.questionnaireResponses
  );

  const selectedClinic = useSelector(
    (state: RootStateOrAny) => state.mainReducer.selectedClinic
  );

  return (
    <div>
      <section className="main-bg-sectoin select-visitor">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-12 col-sm-12 col-12">
              <div className="who-visited">
                <h1>Select Dependant</h1>
              </div>
            </div>
            <div className="col-lg-5 col-md-12 col-sm-12 col-12">
              <div className="main">
                {profile &&
                  profile.map((p: any) =>
                    questionnaireResponses.filter(
                      (o: any) => o.patientPk === p.pk
                    ).length > 0 ? (
                      <div
                        className="visited-list d-flex align-items-center"
                        style={{ opacity: "0.5" }}
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
                    ) : (
                      <div
                        className="visited-list d-flex align-items-center"
                        onClick={(e) => {
                          e.preventDefault();
                          dispatch(selectPrimaryProfile(p));
                          if (selectedClinic.questions_enabled) {
                            history.push("/covid/in-contact");
                          } else {
                            history.push("/covid/questionnaire-complete");
                          }
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
                    )
                  )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AddDependant;
