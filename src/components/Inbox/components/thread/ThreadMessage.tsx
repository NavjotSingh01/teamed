import React from "react";
import moment from "moment";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import { downloadFileAttachment } from "../../../../actions/inboxActions";
import Linkify from "react-linkify";

export const ThreadMessage = (props: any) => {
  const primaryProfile = useSelector(
    (state: RootStateOrAny) => state.authenticateUser.primaryProfile
  );
  const dispatch = useDispatch();
  return (
    <div
      className={`chat-text ${
        props.message.sent_by_name !==
        `${primaryProfile.first_name} ${primaryProfile.last_name}`
          ? "chat-left"
          : ""
      }`}
    >
      <div className="chat-info">
        {props.message.sent_by_name}
        {/* <span className="chat-user">
          <img src="images/user.png" alt="" />
        </span> */}
      </div>
      <div className="chat-box">
        {!props.message.image ? (
          <Linkify>{props.message.message}</Linkify>
        ) : (
          <p
            style={{ textDecoration: "underline", cursor: "pointer" }}
            onClick={(e) => {
              e.preventDefault();
              dispatch(downloadFileAttachment(props.message.pk));
            }}
          >
            Attachment has been sent. Click here to download file.
          </p>
        )}
      </div>
      <span className="chat-time">
        {moment(props.message.datetime).fromNow()}
      </span>
    </div>
  );
};
