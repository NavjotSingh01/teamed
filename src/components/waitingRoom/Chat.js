import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setMessages,
  getOldMessages,
  incrementUnreadMessages,
  getWaitingRoomThread,
} from "../../actions/chatActions";
import Avatar from "react-avatar";
import moment from "moment";
import ScrollToBottom from "react-scroll-to-bottom";

function Chat(props) {
  const dispatch = useDispatch();
  const office = useSelector((state) => state.patientOfficeInteractions.office);
  const messages = useSelector((state) => state.connectToChat.messages);

  function listenMessage(e) {
    const response_data = JSON.parse(e.data);
    if (response_data.type == "patient_ping_chat") {
      dispatch(getWaitingRoomThread(props.profile.pk, office.pk));
    }
  }

  useEffect(() => {
    dispatch(getWaitingRoomThread(props.profile.pk, office.pk));
    socket.addEventListener("message", listenMessage);
    return () => {
      socket.removeEventListener("message", listenMessage);
    };
  }, []);

  const textMessage = useRef(null);
  const waitingRoomThread = useSelector(
    (state) => state.connectToChat.waitingRoomThread
  );
  const socket = useSelector((state) => state.connectToChat.socket);
  return waitingRoomThread ? (
    <div
      class="waiting-content"
      style={{ width: props.waiting ? "100%" : "100%", height: "100%" }}
    >
      <div className="chat-title">
        <h3>OFFICE CHAT</h3>
      </div>
      <div>
        <ScrollToBottom
          className="chat-content chat"
          scrollViewClassName="chat-content-container"
        >
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
        {/* <div
          className="chatEnd"
          ref={endChat}
          style={{ float: "left", clear: "both", paddingTop: "20px" }}
        ></div> */}
      </div>
      <div class="type-msg">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            socket.send(
              JSON.stringify({
                type: "PATIENT_ADD_MESSAGE_TO_WAITING_ROOM_THREAD",
                message: textMessage.current.value,
                userId: props.profile.user.pk,
                threadId: waitingRoomThread.pk,
                office: office.slug,
              })
            );
            textMessage.current.value = "";
          }}
        >
          <input
            type="text"
            placeholder="Type your message here…"
            class="common-input"
            ref={textMessage}
          />
        </form>
      </div>
    </div>
  ) : (
    ""
  );
}

export default Chat;
