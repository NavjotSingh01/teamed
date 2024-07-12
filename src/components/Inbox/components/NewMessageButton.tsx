import React from "react";
import EditIcon from "../../../assets/images/edit-icon.svg";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import { openNewMessagePopup } from "../../../actions/inboxActions";

export const NewMessageButton: React.FC = (props: any) => {
  const dispatch = useDispatch();

  return (
    <div className="new-msg-btn">
      <a
        href="#"
        className="primary-btn"
        title="New Message"
        onClick={(e) => {
          e.preventDefault();
          dispatch(openNewMessagePopup(true));
        }}
      >
        <span>New Message</span> <img src={EditIcon} alt="edit" />
      </a>
    </div>
  );
};
