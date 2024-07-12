import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer/Footer";
import routes from "../../routes/routes";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import s from "../../assets/styles/PagesStyles.module.scss";
import {
  setFeelingNumber,
  displayAssessment,
} from "../../actions/covidActions";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    maxHeight: "100vh",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const NumberSelect: React.FC = () => {
  const dispatch = useDispatch();
  const feelingNumber = useSelector(
    (state: RootStateOrAny) => state.mainReducer.feelingNumber
  );

  const [openModal, setOpenModal] = useState<boolean>(false);

  useEffect(() => {
    if (parseInt(feelingNumber) >= 9) {
      setOpenModal(true);
    }
  }, [feelingNumber]);

  return (
    <>
      <Modal isOpen={openModal} style={customStyles}>
        <h2 className="modal-title">Warning</h2>
        <p style={{ textAlign: "center" }}>
          If you have chest pain/shortness of breath/fever not responding to
          ibuprofen/acetaminophen etc then suggest going to your nearest
          emergency department and NOT booking a COVID-19 test today
        </p>
        <div className="button-container">
          <button
            className="accept-button"
            onClick={() => {
              setOpenModal(false);
            }}
          >
            I understand but wish to proceed.
          </button>
        </div>
      </Modal>
      <div className="container">
        <div className={s.symptoms}>
          <div className={s.symptoms__content}>
            <h2>
              How are you feeling? Please select a number between 1 and 10.
            </h2>
          </div>
          <div className={s.symptoms__content}>
            <React.Fragment>
              <h3>Select Number</h3>
              <select
                onChange={(e) => {
                  dispatch(setFeelingNumber(e.target.value));
                  if (parseInt(e.target.value) >= 7) {
                    dispatch(displayAssessment());
                  }
                }}
                defaultValue={feelingNumber}
                className="form-control"
              >
                <option value="">- Select -</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
              <div className="number-disclaimer">
                <ul>
                  <li>
                    1-3 symptoms are mild and you are able to function normally{" "}
                    <br />
                    (Example: Runny nose or loss of sense of smell or taste etc)
                  </li>
                  <li>
                    4-7 Symptoms are moderate and you are unable to function as
                    you normally would <br />
                    (Example: Feeling unwell, cough, sore throat etc)
                  </li>
                  <li>
                    8-10 Symptoms are severe and you are unable to function
                    (please proceed to emergency) <br />
                    (Example: Shortness of breath, chest pain, difficulty
                    breathing)
                  </li>
                </ul>
              </div>
            </React.Fragment>
          </div>
        </div>
      </div>
      <Footer
        isAuthorized={false}
        prevLinkTitle="Go Back"
        nextLink={routes.QUESTIONNAIRE_COMPLETE.path}
        nextLinkTitle="Next"
        progressLevel={75}
        hideNextStep={feelingNumber === null ? false : true}
      />
    </>
  );
};

export default NumberSelect;
