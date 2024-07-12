import React, { useEffect } from "react";
import Header from "../components/Header";
import { useHistory } from "react-router-dom";
import { isMobile } from "react-device-detect";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";

import { getVideoToken } from "../actions/videoCallActions";
import { VideoCall } from "../components/waitingRoom/VideoCall";
import { getVideoName } from "../actions/chatActions";

export const Lobby = (props: any) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const videoToken = useSelector(
    (state: RootStateOrAny) => state.videoCallReducer.videoToken
  );
  const videoChannelName = useSelector(
    (state: RootStateOrAny) => state.connectToChat.videoChannelName
  );

  const currentPatient = useSelector(
    (state: RootStateOrAny) => state.authenticateUser.primaryProfile
  );
  const office = useSelector(
    (state: RootStateOrAny) => state.patientOfficeInteractions.office
  );
  const socket = useSelector(
    (state: RootStateOrAny) => state.connectToChat.socket
  );

  useEffect(() => {
    socket.send(
      JSON.stringify({
        type: "JOIN_WAITING_ROOM",
        patient: currentPatient.pk,
        is_patient: true,
        office: office.slug,
      })
    );
  }, []);

  useEffect(() => {
    if (videoChannelName) {
      dispatch(
        getVideoToken(
          currentPatient.user.email,
          currentPatient.first_name,
          videoChannelName
        )
      );
    }
  }, [videoChannelName]);

  useEffect(() => {
    getVideoName(currentPatient.pk, office.pk);
  }, []);

  return (
    <React.Fragment>
      {!isMobile ? <Header /> : ""}
      {videoToken ? <VideoCall videoToken={videoToken} /> : ""}
    </React.Fragment>
  );
};
