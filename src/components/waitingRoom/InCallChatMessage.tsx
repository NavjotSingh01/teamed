import React from "react";
import Avatar from "react-avatar";

export const InCallChatMessage = (props: any) => {
  return props.message.sent_by_guest ===
    `${props.profile.first_name} ${props.profile.last_name}` ? (
    <div className="user-chat-main">
      {/* <div className="users-img name-user">jd</div> */}
      <Avatar
        className="users-img name-user"
        size={"26"}
        name={`${props.profile.first_name} ${props.profile.last_name}`}
      />
      <div className="user-chatting">
        <h5>{`${props.profile.first_name} ${props.profile.last_name}`}</h5>
        <p>{props.message.message}</p>
      </div>
    </div>
  ) : (
    <div className="user-chat-main">
      {/* <div className="users-img name-user">jd</div> */}
      <Avatar
        className="users-img name-user"
        size={"26"}
        name={`${props.message.sent_by.admin_profile.first_name}
      ${props.message.sent_by.admin_profile.last_name}`}
      />
      <div className="user-chatting">
        <h5>
          {props.message.sent_by.admin_profile.first_name}{" "}
          {props.message.sent_by.admin_profile.last_name}
        </h5>
        <p>{props.message.message}</p>
      </div>
    </div>
  );
};
