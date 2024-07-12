import React, { useEffect } from "react";
import AuthHeader from "../AuthHeader";
import { InboxThreadPreview } from "./components/InboxThreadPreview";
import { NewMessageModal } from "./components/newmessage/NewMessageModal";
import { NewMessageButton } from "./components/NewMessageButton";
import { Thread } from "./components/Thread";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import {
  getAllOfficeThreads,
  selectOfficeThread,
} from "../../actions/inboxActions";
import { BounceLoader } from "react-spinners";
import { FormInput } from "./components/thread/FormInput";
import { createInboxSocketConnection } from "../../actions/chatActions";
import { useHistory } from "react-router-dom";
import MessageIcon from "../../assets/images/msg-new.png";
import BackArrow from "../../assets/images/back-arrow.png";

export const Inbox: React.FC = (props: any) => {
  const newMessagePopup = useSelector(
    (state: RootStateOrAny) => state.inboxReducer.newMessagePopup
  );

  const history = useHistory();
  const isRequestingGetAllOfficeThreads = useSelector(
    (state: RootStateOrAny) =>
      state.inboxReducer.isRequestingGetAllOfficeThreads
  );
  const officeThreads = useSelector(
    (state: RootStateOrAny) => state.inboxReducer.officeThreads
  );

  const dispatch = useDispatch();
  const office = useSelector(
    (state: RootStateOrAny) => state.patientOfficeInteractions.office
  );
  const primaryProfile = useSelector(
    (state: RootStateOrAny) => state.authenticateUser.primaryProfile
  );

  const hasCreatedMessageThread = useSelector(
    (state: RootStateOrAny) => state.inboxReducer.hasCreatedMessageThread
  );

  const selectedThread = useSelector(
    (state: RootStateOrAny) => state.inboxReducer.selectedThread
  );

  const socket = useSelector(
    (state: RootStateOrAny) => state.connectToChat.socket
  );

  useEffect(() => {
    dispatch(getAllOfficeThreads(primaryProfile.pk));
  }, []);

  useEffect(() => {
    if (hasCreatedMessageThread) {
      dispatch(getAllOfficeThreads(primaryProfile.pk));
    }
  }, [hasCreatedMessageThread]);

  useEffect(() => {
    if (!socket) {
      dispatch(createInboxSocketConnection(primaryProfile.pk));
    }
  }, []);

  return (
    <>
      <AuthHeader />
      {newMessagePopup && <NewMessageModal />}
      <section className="main-bg-sectoin desktop-page less-space">
        <div className="container inbox-page-main">
          <div className="row">
            <div className="col-lg-12 col-xl-4 col-md-12">
              <div className="cancel-wrapper show-mobile">
                <a href="#" title="inbox">
                  <img src={BackArrow} alt="back" className="d-mobile" />
                  <span>Messages</span>
                </a>
              </div>
              <div className="cancel-wrapper">
                <a
                  href="office-home.html"
                  title="home"
                  onClick={(e) => {
                    e.preventDefault();
                    history.goBack();
                  }}
                >
                  <i
                    className="fas fa-chevron-circle-left arrow_icon d-show"
                    aria-hidden="true"
                  ></i>
                  <img src={BackArrow} alt="back" className="d-mobile" />
                  Home
                </a>
              </div>
              <h1 className="d-flex">
                <span className="office-icons green-sqr icon-small">
                  <img src={MessageIcon} alt="" />
                </span>
                Messages
              </h1>
            </div>
            <div className="col-lg-12 col-xl-8 col-md-12 main">
              <div className="chat-main">
                <div className="row">
                  <div className="col-lg-6 col-md-6 new-msg">
                    <NewMessageButton />
                    <div
                      className="inbox-msgs"
                      style={{ padding: "0px 18px 0 15px" }}
                    >
                      <div className="new-msg-info-main d-flex flex-wrap">
                        <div className="custom-scrl-content mCustomScrollbar">
                          {isRequestingGetAllOfficeThreads ? (
                            <BounceLoader />
                          ) : !isRequestingGetAllOfficeThreads &&
                            officeThreads.length == 0 ? (
                            <p>No threads are active.</p>
                          ) : (
                            officeThreads.map((officeThread: any) => (
                              <InboxThreadPreview officeThread={officeThread} />
                            ))
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 chat-window">
                    {!selectedThread ? (
                      <p className="hide-mobile">
                        Please select or create a new Thread
                      </p>
                    ) : (
                      <Thread selectedThread={selectedThread} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
