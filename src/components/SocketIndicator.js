import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  createSocketConnection,
  createSocketConnectionAndEnterTriage,
} from "../actions/chatActions";

export const SocketIndicator = (props) => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.authenticateUser.profile);
  const socketStatus = useSelector((state) => state.socketStatus.socketStatus);
  const pastTriage = useSelector((state) => state.socketStatus.pastTriage);

  return (
    <div
      className="socket-indicator "
      onClick={() => {
        if (socketStatus === "connected") {
          return;
        } else {
          if (pastTriage) {
            dispatch(
              createSocketConnectionAndEnterTriage(
                props.office.slug,
                profile.pk
              )
            );
          }
          // Didn't pass triage
          else {
            dispatch(createSocketConnection(props.office.slug, profile.pk));
          }
        }
      }}
    >
      <div className="socket-indicator-container">
        <h3 style={{ marginTop: "3px" }}>
          {socketStatus === "connected" ? (
            <div>
              <p>Connected</p>
            </div>
          ) : (
            "Disconnected"
          )}
        </h3>
        <p style={{ marginTop: "4px" }}>
          {socketStatus === "connected" && !pastTriage
            ? `You are connected to the virtual office. If you are looking to join the waiting room, please click on "Check-in" and follow the steps.`
            : socketStatus === "connected" && pastTriage
            ? "You are currently connected to the waiting room. Please wait and your call will be accepted shortly!"
            : "You have disconnected from the virtual office. Please click here to reconnect."}
        </p>
      </div>
    </div>
  );
};
