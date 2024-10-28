import React from "react";

const Eli2 = ({ color, stroke, width, height }) => {
  return (
    <svg
      width={width || "24"}
      height={height || "23"}
      viewBox="0 0 100 74"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M73.3333 20.6542V18.3333C73.3333 7.88333 57.5708 0 36.6667 0C15.7625 0 0 7.88333 0 18.3333V35C0 43.7042 10.9375 50.6208 26.6667 52.6917V55C26.6667 65.45 42.4292 73.3333 63.3333 73.3333C84.2375 73.3333 100 65.45 100 55V38.3333C100 29.7083 89.4083 22.7833 73.3333 20.6542ZM20 44.5292C11.8375 42.25 6.66667 38.4958 6.66667 35V29.1375C10.0667 31.5458 14.6208 33.4875 20 34.7917V44.5292ZM53.3333 34.7917C58.7125 33.4875 63.2667 31.5458 66.6667 29.1375V35C66.6667 38.4958 61.4958 42.25 53.3333 44.5292V34.7917ZM46.6667 64.5292C38.5042 62.25 33.3333 58.4958 33.3333 55V53.2625C34.4292 53.3042 35.5375 53.3333 36.6667 53.3333C38.2833 53.3333 39.8625 53.2792 41.4125 53.1875C43.1344 53.8039 44.8884 54.3268 46.6667 54.7542V64.5292ZM46.6667 45.9375C43.3559 46.4266 40.0134 46.6703 36.6667 46.6667C33.3199 46.6703 29.9775 46.4266 26.6667 45.9375V36.025C29.9824 36.4567 33.3229 36.6711 36.6667 36.6667C40.0104 36.6711 43.3509 36.4567 46.6667 36.025V45.9375ZM73.3333 65.9375C66.7021 66.9094 59.9646 66.9094 53.3333 65.9375V56C56.648 56.4456 59.9888 56.6683 63.3333 56.6667C66.6771 56.6711 70.0176 56.4567 73.3333 56.025V65.9375ZM93.3333 55C93.3333 58.4958 88.1625 62.25 80 64.5292V54.7917C85.3792 53.4875 89.9333 51.5458 93.3333 49.1375V55Z"
        fill="#0054BA"
      />
    </svg>
  );
};

export default Eli2;