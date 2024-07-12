import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import ArrowIcon from "../../assets/icons/ArrowIcon";
import "react-calendar/dist/Calendar.css";
import "./CalendarCustom.scss";
import s from "./DateSelector.module.scss";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import {
  setAppointmentDate,
  setAppointmentTime,
  getTimesFromDate,
} from "../../actions/covidActions";
import moment from "moment-timezone";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const DateSelector: React.FC = () => {
  const dispatch = useDispatch();
  const selectedClinic = useSelector(
    (state: RootStateOrAny) => state.mainReducer.selectedClinic
  );
  const selectedDate = useSelector(
    (state: RootStateOrAny) => state.mainReducer.date
  );
  const times = useSelector((state: RootStateOrAny) => state.mainReducer.times);
  const isFetchingPriorityDays = useSelector(
    (state: RootStateOrAny) => state.mainReducer.isFetchingPriorityDays
  );
  const priorityDays = useSelector(
    (state: RootStateOrAny) => state.mainReducer.priorityDays
  );
  const appointmentType = useSelector(
    (state: RootStateOrAny) => state.mainReducer.appointmentType
  );

  const hasAlreadyBooked = useSelector(
    (state: RootStateOrAny) => state.mainReducer.hasAlreadyBooked
  );
  const allDates = priorityDays.map((day: any) => day.date);
  useEffect(() => {
    var label = document.getElementsByClassName(
      "react-calendar__navigation__label"
    );

    const labelElement = label[0];

    (labelElement as HTMLButtonElement).onclick = null;
    labelElement.addEventListener(
      "click",
      function (e: any) {
        e.preventDefault();
        e.stopPropagation();
        return null;
      },
      true
    );
  }, []);

  const [date, setDate] = useState<any>(null);

  const questionnaireResponses = useSelector(
    (state: RootStateOrAny) => state.mainReducer.questionnaireResponses
  );
  const handleDateChange = (date: any) => {
    if (date !== selectedDate) {
      dispatch(setAppointmentTime(null));
    }
    setDate(date);
    dispatch(
      getTimesFromDate(
        selectedClinic.pk,
        moment(date).format("YYYY-MM-DD"),
        questionnaireResponses.length
      )
    );
    dispatch(setAppointmentDate(moment(date).format("YYYY-MM-DD")));
  };

  return (
    <div className="calendar-wrapper">
      <div className={s.calendarWrap}>
        {appointmentType === "flu" || appointmentType === "immunization" ? (
          <Calendar
            calendarType="US"
            onChange={handleDateChange}
            value={date}
            navigationLabel={({ date }) => `${months[date.getMonth()]}`}
            tileDisabled={({ activeStartDate, date, view }) =>
              !allDates.includes(moment(date).format("YYYY-MM-DD"))
            }
          />
        ) : (
          <Calendar
            calendarType="US"
            onChange={handleDateChange}
            value={date}
            navigationLabel={({ date }) => `${months[date.getMonth()]}`}
            minDate={new Date()}
            maxDate={moment().add(1, "month").toDate()}
          />
        )}
        <ArrowIcon
          direction="left"
          fill="#ffffff"
          className="calendar__icon_left"
        />
        <ArrowIcon
          direction="right"
          fill="#ffffff"
          className="calendar__icon_right"
        />
      </div>
      {date && (
        <div className="soonest-date">
          <h4>Choose a time</h4>
          {hasAlreadyBooked === false ? (
            times.length !== 0 ? (
              times.map((time: string) => (
                <button
                  onClick={() =>
                    dispatch(
                      setAppointmentTime(
                        moment(time).tz("America/Toronto").format("HH:mm")
                      )
                    )
                  }
                >
                  {moment(time).tz("America/Toronto").format("LT")}
                </button>
              ))
            ) : (
              <p className="no-times">
                No available times for this date. Please select another date. If
                you are booking a large family, you may need to call us to setup
                an appointment.
              </p>
            )
          ) : hasAlreadyBooked === true ? (
            <p className="no-times">
              You or one of your dependents is already booked in at this date.
              Please choose another date or cancel your existing appointment.
            </p>
          ) : (
            <p>Trying to book a large family? Please call (519) 339-1590.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default DateSelector;
