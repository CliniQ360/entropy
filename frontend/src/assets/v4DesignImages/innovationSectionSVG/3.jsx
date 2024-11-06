import React from "react";

const IS3 = ({ color, stroke, width, height }) => {
  return (
    <svg
      width={width || "56"}
      height={height || "57"}
      viewBox="0 0 56 57"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 28.5C0 13.036 12.536 0.5 28 0.5C43.464 0.5 56 13.036 56 28.5C56 43.964 43.464 56.5 28 56.5C12.536 56.5 0 43.964 0 28.5Z"
        fill="white"
      />
      <path
        d="M0.5 28.5C0.5 13.3122 12.8122 1 28 1C43.1878 1 55.5 13.3122 55.5 28.5C55.5 43.6878 43.1878 56 28 56C12.8122 56 0.5 43.6878 0.5 28.5Z"
        stroke="black"
        stroke-opacity="0.06"
      />
      <path
        d="M38 17.75H18C17.5359 17.75 17.0908 17.9344 16.7626 18.2626C16.4344 18.5908 16.25 19.0359 16.25 19.5V26.5C16.25 32.9925 19.39 36.925 22.025 39.08C24.8662 41.405 27.6838 42.1912 27.8025 42.2237C27.9318 42.259 28.0682 42.259 28.1975 42.2237C28.3162 42.1912 31.1338 41.405 33.975 39.08C36.61 36.925 39.75 32.9925 39.75 26.5V19.5C39.75 19.0359 39.5656 18.5908 39.2374 18.2626C38.9092 17.9344 38.4641 17.75 38 17.75ZM38.25 26.5C38.25 31.22 36.5075 35.0487 33.07 37.8825C31.562 39.1208 29.845 40.08 28 40.715C26.1547 40.0805 24.4377 39.1212 22.93 37.8825C19.4925 35.0487 17.75 31.22 17.75 26.5V19.5C17.75 19.4337 17.7763 19.3701 17.8232 19.3232C17.8701 19.2763 17.9337 19.25 18 19.25H38C38.0663 19.25 38.1299 19.2763 38.1768 19.3232C38.2237 19.3701 38.25 19.4337 38.25 19.5V26.5ZM33.53 24.97C33.6705 25.1106 33.7493 25.3012 33.7493 25.5C33.7493 25.6988 33.6705 25.8894 33.53 26.03L26.53 33.03C26.3894 33.1705 26.1988 33.2493 26 33.2493C25.8012 33.2493 25.6106 33.1705 25.47 33.03L22.47 30.03C22.3375 29.8878 22.2654 29.6998 22.2688 29.5055C22.2723 29.3112 22.351 29.1258 22.4884 28.9884C22.6258 28.851 22.8112 28.7723 23.0055 28.7688C23.1998 28.7654 23.3878 28.8375 23.53 28.97L26 31.4387L32.47 24.97C32.6106 24.8295 32.8012 24.7507 33 24.7507C33.1988 24.7507 33.3894 24.8295 33.53 24.97Z"
        fill="#0054BA"
      />
    </svg>
  );
};

export default IS3;
