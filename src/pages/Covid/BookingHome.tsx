import React, { useRef, useState, useEffect } from "react";
import Footer from "../../components/Footer/Footer";
import routes from "../../routes/routes";
import { useHistory } from "react-router-dom";
import s from "../assets/styles/PagesStyles.module.scss";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import {
  clinicSelect,
  getClinics,
  getFluClinics,
  getClosestClinic,
  receiveGetCoordinates,
  searchLocation,
  setInContact,
  setInContactDescription,
  getImmunizationClinics,
  getVaccinationClinics,
} from "../../actions/covidActions";
import { BounceLoader } from "react-spinners";
import Search from "../../assets/images/search.svg";

const BookingHome: React.FC = () => {
  const [isSimptomsYes, setSimptomsFlag] = useState(true);
  const [errorGeolocation, setErrorGeolocation] = useState(false);
  const dispatch = useDispatch();
  const description = useRef(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const placeName = useSelector(
    (state: RootStateOrAny) => state.mainReducer.placeName
  );
  const appointmentType = useSelector(
    (state: RootStateOrAny) => state.mainReducer.appointmentType
  );

  const locations = useSelector(
    (state: RootStateOrAny) => state.mainReducer.locations
  );
  const changeHandler = (flag: boolean) => {
    setSimptomsFlag(flag);
  };
  const history = useHistory();
  const clinics = useSelector(
    (state: RootStateOrAny) => state.mainReducer.clinics
  );
  const clinic = useSelector(
    (state: RootStateOrAny) => state.mainReducer.clinic
  );
  const coordinates = useSelector(
    (state: RootStateOrAny) => state.mainReducer.coordinates
  );
  useEffect(() => {
    if (searchQuery) {
      const delaySearch = setTimeout(() => {
        dispatch(searchLocation(searchQuery));
      }, 400);
      return () => clearTimeout(delaySearch);
    }
  }, [dispatch, searchQuery]);

  useEffect(() => {
    if (placeName) {
      if (appointmentType === "flu") {
        dispatch(getFluClinics(coordinates));
      } else if (appointmentType === "covid") {
        dispatch(getClinics(coordinates));
      } else if (appointmentType === "immunization") {
        dispatch(getImmunizationClinics(coordinates));
      } else {
        dispatch(getVaccinationClinics(coordinates));
      }
    }
  }, [appointmentType, coordinates, dispatch, placeName]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos: any) => {
        console.log(pos);
        dispatch(getClosestClinic([pos.coords.latitude, pos.coords.longitude]));
      },
      (err: any) => {
        console.log(err);
        setErrorGeolocation(true);
      }
    );
  }, [dispatch]);

  return (
    <>
      <section className="main-bg-sectoin desktop-page less-space booking-loc-main">
        <div className="container completed-questionnaire">
          <div className="row">
            <div className="col-md-12 col-lg-4 col-xl-5">
              <div className="cancel-wrapper updated-arrow">
                <a
                  href="#"
                  title="BACK to Summary"
                  onClick={(e) => {
                    e.preventDefault();
                    history.goBack();
                  }}
                >
                  <i
                    className="fas fa-chevron-circle-left"
                    aria-hidden="true"
                  ></i>{" "}
                  BACK to Summary
                </a>
              </div>
              <h1>
                <img src="images/version5-images/heading-check.svg" alt="" />
                <span>
                  Book a <br />{" "}
                  {appointmentType === "flu"
                    ? "Flu Shot"
                    : appointmentType === "covid"
                    ? "COVID-19 Test"
                    : appointmentType === "immunization"
                    ? "Immunization"
                    : "Vaccination"}
                </span>
              </h1>
            </div>
            <div className="col-md-12 col-lg-8 col-xl-7">
              <div className="booking-location-right">
                <div className="booking-info-main search-testing-site serch-result-main">
                  <h2>
                    Search for a{" "}
                    {appointmentType === "flu"
                      ? "Flu Clinic"
                      : appointmentType === "immunization"
                      ? "Immunization Site"
                      : "Testing Site"}
                    :
                  </h2>
                  {appointmentType === "flu" ? (
                    <p>
                      Corigan is connected to many flu clinics within Ontario.
                      Search your location to find flu clinics near you:
                    </p>
                  ) : (
                    <p>
                      Testing by Corigan is connected to many testing sites
                      within Ontario. Search your location to find more testing
                      centres near you:
                    </p>
                  )}
                  <div className="input-group mb-3 s-box search-testing-field">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="basic-addon1">
                        <img src={Search} alt="search" />
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search City, Postal Code, etc"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      style={{ border: 0 }}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setSearchQuery(e.target.value)
                      }
                    />
                    <a
                      href="#"
                      title="close"
                      className="search-close"
                      onClick={(e) => {
                        e.preventDefault();
                        setSearchQuery("");
                      }}
                    ></a>
                  </div>
                  <div className="search-list">
                    {clinics &&
                      (clinics.length > 0 ? (
                        <ul>
                          {clinics.map((clinic: any) => (
                            <li
                              onClick={(e) => {
                                e.preventDefault();
                                dispatch(clinicSelect(clinic));
                                if (clinic.questions_enabled) {
                                  if (clinic.disclaimer) {
                                    history.push(routes.DISCLAIMER_PAGE.path);
                                  } else {
                                    history.push(routes.IN_CONTACT_PAGE.path);
                                  }
                                } else {
                                  if (clinic.disclaimer) {
                                    history.push(routes.DISCLAIMER_PAGE.path);
                                  } else {
                                    history.push(
                                      routes.QUESTIONNAIRE_COMPLETE.path
                                    );
                                  }
                                }
                              }}
                            >
                              <div className="d-flex justify-content-between">
                                <h4>{clinic.name} </h4>
                                <span>{clinic.distance.toFixed(1)} km</span>
                              </div>
                              <p>
                                {clinic.address}, {clinic.postalcode},{" "}
                                {clinic.city}
                              </p>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <li>
                          <div className="d-flex justify-content-between">
                            <h4>
                              We couldn't find any clinics around this area.{" "}
                            </h4>
                            <span></span>
                          </div>
                          <p>
                            Try searching by postal code, city or community
                            name.
                          </p>
                        </li>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BookingHome;
