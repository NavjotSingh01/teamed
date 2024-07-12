import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import "./assets/css/bootstrap.css";
import "./assets/css/custom2.css";
import "./assets/css/custom5.css";
import "./assets/css/custom.css";
import "./assets/css/custom3.css";
import "./assets/css/responsive.css";

import "./assets/css/responsive2.css";
import "./assets/css/responsive3.css";
import "./assets/css/responsive5.css";
import "./assets/css/responsive6.css";
import AddOffice from "./components/addOffice";
import Login from "./components/Login";
import { ProtectedRoute } from "./components/protected.route";
import SignUp from "./components/SignUp";
import Dashboard from "./containers/Dashboard";
import Home from "./containers/Home";
import Office from "./containers/Office";
import ForgotPassword from "./components/ForgotPassword";
import ForgotPasswordConfirm from "./components/ForgotPasswordConfirm";
import SearchPage from "./pages/SearchPage";

import { getUserProfile } from "./actions/authActions";
import MainLayout from "./layouts/MainLayout/MainLayout";
import PatientSelect from "./containers/PatientSelection";
import Inbox from "./components/Inbox";
import { EditProfile } from "./components/EditProfile";
import { MyOffices } from "./components/MyOffices";
import { OfficeSelect } from "./components/OfficeSelect";
import ValidateEmail from "./components/ValidateEmail";
import BookAppointment from "./components/BookAppointment";

function App() {
  const dispatch = useDispatch();
  // useEffect(() => {
  //   if (localStorage.getItem("id_token")) {
  //     dispatch(getUserProfile());
  //   }
  // });
  const authed = useSelector((state) => state.authenticateUser.isAuthenticated);
  return (
    <BrowserRouter>
      <Route path="/" exact component={Home} />
      <Route path="/login" exact component={Login} />
      <Route path="/SignUp" exact component={SignUp} />
      <Route path="/validate-email" exact component={ValidateEmail} />
      <Route path="/forgot-password" exact component={ForgotPassword} />
      <Route path="/password-reset" exact component={ForgotPasswordConfirm} />

      <Route
        path="/accept-invitation"
        exact
        component={ForgotPasswordConfirm}
      />
      <Route path="/bookappointment" exact component={BookAppointment} />
      <ProtectedRoute
        path="/dashboard"
        authed={authed}
        component={Dashboard}
        exact
      />
      <ProtectedRoute
        path="/patient-select"
        authed={authed}
        component={PatientSelect}
        exact
      />
      <ProtectedRoute
        path="/dashboard/inbox"
        authed={authed}
        component={Inbox}
        exact
      />
      <ProtectedRoute
        path="/dashboard/edit-profile"
        authed={authed}
        component={EditProfile}
        exact
      />
      <ProtectedRoute
        path="/dashboard/my-offices"
        authed={authed}
        component={MyOffices}
        exact
      />
      <ProtectedRoute
        path="/dashboard/office-select"
        authed={authed}
        component={OfficeSelect}
        exact
      />
      <ProtectedRoute
        path="/dashboard/add-office"
        authed={authed}
        component={AddOffice}
      />
      <ProtectedRoute path="/covid" authed={authed} component={MainLayout} />
      <ProtectedRoute path="/office" authed={authed} component={Office} />
    </BrowserRouter>
  );
}

export default App;
