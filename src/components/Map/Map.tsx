import React, { useState, useEffect, useRef } from "react";
import ReactMapGL, { Marker, Popup, GeolocateControl } from "react-map-gl";
// @ts-ignore
// import Geocoder from "react-map-gl-geocoder";
import MapMarker from "../../assets/icons/MapMarker";
import config from "../../config";
import s from "./Map.module.scss";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
// import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";

type PropsType = {
  size: string;
  chosenClinic?: any;
  clinics?: any[];
};

const Map = ({ clinics, size, chosenClinic }: PropsType): JSX.Element => {
  const placeName = useSelector(
    (state: RootStateOrAny) => state.mainReducer.placeName
  );
  const coordinates = useSelector(
    (state: RootStateOrAny) => state.mainReducer.coordinates
  );

  let viewportInitialState;

  if (chosenClinic) {
    viewportInitialState = {
      latitude: chosenClinic.location.coordinates[1],
      longitude: chosenClinic.location.coordinates[0],
      width: size === "lg" ? "100vw" : size === "md" ? "544px" : "380px",
      height:
        size === "lg"
          ? "calc(100vh - 80px)"
          : size === "md"
          ? "314px"
          : "150px",
      zoom: size === "lg" ? 10 : 15,
    };
  } else {
    viewportInitialState = {
      latitude: coordinates[1],
      longitude: coordinates[0],
      width: size === "lg" ? "100vw" : size === "md" ? "544px" : "380px",
      height:
        size === "lg"
          ? "calc(100vh - 80px)"
          : size === "md"
          ? "314px"
          : "150px",
      zoom: size === "lg" ? 12.7 : 15,
    };
  }

  const [viewport, setViewport] = useState<any>(viewportInitialState);

  const [selectedClinic, setSelectedClinic] = useState<any>(null);

  const mapRef = useRef(null);

  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition(pos => {
  //     setViewport({
  //       ...viewport,
  //       latitude: pos.coords.latitude,
  //       longitude: pos.coords.longitude,
  //     });
  //   });
  // }, []);

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedClinic(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);

  const handleGeocoderViewportChange = (viewport: any) => {
    const geocoderDefaultOverrides = { transitionDuration: 1000 };

    return setViewport({
      ...viewport,
      ...geocoderDefaultOverrides,
    });
  };

  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={config.MAPBOX_TOKEN}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      onViewportChange={(viewport) => {
        setViewport(viewport);
      }}
      ref={mapRef}
    >
      <GeolocateControl
        className={s.geolocateControl}
        positionOptions={{ enableHighAccuracy: true }}
        trackUserLocation={true}
      />
      {chosenClinic && (
        <Marker
          latitude={chosenClinic.location.coordinates[0]}
          longitude={chosenClinic.location.coordinates[1]}
        >
          <button
            className={s.markerBtn}
            onClick={(e) => {
              e.preventDefault();
              setSelectedClinic(chosenClinic);
            }}
          >
            <MapMarker />
          </button>
        </Marker>
      )}
      {clinics &&
        clinics.map((clinic: any) => (
          <Marker
            key={clinic.pk}
            latitude={clinic.location.coordinates[0]}
            longitude={clinic.location.coordinates[1]}
          >
            <button
              className={s.markerBtn}
              onClick={(e) => {
                e.preventDefault();
                setSelectedClinic(clinic);
              }}
            >
              <MapMarker />
            </button>
          </Marker>
        ))}

      {selectedClinic && (
        <Popup
          latitude={selectedClinic.location.coordinates[0]}
          longitude={selectedClinic.location.coordinates[1]}
          onClose={() => {
            setSelectedClinic(null);
          }}
        >
          <div>
            <h2>{selectedClinic.name}</h2>
            {/* <p>{selectedClinic.properties.DESCRIPTIO}</p> */}
          </div>
        </Popup>
      )}
    </ReactMapGL>
  );
};

export default Map;
