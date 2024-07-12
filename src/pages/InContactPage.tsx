import React, { useRef, useState, useEffect } from "react";
import Footer from "../components/Footer/Footer";
import routes from "../routes/routes";
import s from "../assets/styles/PagesStyles.module.scss";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { setInContact, setInContactDescription } from "../actions/covidActions";

const SymptomsTimelinePage: React.FC = () => {
  // const [isSimptomsYes, setSimptomsFlag] = useState(true);
  const dispatch = useDispatch();
  const description = useRef(null);

  const contact = useSelector(
    (state: RootStateOrAny) => state.mainReducer.contact
  );

  const InContactDescription = useSelector(
    (state: RootStateOrAny) => state.mainReducer.description
  );

  // const changeHandler = (flag: boolean) => {
  //   setSimptomsFlag(flag);
  // };

  // useEffect(() => {
  //   dispatch(setInContact("YES"));
  // }, []);

  return (
    <>
      <div className="container">
        <div className={s.symptoms}>
          <div className={s.symptoms__content}>
            <h2>Any contact with probable or confirmed cases?</h2>
          </div>
          <div className={s.symptoms__content}>
            <div className={s.symptoms__content__buttons}>
              <button
                type="button"
                className={contact === "YES" ? "active" : ""}
                onClick={(e) => {
                  dispatch(setInContact("YES"));
                  // changeHandler(true);
                }}
              >
                Yes
              </button>
              <button
                type="button"
                className={contact === "NO" ? "active" : ""}
                onClick={(e) => {
                  dispatch(setInContact("NO"));
                  // changeHandler(false);
                }}
              >
                No
              </button>
            </div>
            <h2>Please provide details</h2>
            <textarea
              name="details"
              id="details"
              defaultValue={InContactDescription}
              onChange={(e) => {
                dispatch(setInContactDescription(e.target.value));
              }}
            ></textarea>
          </div>
        </div>
      </div>
      <Footer
        isAuthorized={false}
        prevLinkTitle="Go Back"
        nextLink={routes.REQUIRED_TESTING.path}
        nextLinkTitle="Next"
        progressLevel={95}
        isSubmitting={false}
      />
    </>
  );
};

export default SymptomsTimelinePage;
