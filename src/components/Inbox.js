import React, { useEffect, useState, useRef } from "react";
import Flower from "../assets/images/flower.png";
import { Link } from "react-router-dom";
import AuthHeader from "./AuthHeader";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import {
  getMessageThreads,
  createMessageThread,
  getMessageThread,
  addMessageToThread,
  updateReadStatus,
} from "../actions/messagingActions";
import moment from "moment";
import ScrollToBottom from "react-scroll-to-bottom";
import ChatToggle from "../assets/images/chat-toggle.png";
import Avatar from "react-avatar";
import { BounceLoader } from "react-spinners";

function Inbox(props) {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.authenticateUser.primaryProfile);
  const office = useSelector((state) => state.patientOfficeInteractions.office);

  useEffect(() => {
    dispatch(getMessageThreads(profile.pk, props.office.slug));
  }, [dispatch, profile.pk, props.office.slug]);

  // Refs for text input
  const subject = useRef();
  const body = useRef();
  const text = useRef();
  const mobileText = useRef();
  const tabletText = useRef();
  // Selectors for inbox
  const messageThreads = useSelector(
    (state) => state.messagingReducer.messageThreads
  );
  const isCreatingMessageThread = useSelector(
    (state) => state.messagingReducer.isCreatingMessageThread
  );
  const isAddingMessageToThread = useSelector(
    (state) => state.messagingReducer.isAddingMessageToThread
  );
  const hasCreatedMessage = useSelector(
    (state) => state.messagingReducer.hasCreatedMessage
  );

  const selectedThread = useSelector(
    (state) => state.messagingReducer.selectedThread
  );

  const socket = useSelector((state) => state.connectToChat.socket);

  const [modalIsOpen, setIsOpen] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  socket.onmessage = (e) => {
    const response_data = JSON.parse(e.data);
    if (response_data.type == "created_successfully") {
      dispatch(getMessageThreads(profile.pk, props.office.slug));
    } else if (response_data.type == "ping_selected_thread") {
      if (selectedThread) {
        dispatch(getMessageThreads(profile.pk, props.office.slug));
        dispatch(getMessageThread(selectedThread.pk));
      } else {
        return;
      }
    } else {
      return;
    }
  };

  useEffect(() => {
    if (selectedThread) {
      dispatch(
        updateReadStatus(selectedThread.pk, true, profile.pk, office.slug)
      );
    }
  }, [dispatch, office.slug, profile.pk, selectedThread]);

  return (
    <div>
      <AuthHeader />
      <Modal
        isOpen={modalIsOpen}
        // style={customStyles}
        style={{
          content: {
            background: "none",
            border: "none",
          },
        }}
        onRequestClose={() => setIsOpen(false)}
      >
        <div
          class="modal new-message-modal"
          id="new-message-modal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          style={{ display: "block" }}
        >
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title">New Message</h1>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setIsOpen(false)}
                ></button>
              </div>
              <div class="modal-body">
                <p style={{ color: "red" }}>{errorMessage}</p>
                <form>
                  <div class="form-group subject">
                    <label>Subject</label>
                    <input
                      type="text"
                      placeholder="e.g Medication Renewal"
                      ref={subject}
                    />
                  </div>
                  <div class="form-group">
                    <textarea
                      ref={body}
                      placeholder="Hello, it appears I’m due for a renewal of my medication called...."
                    ></textarea>
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                {!isCreatingMessageThread && !isAddingMessageToThread ? (
                  <input
                    type="submit"
                    class="btn primary-btn"
                    value="Send Message"
                    onClick={(e) => {
                      e.preventDefault();
                      if (!subject.current.value || !body.current.value) {
                        setErrorMessage(
                          "Subject and message are both required fields."
                        );
                      } else if (subject.current.value.length > 100) {
                        setErrorMessage("Subject line is too long.");
                      } else {
                        socket.send(
                          JSON.stringify({
                            type: "PATIENT_CREATE_THREAD",
                            subject: subject.current.value,
                            body: body.current.value,
                            profile: profile.pk,
                            office: office.pk,
                            user: profile.user.pk,
                            office_slug: office.slug,
                          })
                        );
                        setIsOpen(false);
                      }
                    }}
                  />
                ) : !isCreatingMessageThread &&
                  !isAddingMessageToThread &&
                  hasCreatedMessage ? (
                  <p>Created Message Successfully</p>
                ) : (
                  <BounceLoader color={"#052D64"} size={50} />
                )}
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <section class="main-bg-sectoin desktop-page less-space">
        <div class="container inbox-page-main">
          <div class="row">
            <div class="col-lg-12 col-xl-4 col-md-12">
              <div class="cancel-wrapper inbox-wrapper">
                <Link
                  to={`/office/${props.office.slug}/`}
                  className="d-none d-lg-block"
                >
                  <i
                    class="fas fa-chevron-circle-left arrow_icon"
                    aria-hidden="true"
                  ></i>{" "}
                  back
                </Link>
                <a href="office-home.html" title="back"></a>

                <Link
                  to={`/office/${props.office.slug}/`}
                  className="d-block d-lg-none"
                >
                  <i
                    class="fas fa-chevron-circle-left arrow_icon"
                    aria-hidden="true"
                  ></i>{" "}
                  Home
                </Link>
              </div>
              <div class="cancel-wrapper show-mobile">
                <a
                  href="#"
                  title="inbox"
                  onClick={(e) => {
                    document.body.classList.remove("chat-show");
                  }}
                >
                  <i
                    class="fas fa-chevron-circle-left arrow_icon"
                    aria-hidden="true"
                  ></i>{" "}
                  inbox
                </a>
              </div>
              <div class="cancel-wrapper message-window">
                <a href="#" title="inbox">
                  <i
                    class="fas fa-chevron-circle-left arrow_icon"
                    aria-hidden="true"
                  ></i>{" "}
                  inbox
                </a>
              </div>
              <h1>Inbox</h1>
            </div>
            <div class="col-lg-12 col-xl-8 col-md-12 inbox-right">
              <div class="row">
                <div class="col-lg-6 col-md-6 new-msg">
                  <div class="new-msg-btn">
                    <a
                      href="#"
                      class="primary-btn"
                      title="New Message"
                      data-toggle="modal"
                      data-target="#new-message-modal"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsOpen(true);
                      }}
                    >
                      New Message
                    </a>
                  </div>
                  <div class="inbox-msgs">
                    <div class="new-msg-info-main d-flex flex-wrap">
                      <div class="custom-scrl-content mCustomScrollbar">
                        {messageThreads.length !== 0
                          ? messageThreads.map((thread) => (
                              <div
                                class={`new-msg-info ${
                                  !thread.patient_read ? "new-msg-dots" : ""
                                } ${
                                  selectedThread
                                    ? selectedThread.pk === thread.pk
                                      ? "active"
                                      : ""
                                    : ""
                                }`}
                                onClick={() => {
                                  dispatch(getMessageThread(thread.pk));
                                  document.body.classList.add("chat-show");
                                }}
                              >
                                <div class="new-msg-info-inner">
                                  <h3>
                                    {thread.subject}{" "}
                                    <span>
                                      {moment(thread.datetime).fromNow()}
                                    </span>
                                  </h3>
                                  <p>
                                    {thread.message_set[0]
                                      ? thread.message_set[0].message
                                      : ""}
                                  </p>
                                </div>
                              </div>
                            ))
                          : ""}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-6 col-md-6 chat-window">
                  {selectedThread ? (
                    <ScrollToBottom className="chat-content">
                      <h2>{selectedThread.subject}</h2>
                      {/* <div class="chat-toggles">
                        <a
                          href="#"
                          title="chat"
                          data-toggle="collapse"
                          data-target="#chat-options"
                          aria-expanded="true"
                        >
                          <img src={ChatToggle} alt="" />
                        </a>
                        <ul class="collapse chat-options" id="chat-options">
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
                      </div> */}
                      {selectedThread.message_set.map((message) => (
                        <div
                          className={`chat-text ${
                            message.patient_profile === profile.user.pk
                              ? "right"
                              : "left"
                          }`}
                          style={{ marginBottom: "0" }}
                        >
                          <div class="chat-info">
                            {message.admin_profile ? (
                              <h3>
                                {message.admin_profile.first_name}{" "}
                                {message.admin_profile.last_name}
                              </h3> ? (
                                message.patient_profile
                              ) : (
                                <h3>
                                  {message.patient_profile.first_name}{" "}
                                  {message.patient_profile.last_name}
                                </h3>
                              )
                            ) : (
                              ""
                            )}
                            <span class="chat-user">
                              {message.admin_profile ? (
                                <Avatar
                                  name={`${message.admin_profile.first_name}
                                ${message.admin_profile.last_name}`}
                                  round={true}
                                  size="100%"
                                />
                              ) : (
                                <Avatar
                                  name={`${message.patient_profile.first_name}
                                ${message.patient_profile.last_name}`}
                                  round={true}
                                  size="100%"
                                />
                              )}
                            </span>
                          </div>
                          <div class="chat-box">
                            <p>{message.message}</p>
                            {message.image && (
                              <p>
                                <a href={message.image} download>
                                  {message.image.split("/").slice(-1)[0]}
                                </a>
                              </p>
                            )}
                            <span class="chat-time">
                              {moment(message.datetime).fromNow()}
                            </span>
                          </div>
                        </div>
                      ))}
                    </ScrollToBottom>
                  ) : (
                    ""
                  )}
                  {selectedThread ? (
                    !selectedThread.archive ? (
                      <div class="type-msg with-close d-none d-lg-block">
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            // dispatch(
                            //   addMessageToThread(
                            //     text.current.value,
                            //     profile.user.pk,
                            //     selectedThread.pk,
                            //     profile.pk,
                            //     office.slug,
                            //     false
                            //   )
                            // );

                            socket.send(
                              JSON.stringify({
                                type: "PATIENT_ADD_MESSAGE_TO_THREAD",
                                message: text.current.value,
                                user: profile.user.pk,
                                thread: selectedThread.pk,
                                profile: profile.pk,
                                office: office.slug,
                              })
                            );
                            text.current.value = "";
                          }}
                        >
                          <input
                            type="text"
                            placeholder="Type your message…"
                            class="common-input"
                            ref={text}
                            onClick={() => {
                              dispatch(
                                updateReadStatus(
                                  selectedThread.pk,
                                  true,
                                  profile.pk,
                                  office.slug
                                )
                              );
                            }}
                          />
                        </form>
                        <a
                          title="Close"
                          class="close-chat submit-chat"
                          onClick={(e) => {
                            e.preventDefault();
                            socket.send(
                              JSON.stringify({
                                type: "PATIENT_ADD_MESSAGE_TO_THREAD",
                                message: text.current.value,
                                user: profile.user.pk,
                                thread: selectedThread.pk,
                                profile: profile.pk,
                                office: office.slug,
                              })
                            );
                            text.current.value = "";
                          }}
                        ></a>
                      </div>
                    ) : (
                      ""
                    )
                  ) : (
                    ""
                  )}
                  {selectedThread ? (
                    !selectedThread.archive ? (
                      <div class="type-msg with-close d-block d-lg-none hide-mobile">
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            // dispatch(
                            //   addMessageToThread(
                            //     text.current.value,
                            //     profile.user.pk,
                            //     selectedThread.pk,
                            //     profile.pk,
                            //     office.slug,
                            //     false
                            //   )
                            // );
                            socket.send(
                              JSON.stringify({
                                type: "PATIENT_ADD_MESSAGE_TO_THREAD",
                                message: tabletText.current.value,
                                user: profile.user.pk,
                                thread: selectedThread.pk,
                                profile: profile.pk,
                                office: office.slug,
                              })
                            );
                            tabletText.current.value = "";
                          }}
                        >
                          <input
                            type="text"
                            placeholder="Type your message here…"
                            class="common-input"
                            ref={tabletText}
                          />
                        </form>
                      </div>
                    ) : (
                      ""
                    )
                  ) : (
                    ""
                  )}
                </div>
                <div class="type-msg with-close d-none show-mobile">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      socket.send(
                        JSON.stringify({
                          type: "PATIENT_ADD_MESSAGE_TO_THREAD",
                          message: mobileText.current.value,
                          user: profile.user.pk,
                          thread: selectedThread.pk,
                          profile: profile.pk,
                          office: office.slug,
                        })
                      );
                      mobileText.current.value = "";
                    }}
                  >
                    <input
                      type="text"
                      placeholder="Type your message…"
                      class="common-input"
                      ref={mobileText}
                    />
                  </form>
                  <a
                    href="#"
                    title="Close"
                    class="close-chat submit-chat"
                    onClick={(e) => {
                      e.preventDefault();
                      socket.send(
                        JSON.stringify({
                          type: "PATIENT_ADD_MESSAGE_TO_THREAD",
                          message: mobileText.current.value,
                          user: profile.user.pk,
                          thread: selectedThread.pk,
                          profile: profile.pk,
                          office: office.slug,
                        })
                      );
                      text.current.value = "";
                      mobileText.current.value = "";
                    }}
                  ></a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="new-msg-mobile show-mobile">
          <h1 class="modal-title">New Message</h1>
          <form>
            <div class="form-group subject">
              <label>Subject</label>
              <input type="text" placeholder="Medication Renewal" />
            </div>
            <div class="form-group">
              <textarea placeholder="Hello, it appears I’m due for a renewal of my medication called...."></textarea>
            </div>
          </form>
          <input type="submit" class="btn primary-btn" value="Send Message" />
        </div>
        <div class="img-wrppaer">
          <img src={Flower} class="flower-img" alt="flower" />
        </div>
      </section>
    </div>
  );
}

export default Inbox;
