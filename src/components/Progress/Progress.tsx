import React from 'react';
import ProgressDots from './ProgressDots/ProgressDots';
import cn from 'classnames';
import s from './Progress.module.scss';

type PropsType = {
  mobile?: boolean;
  progressLevel: number;
  isAuthorized: boolean;
  className?: string;
};

const Progress = ({
  mobile,
  progressLevel,
  isAuthorized,
  className,
}: PropsType): JSX.Element => {
  if (mobile) {
    return (
      <div className={cn(s.progressMobile, `${className}`)}>
        <div className={s.progressMobile__scale}></div>
        <div
          className={s.progressMobile__progressLevel}
          style={{ width: `${progressLevel}%` }}
        ></div>
      </div>
    );
  } else {
    return (
      <div className={cn(s.progressDesktop, `${className}`)}>
        <div className={s.progressDesktop__scale}></div>
        <div
          className={s.progressDesktop__progressLevel}
          style={{ width: `${progressLevel}%` }}
        ></div>
        <ProgressDots
          isAuthorized={isAuthorized}
          progressLevel={progressLevel}
        />
      </div>
    );
  }
};

export default Progress;
