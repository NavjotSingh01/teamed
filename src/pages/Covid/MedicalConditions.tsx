import React, { useEffect } from "react";
import Footer from "../../components/Footer/Footer";
import routes from "../../routes/routes";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import s from "../../assets/styles/PagesStyles.module.scss";
import {
  getSymptomsList,
  selectSymptom,
  removeSymptom,
  getMedicalConditionsList,
  selectCondition,
  removeCondition,
} from "../../actions/covidActions";

const MedicalConditions: React.FC = () => {
  const dispatch = useDispatch();
  const medicalConditions = useSelector(
    (state: RootStateOrAny) => state.mainReducer.medicalConditions
  );
  const selectedConditions = useSelector(
    (state: RootStateOrAny) => state.mainReducer.selectedConditions
  );

  useEffect(() => {
    dispatch(getMedicalConditionsList());
  }, []);
  return (
    <>
      <div className="container">
        <div className={s.symptoms}>
          <div className={s.symptoms__content}>
            <h2>
              Do you have any medical conditions? If not, please click next.
            </h2>
          </div>
          <div className={s.symptoms__content}>
            {medicalConditions &&
              medicalConditions.map((medicalCondition: any) => (
                <React.Fragment>
                  <input
                    id={medicalCondition.name}
                    defaultChecked={selectedConditions.includes(
                      medicalCondition.pk
                    )}
                    type="checkbox"
                    name={medicalCondition.name}
                    onChange={(e) => {
                      if (e.target.checked) {
                        dispatch(selectCondition(medicalCondition.pk));
                      } else {
                        dispatch(removeCondition(medicalCondition.pk));
                      }
                    }}
                  />
                  <label htmlFor={medicalCondition.name}>
                    {medicalCondition.name}
                    <br /> <span>{medicalCondition.description}</span>
                  </label>
                </React.Fragment>
              ))}
          </div>
        </div>
      </div>
      <Footer
        isAuthorized={false}
        prevLinkTitle="Go Back"
        nextLink={routes.NUMBER_FEELING.path}
        nextLinkTitle="Next"
        progressLevel={75}
        hideNextStep={true}
      />
    </>
  );
};

export default MedicalConditions;
