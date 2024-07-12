import React, { useEffect } from "react";
import Footer from "../components/Footer/Footer";
import routes from "../routes/routes";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import s from "../assets/styles/PagesStyles.module.scss";
import {
  getSymptomsList,
  selectSymptom,
  removeSymptom,
  getImmunizationList,
  selectImmunization,
} from "../actions/covidActions";

const Immunizations: React.FC = () => {
  const dispatch = useDispatch();

  const immunizations = useSelector(
    (state: RootStateOrAny) => state.mainReducer.immunizations
  );
  const isFetchingImmunizations = useSelector(
    (state: RootStateOrAny) => state.mainReducer.isFetchingImmunizations
  );
  const selectedImmunizations = useSelector(
    (state: RootStateOrAny) => state.mainReducer.selectedImmunizations
  );

  useEffect(() => {
    dispatch(getImmunizationList());
  }, []);
  return (
    <>
      <div className="container">
        <div className={s.symptoms}>
          <div className={s.symptoms__content}>
            <h2>
              I am providing consent for my child to receive the following
              immunization(s):{" "}
            </h2>
          </div>
          <div className={s.symptoms__content}>
            {immunizations &&
              immunizations.map((immunization: any) => (
                <React.Fragment>
                  <input
                    id={immunization.name}
                    defaultChecked={selectedImmunizations.includes(
                      immunization.pk
                    )}
                    type="checkbox"
                    name={immunization.name}
                    onChange={(e) => {
                      if (e.target.checked) {
                        dispatch(selectImmunization(immunization.pk));
                      } else {
                        dispatch(removeSymptom(immunization.pk));
                      }
                    }}
                  />
                  <label htmlFor={immunization.name}>{immunization.name}</label>
                </React.Fragment>
              ))}
          </div>
        </div>
      </div>
      <Footer
        isAuthorized={false}
        prevLinkTitle="Go Back"
        nextLink={routes.QUESTIONNAIRE_COMPLETE.path}
        nextLinkTitle="Next"
        progressLevel={75}
        hideNextStep={true}
      />
    </>
  );
};

export default Immunizations;
