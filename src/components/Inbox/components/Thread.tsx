import React, { useEffect } from "react";
import { MessageInput } from "./thread/MessageInput";
import { ThreadMessage } from "./thread/ThreadMessage";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import {
  addMessageToThread,
  getOfficeMessageThread,
  selectOfficeThread,
} from "../../../actions/inboxActions";
import { BounceLoader } from "react-spinners";
// @ts-ignore
import ScrollToBottom from "react-scroll-to-bottom";
import { FormInput } from "./thread/FormInput";
import CloseButton from "../../../assets/images/close.svg";

export const Thread = (props: any) => {
  const dispatch = useDispatch();
  const socket = useSelector(
    (state: RootStateOrAny) => state.connectToChat.socket
  );

  const selectedThread = useSelector(
    (state: RootStateOrAny) => state.inboxReducer.selectedThread
  );

  const officeThread = useSelector(
    (state: RootStateOrAny) => state.inboxReducer.officeThread
  );

  useEffect(() => {
    dispatch(getOfficeMessageThread(props.selectedThread));
  }, [props.selectedThread]);

  function listenMessage(e: any) {
    const response_data = JSON.parse(e.data);
    if (response_data.type == "send_message_to_thread") {
      dispatch(
        addMessageToThread(JSON.parse(response_data.message), officeThread)
      );
    } else if (response_data.type == "ping_selected_thread") {
      dispatch(getOfficeMessageThread(props.selectedThread));
    }
  }

  useEffect(() => {
    if (officeThread) {
      socket.addEventListener("message", listenMessage);
      return () => {
        socket.removeEventListener("message", listenMessage);
      };
    }
  }, [officeThread]);

  useEffect(() => {
    if (socket && officeThread) {
      socket.send(
        JSON.stringify({
          type: "SET_MESSAGE_STATUS_TO_READ",
          threadPk: officeThread.pk,
        })
      );
    }
  }, [officeThread, socket]);

  const isRequestingGetOfficeMessageThread = useSelector(
    (state: RootStateOrAny) =>
      state.inboxReducer.isRequestingGetOfficeMessageThread
  );

  return !isRequestingGetOfficeMessageThread && officeThread ? (
    <>
      <div className="chat-content">
        <h2>{officeThread.subject}</h2>
        <img
          src={CloseButton}
          alt=""
          className="d-none show-mobile x-button-mobile"
          onClick={(e) => {
            e.preventDefault();
            dispatch(selectOfficeThread(null));
          }}
        />
        <div className="chat-toggles">
          <a
            href="#"
            title="chat"
            data-toggle="collapse"
            data-target="#chat-options"
            aria-expanded="true"
          >
            <img src="images/chat-toggle.png" alt="" />
          </a>
          <ul className="collapse chat-options" id="chat-options">
            <li>
              <a href="#" title="Delete">
                Delete
              </a>
            </li>
            <li>
              <a href="#" title="Mark Unread">
                Mark Unread
              </a>
            </li>
          </ul>
        </div>

        {officeThread.message_set.length === 0 ? (
          <p>Chat is empty. Please send a message to begin</p>
        ) : (
          <ScrollToBottom className="thread-scroll">
            <div className="disclaimer-area">
              <p>
                Your message has been sent successfully. The office you have
                contacted will get back to you at their earliest convenience.
                Corigan will email you when you have a reply.
              </p>
            </div>
            {officeThread.message_set.map((message: any) => (
              <ThreadMessage message={message} />
            ))}
          </ScrollToBottom>
        )}
      </div>
      {!officeThread.archive ? (
        <MessageInput />
      ) : (
        <p className="disclaimer-area">
          Message has been archived. You can view your messages but to continue
          messaging, please create a new Message.
        </p>
      )}
      {selectedThread && <FormInput selectedThread={selectedThread} />}
    </>
  ) : (
    <BounceLoader />
  );
};
