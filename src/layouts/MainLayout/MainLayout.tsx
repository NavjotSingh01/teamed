import React, { useEffect } from "react";
import Header from "../../components/Header/Header";
import Router from "../../routes/Router";
import "../../assets/styles/index.scss";
import AuthHeader from "../../components/AuthHeader";
import { RootStateOrAny, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

const MainLayout: React.FC = () => {
  const primaryProfile = useSelector(
    (state: RootStateOrAny) => state.authenticateUser.primaryProfile
  );
  const history = useHistory();
  useEffect(() => {
    window.addEventListener("beforeunload", function (e) {
      var confirmationMessage =
        "Are you sure you want to leave? Leaving will require you to restart the questionnaire.";

      (e || window.event).returnValue = confirmationMessage; //Gecko + IE
      return confirmationMessage; //Gecko + Webkit, Safari, Chrome etc.
    });
  }, []);
  useEffect(() => {
    if (!primaryProfile) {
      history.push("/patient-select");
    }
  }, []);
  return (
    <div className="covid-testing">
      {primaryProfile && <AuthHeader />}

      <Router />
    </div>
  );
};

export default MainLayout;
