import React, { useRef } from "react";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";

export const FormInput = (props: any) => {
  const socket = useSelector(
    (state: RootStateOrAny) => state.connectToChat.socket
  );

  const primaryProfile = useSelector(
    (state: RootStateOrAny) => state.authenticateUser.primaryProfile
  );

  const officeThread = useSelector(
    (state: RootStateOrAny) => state.inboxReducer.officeThread
  );

  const mobileRef = useRef<any>(null);
  return (
    <div className="type-msg with-close d-none show-mobile mobile-input">
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
        {!officeThread.archive ? (
          <>
            <input
              type="text"
              placeholder="Type your message…"
              className="common-input"
              ref={mobileRef}
            />
            <button className="primary-btn" type="submit">
              Send
            </button>
          </>
        ) : (
          <p className="disclaimer-area">
            Message has been archived. You can view your messages but to
            continue messaging, please create a new Message.
          </p>
        )}
      </form>
    </div>
  );
};
