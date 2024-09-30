import React from "react";

const CorrectIcon = ({ color, stroke, width, height }) => {
  return (
    <svg
      width={width || "15"}
      height={height || "12"}
      viewBox="0 0 15 12"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.2073 2.93298L6.18235 10.958C5.99483 11.1454 5.74058 11.2506 5.47547 11.2506C5.21037 11.2506 4.95612 11.1454 4.7686 10.958L0.292349 6.45798C0.105146 6.27048 0 6.01636 0 5.75141C0 5.48646 0.105146 5.23234 0.292349 5.04485L1.54235 3.79485C1.72976 3.60822 1.98348 3.50344 2.24797 3.50344C2.51247 3.50344 2.76618 3.60822 2.9536 3.79485L5.50047 6.26485L11.548 0.291726C11.7354 0.104904 11.9893 0 12.2539 0C12.5186 0 12.7724 0.104904 12.9598 0.291726L14.2067 1.51298C14.3005 1.6059 14.3749 1.71647 14.4258 1.8383C14.4766 1.96014 14.5028 2.09083 14.5028 2.22285C14.5029 2.35486 14.4768 2.48557 14.4261 2.60746C14.3754 2.72934 14.301 2.83997 14.2073 2.93298Z"
        fill={color || "#00A91C"}
      />
    </svg>
  );
};

export default CorrectIcon;