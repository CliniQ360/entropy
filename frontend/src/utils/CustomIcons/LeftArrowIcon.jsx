import React from "react";

const LeftArrowIcon = ({ color, stroke, width, height }) => {
  return (
    <svg
      width={width || "25"}
      height={height || "25"}
      viewBox="0 0 10 18"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      stroke={stroke}
    >
      <path
        d="M9.39798 16.1021C9.45325 16.1536 9.49757 16.2157 9.52832 16.2847C9.55906 16.3537 9.57559 16.4282 9.57693 16.5037C9.57826 16.5793 9.56436 16.6543 9.53607 16.7243C9.50778 16.7944 9.46567 16.858 9.41226 16.9114C9.35885 16.9648 9.29522 17.0069 9.22518 17.0352C9.15514 17.0635 9.08012 17.0774 9.00459 17.0761C8.92906 17.0748 8.85458 17.0582 8.78558 17.0275C8.71658 16.9967 8.65448 16.9524 8.60298 16.8971L1.10298 9.39714C0.997644 9.29167 0.938477 9.1487 0.938477 8.99964C0.938477 8.85058 0.997644 8.70761 1.10298 8.60214L8.60298 1.10214C8.70961 1.00278 8.85065 0.948688 8.99637 0.95126C9.1421 0.953831 9.28114 1.01286 9.3842 1.11592C9.48726 1.21898 9.54629 1.35802 9.54886 1.50375C9.55143 1.64947 9.49734 1.79051 9.39798 1.89714L2.29642 8.99964L9.39798 16.1021Z"
        fill={color}
      />
    </svg>
  );
};

export default LeftArrowIcon;