import React, { useEffect } from "react";
import Modal from "react-modal";
import { useForm, Controller } from "react-hook-form";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";

import { BounceLoader } from "react-spinners";
import { createDependant, resetCreateDependant } from "../actions/authActions";
const InputMask = require("react-input-mask");
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    maxHeight: "80vh",
    maxWidth: "50vw",
  },
};

export const DependantModal = (props: any) => {
  const { control, register, handleSubmit, errors, reset } = useForm();
  const dispatch = useDispatch();
  const hasCreatedDependant = useSelector(
    (state: RootStateOrAny) => state.authenticateUser.hasCreatedDependant
  );
  const isCreatingDependant = useSelector(
    (state: RootStateOrAny) => state.authenticateUser.isCreatingDependant
  );
  const profile = useSelector(
    (state: RootStateOrAny) => state.authenticateUser.profile
  );

  useEffect(() => {
    if (hasCreatedDependant) {
      reset();
      props.setIsOpen(false);
      return () => {
        dispatch(resetCreateDependant());
      };
    }
  }, [dispatch, hasCreatedDependant, props, reset]);

  const formSubmit = (data: any) => {
    console.log("yay!");
    dispatch(createDependant(data, profile[0].user.pk));
  };

  return (
    <Modal
      isOpen={true}
      style={customStyles}
      onRequestClose={() => props.setIsOpen(false)}
    >
      <div className="register-form">
        <h3>Register a Dependant</h3>
        <form onSubmit={handleSubmit(formSubmit)}>
          <div className="fild-row">
            <div className="drop-down">
              <div className="selected"></div>
            </div>
          </div>
          <div className="fild-row label">
            <label>Preferred Name</label>
            <input
              type="text"
              className="form-control"
              name="preferred_name"
              ref={register}
            />
          </div>
          <div className="fild-row">
            <div className="half">
              <input
                type="text"
                className="form-control"
                name="first_name"
                ref={register({ required: true })}
                placeholder="First Name"
              />
            </div>
            <div className="half">
              <input
                type="text"
                className="form-control"
                name="last_name"
                ref={register({ required: true })}
                placeholder="Last Name"
              />
            </div>
          </div>
          <div className="fild-row label">
            <label>Date of Birth</label>

            <Controller
              as={InputMask}
              name="date_of_birth"
              placeholder="yyyy-mm-dd"
              className="form-control"
              mask="9999-99-99"
              ref={register}
              control={control}
            />
          </div>

          <div className="fild-row label">
            <label>Phone Number</label>
            <input
              type="text"
              className="form-control"
              name="phone"
              placeholder="(519) 555 - 5555"
              ref={register({ required: true })}
            />
            <p style={{ color: "red" }}>
              {errors.phone && "Phone is required"}
            </p>
          </div>
          <div className="fild-row label">
            <label>Address</label>
            <input
              type="text"
              className="form-control"
              name="address"
              placeholder="Your address"
              ref={register({ required: true })}
            />
            <p style={{ color: "red" }}>
              {errors.address && "Address is required"}
            </p>
          </div>
          <div className="fild-row label">
            <label>City</label>
            <input
              type="text"
              className="form-control"
              name="city"
              placeholder="City"
              ref={register({ required: true })}
            />
            <p style={{ color: "red" }}>{errors.city && "City is required"}</p>
          </div>

          <div className="fild-row label">
            <label>Postal Code</label>
            <input
              type="text"
              className="form-control"
              name="postal_code"
              placeholder="Postal Code"
              ref={register({ required: true })}
            />
            <p style={{ color: "red" }}>
              {errors.postal_code && "Postal Code is required"}
            </p>
          </div>
          <div className="fild-row">
            <div className="half">
              <label>Health Card Number</label>
              <input
                type="text"
                className="form-control"
                name="ohip_num"
                ref={register}
                placeholder="10 numbers"
                maxLength={10}
              />
            </div>
            <div className="half">
              <label>Health Card Version</label>
              <input
                type="text"
                className="form-control"
                name="ohip_vc"
                ref={register}
                placeholder="2 Letters"
                maxLength={2}
              />
            </div>
          </div>
          <div className="fild-row">
            <label>Your Primary Care (Doctor)</label>
            <input
              type="text"
              className="form-control"
              name="doctor"
              ref={register}
              placeholder="Your Doctor"
            />
          </div>
          <div className="fild-row">
            <label>Gender</label>
            <select
              name="gender"
              className="form-control"
              ref={register({ required: true })}
            >
              <option value="">- Select -</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="prefer not to say">Prefer Not to Say</option>
            </select>
          </div>
          {hasCreatedDependant && (
            <p style={{ color: "red" }} id="successmessage">
              We have successfully added a dependant to your account. Use this
              form again to register another dependant.
            </p>
          )}
          <div className="fild-row">
            {!isCreatingDependant ? (
              <button
                type="submit"
                className="primary-btn"
                id="submitbutton"
                style={{ marginBottom: "15px" }}
              >
                Register Dependent
              </button>
            ) : (
              <BounceLoader />
            )}
            <button
              className="primary-btn"
              id="close"
              onClick={(e) => {
                e.preventDefault();
                props.setIsOpen(false);
              }}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
