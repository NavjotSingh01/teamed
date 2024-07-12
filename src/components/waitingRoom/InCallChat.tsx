import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import { InCallChatMessage } from "./InCallChatMessage";
// @ts-ignore
import ScrollToBottom from "react-scroll-to-bottom";
import { getWaitingRoomThread } from "../../actions/chatActions";

export const InCallChat = (props: any) => {
  const dispatch = useDispatch();

  const office = useSelector(
    (state: RootStateOrAny) => state.patientOfficeInteractions.office
  );
  const messages = useSelector(
    (state: RootStateOrAny) => state.connectToChat.messages
  );
  const profile = useSelector(
    (state: RootStateOrAny) => state.authenticateUser.primaryProfile
  );

  const socket = useSelector(
    (state: RootStateOrAny) => state.connectToChat.socket
  );

  function listenMessage(e: any) {
    const response_data = JSON.parse(e.data);
    if (response_data.type == "patient_ping_chat") {
      dispatch(getWaitingRoomThread(profile.pk, office.pk));
    }
  }

  useEffect(() => {
    dispatch(getWaitingRoomThread(profile.pk, office.pk));
  }, [dispatch, office.pk, profile.pk]);

  useEffect(() => {
    socket.addEventListener("message", listenMessage);
    return () => {
      socket.removeEventListener("message", listenMessage);
    };
  }, [dispatch, listenMessage, office.pk, profile.pk, socket]);

  const textMessage = useRef<any>(null);

  const officePk = useSelector(
    (state: RootStateOrAny) => state.mainReducer.officePk
  );
  const thread = useSelector(
    (state: RootStateOrAny) => state.mainReducer.thread
  );
  const officeSlug = useSelector(
    (state: RootStateOrAny) => state.mainReducer.officeSlug
  );

  const waitingRoomThread = useSelector(
    (state: RootStateOrAny) => state.connectToChat.waitingRoomThread
  );

  return (
    <div role="tabpanel" className="tab-pane fade active show" id="chat">
      <ScrollToBottom className="scrolling">
        {waitingRoomThread
          ? waitingRoomThread.waiting_room_thread_messages.map(
              (message: any) => (
                <InCallChatMessage
                  key={message.pk}
                  message={message}
                  profile={profile}
                />
              )
            )
          : ""}
      </ScrollToBottom>
      <div className="type-msg">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            socket.send(
              JSON.stringify({
                type: "PATIENT_ADD_MESSAGE_TO_WAITING_ROOM_THREAD",
                message: textMessage.current.value,
                userId: `${profile.first_name} ${profile.last_name}`,
                threadId: waitingRoomThread.pk,
                office: office.slug,
              })
            );
            textMessage.current.value = "";
          }}
        >
          <input
            type="text"
            placeholder="Type your message..."
            className="common-input chat-input"
            ref={textMessage}
          />
          <input type="submit" className="primary-btn" value="Send" />
        </form>
      </div>
    </div>
  );
};
