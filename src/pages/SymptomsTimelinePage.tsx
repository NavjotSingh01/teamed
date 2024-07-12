import React from "react";
import Footer from "../components/Footer/Footer";
import routes from "../routes/routes";
import s from "../assets/styles/PagesStyles.module.scss";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { setSymptomStart } from "../actions/covidActions";

const SymptomsTimelinePage: React.FC = () => {
  const dispatch = useDispatch();

  const start = useSelector((state: RootStateOrAny) => state.mainReducer.start);
  return (
    <>
      <div className="container">
        <div className={s.symptoms}>
          <div className={s.symptoms__content}>
            <h2>When did these symptoms start?</h2>
          </div>
          <div className={s.symptoms__content}>
            <input
              id="symptoms_start_1"
              type="radio"
              name="symptoms_start"
              defaultChecked={start == "Today"}
              onClick={(e) => {
                dispatch(setSymptomStart("Today"));
              }}
            />
            <label htmlFor="symptoms_start_1">Today</label>
            <input
              id="symptoms_start_2"
              type="radio"
              name="symptoms_start"
              defaultChecked={start == "Past 1-3 days"}
              onClick={(e) => {
                dispatch(setSymptomStart("Past 1-3 days"));
              }}
            />
            <label htmlFor="symptoms_start_2">Past 1-3 days</label>
            <input
              id="symptoms_start_3"
              type="radio"
              name="symptoms_start"
              defaultChecked={start == "Past week"}
              onClick={(e) => {
                dispatch(setSymptomStart("Past week"));
              }}
            />
            <label htmlFor="symptoms_start_3">Past Week</label>
            <input
              id="symptoms_start_4"
              type="radio"
              name="symptoms_start"
              defaultChecked={start == "2-3 weeks ago"}
              onClick={(e) => {
                dispatch(setSymptomStart("2-3 weeks ago"));
              }}
            />
            <label htmlFor="symptoms_start_4">2-3 Weeks ago</label>
            <input
              id="symptoms_start_5"
              type="radio"
              name="symptoms_start"
              defaultChecked={start == "1 Month ago"}
              onClick={(e) => {
                dispatch(setSymptomStart("1 Month Ago"));
              }}
            />
            <label htmlFor="symptoms_start_5">1 Month ago</label>
            <input
              id="symptoms_start_6"
              type="radio"
              name="symptoms_start"
              defaultChecked={start == "2-6 Months ago"}
              onClick={(e) => {
                dispatch(setSymptomStart("2-6 Months ago"));
              }}
            />
            <label htmlFor="symptoms_start_6">2-6 Months ago</label>
          </div>
        </div>
      </div>
      <Footer
        isAuthorized={false}
        prevLinkTitle="Go Back"
        nextLink={routes.MEDICAL_CONDITIONS.path}
        nextLinkTitle="Next"
        progressLevel={85}
        hideNextStep={!start ? false : true}
      />
    </>
  );
};

export default SymptomsTimelinePage;
