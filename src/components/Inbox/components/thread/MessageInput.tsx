import React, { useRef } from "react";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
export const MessageInput = (props: any) => {
  const socket = useSelector(
    (state: RootStateOrAny) => state.connectToChat.socket
  );

  const primaryProfile = useSelector(
    (state: RootStateOrAny) => state.authenticateUser.primaryProfile
  );

  const officeThread = useSelector(
    (state: RootStateOrAny) => state.inboxReducer.officeThread
  );

  const inputRef = useRef<any>(null);
  const mobileRef = useRef<any>(null);

  return (
    <>
      <div className="type-msg with-close d-none d-lg-block">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (inputRef.current.value) {
              socket.send(
                JSON.stringify({
                  type: "SEND_MESSAGE_TO_THREAD",
                  threadPk: officeThread.pk,
                  message: inputRef.current.value,
                  patientPk: primaryProfile.pk,
                })
              );

              inputRef.current.value = "";
            } else {
              return;
            }
          }}
        >
          <input
            type="text"
            placeholder="Type your message… (300 character limit)"
            className="common-input"
            maxLength={300}
            ref={inputRef}
          />
          <button type="submit" className="primary-btn">
            Send
          </button>
        </form>
      </div>
      <div className="type-msg with-close d-block d-lg-none hide-mobile">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (mobileRef.current.value) {
              socket.send(
                JSON.stringify({
                  type: "SEND_MESSAGE_TO_THREAD",
                  threadPk: officeThread.pk,
                  message: mobileRef.current.value,
                  patientPk: primaryProfile.pk,
                })
              );

              mobileRef.current.value = "";
            } else {
              return;
            }
          }}
        >
          <input
            type="text"
            placeholder="Type your message here… (300 character limit)"
            className="common-input"
            maxLength={300}
            ref={mobileRef}
          />
        </form>
      </div>
    </>
  );
};
