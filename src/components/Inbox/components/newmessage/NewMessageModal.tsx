import React, { useEffect } from "react";
import Modal from "react-modal";
import CloseIcon from "../../../../assets/images/close-icon.png";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import {
  createMessageThread,
  getPatientOffices,
  openNewMessagePopup,
  resetCreateMessageThread,
} from "../../../../actions/inboxActions";
import { BounceLoader } from "react-spinners";
import { useForm, Controller } from "react-hook-form";
import { Link } from "react-router-dom";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "440px",
  },
};

export const NewMessageModal: React.FC = (props: any) => {
  const dispatch = useDispatch();

  const { control, register, handleSubmit, errors, reset } = useForm();

  const primaryProfile = useSelector(
    (state: RootStateOrAny) => state.authenticateUser.primaryProfile
  );

  const isFetchingGetPatientOffices = useSelector(
    (state: RootStateOrAny) => state.inboxReducer.isFetchingGetPatientOffices
  );
  const patientOffices = useSelector(
    (state: RootStateOrAny) => state.inboxReducer.patientOffices
  );
  const hasCreatedMessageThread = useSelector(
    (state: RootStateOrAny) => state.inboxReducer.hasCreatedMessageThread
  );
  const isCreatingMessageThread = useSelector(
    (state: RootStateOrAny) => state.inboxReducer.isCreatingMessageThread
  );

  useEffect(() => {
    dispatch(getPatientOffices(primaryProfile.pk));
  }, []);

  useEffect(() => {
    if (hasCreatedMessageThread) {
      dispatch(openNewMessagePopup(false));
      return () => {
        dispatch(resetCreateMessageThread());
      };
    }
  }, [hasCreatedMessageThread]);

  const formSubmit = (data: any) => {
    console.log(data);
    dispatch(createMessageThread(data, primaryProfile.pk));
  };

  return (
    <Modal
      isOpen={true}
      style={customStyles}
      onRequestClose={() => dispatch(openNewMessagePopup(false))}
    >
      <div className="modal-content new-message-modal">
        <div className="modal-header">
          <h1 className="modal-title">New Message</h1>
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
            onClick={(e) => {
              e.preventDefault();
              dispatch(openNewMessagePopup(false));
            }}
          >
            <img src={CloseIcon} alt="close" />
          </button>
        </div>
        <div className="modal-body">
          <form onSubmit={handleSubmit(formSubmit)}>
            <div className="fild-row">
              {isFetchingGetPatientOffices ? (
                <BounceLoader />
              ) : !isFetchingGetPatientOffices &&
                patientOffices.length === 0 ? (
                <>
                  <Link to="/dashboard/my-offices">
                    <p style={{ textDecoration: "underline" }}>
                      You are not part of any offices. Please click here to join
                      an office.
                    </p>
                  </Link>
                  <input
                    type="hidden"
                    name="office"
                    ref={register({ required: true })}
                  />
                </>
              ) : (
                <select
                  name="office"
                  style={{ width: "100%", fontSize: "20px" }}
                  className="form-control"
                  ref={register({ required: true })}
                >
                  <option value="">Select Office</option>
                  {patientOffices.map((office: any) => (
                    <option value={office.pk}>{office.name}</option>
                  ))}
                </select>
              )}
              {errors.office && (
                <p>You must select an office to send a message to.</p>
              )}
            </div>
            <div className="form-label-group">
              <input
                type="text"
                className="form-control"
                placeholder="Subject*"
                required
                name="subject"
                ref={register({ required: true })}
              />
              <label htmlFor="m-code">Subject*</label>
            </div>
            <div className="form-group">
              <textarea
                placeholder="Message. 300 Character Limit."
                name="message"
                maxLength={300}
                ref={register({ required: true })}
              ></textarea>
            </div>
            <div className="modal-footer">
              {!isCreatingMessageThread ? (
                <button type="submit" className="btn primary-btn">
                  Submit Message
                </button>
              ) : (
                <BounceLoader />
              )}
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};
