import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { BounceLoader } from "react-spinners";
import {
  deleteAppointment,
  resetAppointmentPk,
} from "../../actions/patientOfficeActions";
import { useHistory } from "react-router-dom";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "30%",
  },
};

export const CancelAppointment: React.FC<any> = (props: any) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isDeletingAppointment = useSelector(
    (state: RootStateOrAny) =>
      state.patientOfficeInteractions.isDeletingAppointment
  );
  const hasDeletedAppointment = useSelector(
    (state: RootStateOrAny) =>
      state.patientOfficeInteractions.hasDeletedAppointment
  );

  const appointmentPk = useSelector(
    (state: RootStateOrAny) => state.patientOfficeInteractions.appointmentPk
  );

  useEffect(() => {
    if (hasDeletedAppointment) {
      props.setIsOpen(false);
      history.push("/office/appointments-list");
      return () => {
        dispatch(resetAppointmentPk());
      };
    }
  }, [hasDeletedAppointment]);

  return (
    <Modal
      isOpen={true}
      style={customStyles}
      onRequestClose={() => props.setIsOpen(false)}
    >
      <h3 className="appointment-modal-confirmation">Are you sure?</h3>
      <p>You and the office will be notified of your cancellation.</p>
      <div className="button-container">
        <button
          className="decline-button"
          onClick={() => {
            props.setIsOpen(false);
          }}
        >
          Go Back
        </button>
        {!isDeletingAppointment ? (
          <button
            className="accept-button"
            onClick={() => {
              dispatch(deleteAppointment(appointmentPk));
            }}
          >
            Cancel Appointment
          </button>
        ) : (
          <BounceLoader />
        )}
      </div>
    </Modal>
  );
};
