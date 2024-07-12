import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Route, Switch, useHistory } from "react-router-dom";
import { WaitingList } from "../components/WaitingList";
import CheckIn from "../components/Checkin";
import { getCurrentOffice } from "../actions/patientOfficeActions";
import { getChatConnection } from "../actions/chatActions";
import ServiceSelection from "../components/ServiceSelection";
import { Inbox } from "../components/Inbox/Inbox";
import { VideoCall } from "../components/waitingRoom/VideoCall";
import MobileVideoCall from "../components/waitingRoom/MobileVideoCall";
import { SocketIndicator } from "../components/SocketIndicator";
import { OfficeSelect } from "../components/OfficeSelect";
import { Lobby } from "../pages/Lobby";
import { Appointment } from "../components/appointments/Appointments";
import AppointmentsList from "../components/AppointmentsList";

function Office(props) {
  const authenticateUser = useSelector((state) => state.authenticateUser);
  const primaryProfile = useSelector(
    (state) => state.authenticateUser.primaryProfile
  );
  const patientIntert = useSelector(
    (state) => state.patientInteractions.offices
  );
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!primaryProfile) {
      history.push("/patient-select");
    }
  }, [history, primaryProfile]);

  const office = useSelector((state) => state.patientOfficeInteractions.office);

  return (
    <div>
      <div>
        <Switch>
          <Route path={`/office`} exact>
            <ServiceSelection office={office} />
          </Route>
          <Route path={`/office/${office.slug}/checkin`} exact>
            <CheckIn office={office} />
          </Route>
          <Route path={`/office/appointments-list`} exact>
            <AppointmentsList />
          </Route>
          <Route path={`/office/${office.slug}/appointments`} exact>
            <Appointment office={office} />
          </Route>
          <Route path={`/office/appointment/:id`} exact>
            <Appointment office={office} />
          </Route>
          <Route path={`/office/inbox`} exact>
            <Inbox office={office} />
          </Route>
          <Route path={`/office/${office.slug}/waiting-room`} exact>
            <WaitingList office={office} />
          </Route>
          <Route
            path={`/office/${office.slug}/video-call`}
            exact
            component={Lobby}
          ></Route>
          <Route
            path={`/office/${office.slug}/mobile-video-call`}
            exact
            component={MobileVideoCall}
          ></Route>
        </Switch>
        {/* <SocketIndicator office={office} /> */}
      </div>
    </div>
  );
}

export default Office;
