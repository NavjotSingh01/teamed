import React, { useEffect } from "react";
import Footer from "../components/Footer/Footer";
import routes from "../routes/routes";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import s from "../assets/styles/PagesStyles.module.scss";
import {
  getSymptomsList,
  selectSymptom,
  removeSymptom,
} from "../actions/covidActions";

const SymptomsListPage: React.FC = () => {
  const dispatch = useDispatch();
  const symptoms = useSelector(
    (state: RootStateOrAny) => state.mainReducer.symptoms
  );
  const selectedSymptoms = useSelector(
    (state: RootStateOrAny) => state.mainReducer.selectedSymptoms
  );

  useEffect(() => {
    dispatch(getSymptomsList());
  }, []);
  return (
    <>
      <div className="container">
        <div className={s.symptoms}>
          <div className={s.symptoms__content}>
            <h2>Are you currently experiencing any of these symptoms?</h2>
          </div>
          <div className={s.symptoms__content}>
            {symptoms &&
              symptoms.map((symptom: any) => (
                <React.Fragment>
                  <input
                    id={symptom.symptom_name}
                    defaultChecked={selectedSymptoms.includes(symptom.pk)}
                    type="checkbox"
                    name={symptom.symptom_name}
                    onChange={(e) => {
                      if (e.target.checked) {
                        dispatch(selectSymptom(symptom.pk));
                      } else {
                        dispatch(removeSymptom(symptom.pk));
                      }
                    }}
                  />
                  <label htmlFor={symptom.symptom_name}>
                    {symptom.symptom_name}
                    <br /> <span>{symptom.symptom_description}</span>
                  </label>
                </React.Fragment>
              ))}
          </div>
        </div>
      </div>
      <Footer
        isAuthorized={false}
        prevLinkTitle="Go Back"
        nextLink={routes.SYMPTOMS_TIMELINE_PAGE.path}
        nextLinkTitle="Next"
        progressLevel={75}
        hideNextStep={selectedSymptoms.length > 0 ? true : false}
      />
    </>
  );
};

export default SymptomsListPage;
