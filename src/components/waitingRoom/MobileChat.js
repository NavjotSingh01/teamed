import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setMessages,
  getOldMessages,
  resetUnreadMessages,
  getWaitingRoomThread,
} from "../../actions/chatActions";
import Avatar from "react-avatar";
import moment from "moment";
import ScrollToBottom from "react-scroll-to-bottom";

function MobileChat(props) {
  const endChat = useRef(null);
  const office = useSelector((state) => state.patientOfficeInteractions.office);
  const dispatch = useDispatch();
  const [messageText, setMessageText] = useState("");
  const socket = useSelector((state) => state.connectToChat.socket);

  function listenMessage(e) {
    const response_data = JSON.parse(e.data);
    if (response_data.type == "patient_ping_chat") {
      dispatch(getWaitingRoomThread(props.profile.pk, office.pk));
    }
  }

  useEffect(() => {
    dispatch(resetUnreadMessages());
    dispatch(getWaitingRoomThread(props.profile.pk, office.pk));
    socket.addEventListener("message", listenMessage);
    return () => {
      socket.removeEventListener("message", listenMessage);
    };
  });

  const waitingRoomThread = useSelector(
    (state) => state.connectToChat.waitingRoomThread
  );
  return waitingRoomThread ? (
    <div>
      <div class="">
        <ScrollToBottom className="chat-text-main">
          {waitingRoomThread.waiting_room_thread_messages
            ? waitingRoomThread.waiting_room_thread_messages.map((message) =>
                message.sent_by.pk === props.profile.user.pk ? (
                  <div class="chat-text right ">
                    <div class="chat-info">
                      <h3>
                        {message.sent_by.patient_profile.first_name}{" "}
                        {message.sent_by.patient_profile.last_name}
                      </h3>
                      <span class="chat-user">
                        <Avatar
                          name={`${message.sent_by.patient_profile.first_name} ${message.sent_by.patient_profile.last_name}`}
                          size={24}
                          round={true}
                        />
                        {/* <img src="images/user.png" alt="" /> */}
                      </span>
                    </div>
                    <div class="chat-box">
                      <p>{message.message}</p>
                      <span class="chat-time">
                        {moment(message.datetime).format("YYYY-MM-DD HH:mm")}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div class="chat-text left">
                    <div class="chat-info">
                      <h3>
                        {message.sent_by.admin_profile.first_name}{" "}
                        {message.sent_by.admin_profile.last_name}
                      </h3>
                      <span class="chat-user">
                        <Avatar
                          name={`${message.sent_by.admin_profile.first_name} ${message.sent_by.admin_profile.last_name}`}
                          size={24}
                          round={true}
                        />
                      </span>
                    </div>
                    <div class="chat-box">
                      <p>{message.message}</p>
                      <span class="chat-time">
                        {moment(message.datetime).format("YYYY-MM-DD HH:mm")}
                      </span>
                    </div>
                  </div>
                )
              )
            : ""}
        </ScrollToBottom>
        <div
          className="chatEnd"
          ref={endChat}
          style={{ float: "left", clear: "both", paddingTop: "110px" }}
        ></div>
      </div>
      <div class="type-msg with-close">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            socket.send(
              JSON.stringify({
                type: "PATIENT_ADD_MESSAGE_TO_WAITING_ROOM_THREAD",
                message: messageText,
                userId: props.profile.user.pk,
                threadId: waitingRoomThread.pk,
                office: office.slug,
              })
            );
            setMessageText("");
          }}
        >
          <input
            type="text"
            placeholder="Type your message"
            class="common-input"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
          />
        </form>

        {messageText === "" ? (
          <a
            href="#"
            title="Close"
            class="close-chat"
            onClick={(e) => {
              e.preventDefault();
              props.setMobileTab(null);
            }}
          ></a>
        ) : (
          <a
            href="#"
            title="Close"
            class="send-chat"
            onClick={(e) => {
              e.preventDefault();
              // handleNewMessage(messageText, props.channel);
              socket.send(
                JSON.stringify({
                  type: "PATIENT_ADD_MESSAGE_TO_WAITING_ROOM_THREAD",
                  message: messageText,
                  userId: props.profile.user.pk,
                  threadId: waitingRoomThread.pk,
                  office: office.slug,
                })
              );
              setMessageText("");
            }}
          ></a>
        )}
      </div>
    </div>
  ) : (
    ""
  );
}

export default MobileChat;
