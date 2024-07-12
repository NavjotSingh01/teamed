import React, { useEffect } from "react";
import s from "./SoonestAppointments.module.scss";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import moment from "moment-timezone";

import {
  setNextThreeDays,
  getFirstDay,
  getSecondDay,
  getThirdDay,
  setAppointmentDate,
  setAppointmentTime,
} from "../../actions/covidActions";
import { BounceLoader } from "react-spinners";

const SoonestAppointments: React.FC = () => {
  const dispatch = useDispatch();
  const selectedClinic = useSelector(
    (state: RootStateOrAny) => state.mainReducer.selectedClinic
  );
  const questionnaireResponses = useSelector(
    (state: RootStateOrAny) => state.mainReducer.questionnaireResponses
  );
  const threeDays = useSelector(
    (state: RootStateOrAny) => state.mainReducer.threeDays
  );
  const firstTimes = useSelector(
    (state: RootStateOrAny) => state.mainReducer.firstTimes
  );
  const secondTimes = useSelector(
    (state: RootStateOrAny) => state.mainReducer.secondTimes
  );
  const thirdTimes = useSelector(
    (state: RootStateOrAny) => state.mainReducer.thirdTimes
  );

  useEffect(() => {
    var weekStart = moment();
    var weekEnd = moment().tz("America/Toronto").add("week");

    var days = [];
    for (var i = 0; i <= 6; i++) {
      days.push(moment(weekStart).tz("America/Toronto").add(i, "days"));
    }
    console.log(days);
    dispatch(setNextThreeDays(days));
  }, []);

  useEffect(() => {
    if (threeDays.length !== 0) {
      console.log(threeDays);
      dispatch(
        getFirstDay(
          selectedClinic.pk,
          threeDays[0].format("YYYY-MM-DD"),
          questionnaireResponses.length
        )
      );
      dispatch(
        getSecondDay(
          selectedClinic.pk,
          threeDays[1].format("YYYY-MM-DD"),
          questionnaireResponses.length
        )
      );
      dispatch(
        getThirdDay(
          selectedClinic.pk,
          threeDays[2].format("YYYY-MM-DD"),
          questionnaireResponses.length
        )
      );
    }
  }, [threeDays]);

  return threeDays && firstTimes ? (
    <div className={s.container}>
      {threeDays.slice(0, 3).map((day: any, index: number) => (
        <div className={s.day}>
          <h4>
            {moment(day).isSame(moment(), "day")
              ? "Today"
              : moment(day).format("dddd")}
          </h4>
          {index == 0
            ? firstTimes.slice(0, 4).map((time: string) => (
                <button
                  onClick={(e) => {
                    dispatch(
                      setAppointmentDate(moment(time).format("YYYY-MM-DD"))
                    );
                    dispatch(
                      setAppointmentTime(
                        moment(time).tz("America/Toronto").format("HH:mm")
                      )
                    );
                  }}
                >
                  {moment(time).tz("America/Toronto").format("hh:mm A")}
                </button>
              ))
            : index == 1
            ? secondTimes.slice(0, 4).map((time: string) => (
                <button
                  onClick={(e) => {
                    dispatch(
                      setAppointmentDate(moment(time).format("YYYY-MM-DD"))
                    );
                    dispatch(
                      setAppointmentTime(
                        moment(time).tz("America/Toronto").format("HH:mm")
                      )
                    );
                  }}
                >
                  {moment(time).tz("America/Toronto").format("hh:mm A")}
                </button>
              ))
            : index == 2
            ? thirdTimes.slice(0, 4).map((time: string) => (
                <button
                  onClick={(e) => {
                    dispatch(
                      setAppointmentDate(moment(time).format("YYYY-MM-DD"))
                    );
                    dispatch(
                      setAppointmentTime(
                        moment(time).tz("America/Toronto").format("HH:mm")
                      )
                    );
                  }}
                >
                  {moment(time).tz("America/Toronto").format("hh:mm A")}
                </button>
              ))
            : "No times available"}
        </div>
      ))}
    </div>
  ) : (
    <BounceLoader />
  );
};

export default SoonestAppointments;
