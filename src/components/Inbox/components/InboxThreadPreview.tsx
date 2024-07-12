import React from "react";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import { selectOfficeThread } from "../../../actions/inboxActions";
import { updateReadStatus } from "../../../actions/messagingActions";

export const InboxThreadPreview = (props: any) => {
  const dispatch = useDispatch();
  return (
    <div
      className="new-msg-info new-msg-dots private"
      onClick={(e: any) => {
        e.preventDefault();
        dispatch(selectOfficeThread(props.officeThread.pk));
        dispatch(updateReadStatus(props.officeThread.pk)) //Added dispatch of updateReadStatus when User clicks on the thread
      }}
    >
      <div className="new-msg-info-inner">
        <h3>
          {props.officeThread.subject}
          {/* <span className="counter">2</span> */}
        </h3>
        <p>{props.officeThread.office && props.officeThread.office.name}</p>
      </div>
    </div>
  );
};
