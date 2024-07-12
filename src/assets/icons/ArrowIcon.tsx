import React from 'react';
import cn from 'classnames';

type PropsType = {
  direction: string;
  fill?: string;
  className?: string;
  open?: boolean;
};

const ArrowDownIcon = ({
  direction,
  fill,
  className,
  open,
}: PropsType): JSX.Element => {
  return (
    <svg
      width="10"
      height="16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(`arrow_${direction}`, `${className}`, { open: open })}
    >
      <path
        d="M2 14l6-6.24L2 2"
        stroke={fill}
        stroke-width="2.4"
        stroke-linecap="round"
      />
    </svg>
  );
};

export default ArrowDownIcon;
