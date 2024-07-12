import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import Map from "../components/Map/Map";
import routes from "../routes/routes";
import s from "../assets/styles/PagesStyles.module.scss";
// import "../assets/styles/_searchpage.scss";

import {
  getCurrentCoordinates,
  searchLocation,
  receiveGetCoordinates,
  getClinics,
  clinicSelect,
} from "../actions/covidActions";

import cn from "classnames";

import SearchIcon from "../assets/icons/SearchIcon";

const SearchResultsPage: React.FC = () => {
  const placeName = useSelector(
    (state: RootStateOrAny) => state.mainReducer.placeName
  );
  const [isSearching, setIsSearching] = useState<boolean>(
    placeName ? true : false
  );
  const [searchQuery, setSearchQuery] = useState<string>("");

  const history = useHistory();
  const dispatch = useDispatch();

  const locations = useSelector(
    (state: RootStateOrAny) => state.mainReducer.locations
  );
  const coordinates = useSelector(
    (state: RootStateOrAny) => state.mainReducer.coordinates
  );
  const clinics = useSelector(
    (state: RootStateOrAny) => state.mainReducer.clinics
  );

  const handleClinicSelect = () => {
    history.push(routes.OPTIONS_PAGE.path);
  };

  // useEffect(() => {
  //   if (!placeName) {
  //     dispatch(getCurrentCoordinates());
  //   }
  // }, []);

  useEffect(() => {
    if (searchQuery) {
      const delaySearch = setTimeout(() => {
        dispatch(searchLocation(searchQuery));
      }, 400);
      return () => clearTimeout(delaySearch);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (placeName) {
      dispatch(getClinics(coordinates));
    }
  }, [placeName]);

  return (
    <div className={cn("search", "page")}>
      <div
        className={cn("container", "search__container", {
          searching: placeName ? true : false,
        })}
      >
        <div
          className={cn("search__content", {
            searching: isSearching ? true : placeName ? true : false,
          })}
        >
          {!isSearching && !placeName && (
            <div className="search__titleWrap">
              <h2 className={cn("title_1", "search__title")}>
                Find a testing <br /> center near you
              </h2>
              <p className="search__subtitle">
                It’s easier than ever to get tested. Choose a clinic and fill in
                a short questionnaire
              </p>
            </div>
          )}

          <div
            className={cn("search__inputWrap", {
              isSearching: isSearching || placeName ? true : false,
            })}
          >
            <input
              className={cn("search__input", {
                searching: placeName ? true : false,
              })}
              type="text"
              placeholder="City or Postal Code"
              onFocus={() => setIsSearching(true)}
              defaultValue={placeName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearchQuery(e.target.value)
              }
            />
            <SearchIcon />
          </div>
          {!placeName && locations && (
            <ul className="search__results">
              {locations.map((location: any) => (
                <li
                  onClick={(e) => {
                    dispatch(
                      receiveGetCoordinates(
                        location.center,
                        location.place_name
                      )
                    );
                    setSearchQuery("");
                  }}
                >
                  {location.place_name}
                </li>
              ))}
            </ul>
          )}

          {placeName && locations && searchQuery && (
            <ul className="search__results">
              {locations.map((location: any) => (
                <li
                  onClick={(e) => {
                    dispatch(
                      receiveGetCoordinates(
                        location.center,
                        location.place_name
                      )
                    );
                    setSearchQuery("");
                  }}
                >
                  {location.place_name}
                </li>
              ))}
            </ul>
          )}
          {placeName && clinics && !searchQuery && (
            <ul className="search__results">
              {clinics.map((clinic: any) => (
                <li
                  key={clinic.pk}
                  className="search__point"
                  role="button"
                  onClick={(e) => {
                    dispatch(clinicSelect(clinic));
                    history.push(routes.OPTIONS_PAGE.path);
                  }}
                >
                  <div>
                    <h4 className="search__pointTitle">{clinic.name}</h4>
                    <p>
                      {clinic.address} {clinic.city}
                    </p>
                  </div>
                  <span>{clinic.distance.toFixed(1)} km</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      {coordinates && (
        <div
          className={cn("search__map", { visible: coordinates ? true : false })}
        >
          <Map clinics={clinics} size="lg" />
        </div>
      )}
    </div>
  );
};

export default SearchResultsPage;
