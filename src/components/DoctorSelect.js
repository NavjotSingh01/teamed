import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDoctors, submitDoctor } from "../actions/patientActions";

function DoctorSelect(props) {
  // initial methods needed.
  const dispatch = useDispatch();

  // component did mount
  useEffect(() => {
    dispatch(getDoctors());
  }, []);

  // On click handler
  const onClickHandler = () => {
    if (!selectDoctor.current.value) {
      return;
    } else {
      dispatch(submitDoctor(props.profile.pk, selectDoctor.current.value));
    }
  };

  // State
  const receivedOffices = useSelector(
    state => state.patientInteractions.receivedOffices
  );
  const offices = useSelector(state => state.patientInteractions.offices);

  // refs
  const selectDoctor = useRef(null);

  return (
    <div>
      <h1>
        You aren't part of any Doctor Offices. Please select one from the
        dropdown below.
      </h1>
      {receivedOffices ? (
        <div>
          <select name="" id="" ref={selectDoctor}>
            <option value="">Please select a doctor office.</option>
            {offices.map(office => (
              <option key={office.pk} value={office.pk}>
                {office.name}
              </option>
            ))}
          </select>
          <button onClick={() => onClickHandler()}>Choose Office</button>
        </div>
      ) : (
        <p>Loading offices....</p>
      )}
    </div>
  );
}

export default DoctorSelect;
