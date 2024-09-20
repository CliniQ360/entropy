import React from "react";

const MicIcon = ({ color, stroke, width, height }) => {
  return (
    <svg
      width={width || "40"}
      height={height || "40"}
      viewBox="0 0 25 30"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.5 20C12.0908 19.9983 13.616 19.3657 14.7408 18.2408C15.8657 17.116 16.4983 15.5908 16.5 14V6C16.5 4.4087 15.8679 2.88258 14.7426 1.75736C13.6174 0.632141 12.0913 0 10.5 0C8.9087 0 7.38258 0.632141 6.25736 1.75736C5.13214 2.88258 4.5 4.4087 4.5 6V14C4.50165 15.5908 5.13433 17.116 6.25919 18.2408C7.38405 19.3657 8.90921 19.9983 10.5 20ZM6.5 6C6.5 4.93913 6.92143 3.92172 7.67157 3.17157C8.42172 2.42143 9.43913 2 10.5 2C11.5609 2 12.5783 2.42143 13.3284 3.17157C14.0786 3.92172 14.5 4.93913 14.5 6V14C14.5 15.0609 14.0786 16.0783 13.3284 16.8284C12.5783 17.5786 11.5609 18 10.5 18C9.43913 18 8.42172 17.5786 7.67157 16.8284C6.92143 16.0783 6.5 15.0609 6.5 14V6ZM11.5 23.95V28C11.5 28.2652 11.3946 28.5196 11.2071 28.7071C11.0196 28.8946 10.7652 29 10.5 29C10.2348 29 9.98043 28.8946 9.79289 28.7071C9.60536 28.5196 9.5 28.2652 9.5 28V23.95C7.03455 23.6991 4.74971 22.543 3.0873 20.7051C1.4249 18.8672 0.503045 16.4782 0.5 14C0.5 13.7348 0.605357 13.4804 0.792893 13.2929C0.98043 13.1054 1.23478 13 1.5 13C1.76522 13 2.01957 13.1054 2.20711 13.2929C2.39464 13.4804 2.5 13.7348 2.5 14C2.5 16.1217 3.34285 18.1566 4.84315 19.6569C6.34344 21.1571 8.37827 22 10.5 22C12.6217 22 14.6566 21.1571 16.1569 19.6569C17.6571 18.1566 18.5 16.1217 18.5 14C18.5 13.7348 18.6054 13.4804 18.7929 13.2929C18.9804 13.1054 19.2348 13 19.5 13C19.7652 13 20.0196 13.1054 20.2071 13.2929C20.3946 13.4804 20.5 13.7348 20.5 14C20.497 16.4782 19.5751 18.8672 17.9127 20.7051C16.2503 22.543 13.9654 23.6991 11.5 23.95Z"
        fill={color || "#0188E8"}
      />
    </svg>
  );
};

export default MicIcon;