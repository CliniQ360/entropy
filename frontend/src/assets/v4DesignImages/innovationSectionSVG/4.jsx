import React from "react";

const IS4 = ({ color, stroke, width, height }) => {
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
        d="M40 21.75H37.75V20.5C37.75 19.7707 37.4603 19.0712 36.9445 18.5555C36.4288 18.0397 35.7293 17.75 35 17.75H17C16.2707 17.75 15.5712 18.0397 15.0555 18.5555C14.5397 19.0712 14.25 19.7707 14.25 20.5V32.5C14.25 33.2293 14.5397 33.9288 15.0555 34.4445C15.5712 34.9603 16.2707 35.25 17 35.25H31.25V36.5C31.25 37.2293 31.5397 37.9288 32.0555 38.4445C32.5712 38.9603 33.2707 39.25 34 39.25H40C40.7293 39.25 41.4288 38.9603 41.9445 38.4445C42.4603 37.9288 42.75 37.2293 42.75 36.5V24.5C42.75 23.7707 42.4603 23.0712 41.9445 22.5555C41.4288 22.0397 40.7293 21.75 40 21.75ZM17 33.75C16.6685 33.75 16.3505 33.6183 16.1161 33.3839C15.8817 33.1495 15.75 32.8315 15.75 32.5V20.5C15.75 20.1685 15.8817 19.8505 16.1161 19.6161C16.3505 19.3817 16.6685 19.25 17 19.25H35C35.3315 19.25 35.6495 19.3817 35.8839 19.6161C36.1183 19.8505 36.25 20.1685 36.25 20.5V21.75H34C33.2707 21.75 32.5712 22.0397 32.0555 22.5555C31.5397 23.0712 31.25 23.7707 31.25 24.5V33.75H17ZM41.25 36.5C41.25 36.8315 41.1183 37.1495 40.8839 37.3839C40.6495 37.6183 40.3315 37.75 40 37.75H34C33.6685 37.75 33.3505 37.6183 33.1161 37.3839C32.8817 37.1495 32.75 36.8315 32.75 36.5V24.5C32.75 24.1685 32.8817 23.8505 33.1161 23.6161C33.3505 23.3817 33.6685 23.25 34 23.25H40C40.3315 23.25 40.6495 23.3817 40.8839 23.6161C41.1183 23.8505 41.25 24.1685 41.25 24.5V36.5ZM28.75 38.5C28.75 38.6989 28.671 38.8897 28.5303 39.0303C28.3897 39.171 28.1989 39.25 28 39.25H23C22.8011 39.25 22.6103 39.171 22.4697 39.0303C22.329 38.8897 22.25 38.6989 22.25 38.5C22.25 38.3011 22.329 38.1103 22.4697 37.9697C22.6103 37.829 22.8011 37.75 23 37.75H28C28.1989 37.75 28.3897 37.829 28.5303 37.9697C28.671 38.1103 28.75 38.3011 28.75 38.5ZM38.75 26.5C38.75 26.6989 38.671 26.8897 38.5303 27.0303C38.3897 27.171 38.1989 27.25 38 27.25H36C35.8011 27.25 35.6103 27.171 35.4697 27.0303C35.329 26.8897 35.25 26.6989 35.25 26.5C35.25 26.3011 35.329 26.1103 35.4697 25.9697C35.6103 25.829 35.8011 25.75 36 25.75H38C38.1989 25.75 38.3897 25.829 38.5303 25.9697C38.671 26.1103 38.75 26.3011 38.75 26.5Z"
        fill="#0054BA"
      />
    </svg>
  );
};

export default IS4;