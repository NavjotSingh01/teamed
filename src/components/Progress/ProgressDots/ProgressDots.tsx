import React from "react";
import cn from "classnames";
// import s from './ProgressDots.module.scss';
import "./ProgressDots.scss";

type PropsType = {
  isAuthorized: boolean;
  progressLevel: number;
};

const ProgressDots = ({
  isAuthorized,
  progressLevel,
}: PropsType): JSX.Element => {
  return (
    <>
      {/* <div className={cn(s.dot, s.dot_1, 'filled')}></div>
      <div className={cn(s.dot, s.dot_2)}></div>
      <div className={cn(s.dot, s.dot_3)}></div>
      <div className={cn(s.dot, s.dot_4)}></div>
      <div className={cn(s.dot, s.dot_5)}></div>

      <div className={cn(s.dot__title, s.dot__title_1, 'filled')}>Clinic</div>
      <div className={cn(s.dot__title, s.dot__title_2)}>Pick a time</div>
      <div className={cn(s.dot__title, s.dot__title_3)}>Profile</div>
      <div className={cn(s.dot__title, s.dot__title_4)}>Screening</div>
      <div className={cn(s.dot__title, s.dot__title_5)}>Confirm</div> */}

      <div className={cn("dot", "dot_authorized_1", "filled")}></div>
      <div className={cn("dot", "dot_authorized_2", "filled")}></div>
      <div
        className={cn("dot", "dot_authorized_3", {
          filled: progressLevel >= 50,
        })}
      ></div>
      <div
        className={cn("dot", "dot_authorized_4", {
          filled: progressLevel >= 75,
        })}
      ></div>
      <div
        className={cn("dot", "dot_authorized_5", {
          filled: progressLevel >= 100,
        })}
      ></div>

      <div className={cn("dot__title", "dot__title_authorized_1", "filled")}>
        Disclaimer
      </div>

      <div
        className={cn("dot__title", "dot__title_authorized_3", {
          filled: progressLevel >= 50,
        })}
      >
        Screening
      </div>

      <div
        className={cn("dot__title", "dot__title_authorized_5", {
          filled: progressLevel >= 50,
        })}
      >
        Confirm
      </div>
    </>
  );
};

export default ProgressDots;
