import React from "react";

const MultipleFilesIcon = ({ color, stroke, width, height }) => {
  return (
    <svg
      width={width || "38"}
      height={height || "38"}
      viewBox="0 0 20 27"
      fill={color}
      stroke={stroke}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.0306 4.21938L13.2806 0.469375C13.2109 0.399749 13.1282 0.344539 13.0371 0.306898C12.9461 0.269257 12.8485 0.249923 12.75 0.25H5.25C4.85218 0.25 4.47064 0.408035 4.18934 0.68934C3.90804 0.970645 3.75 1.35218 3.75 1.75V3.25H2.25C1.85218 3.25 1.47064 3.40804 1.18934 3.68934C0.908035 3.97064 0.75 4.35218 0.75 4.75V18.25C0.75 18.6478 0.908035 19.0294 1.18934 19.3107C1.47064 19.592 1.85218 19.75 2.25 19.75H12.75C13.1478 19.75 13.5294 19.592 13.8107 19.3107C14.092 19.0294 14.25 18.6478 14.25 18.25V16.75H15.75C16.1478 16.75 16.5294 16.592 16.8107 16.3107C17.092 16.0294 17.25 15.6478 17.25 15.25V4.75C17.2501 4.65148 17.2307 4.55391 17.1931 4.46286C17.1555 4.37182 17.1003 4.28908 17.0306 4.21938ZM12.75 18.25H2.25V4.75H9.43969L12.75 8.06031V18.25ZM15.75 15.25H14.25V7.75C14.2501 7.65148 14.2307 7.55391 14.1931 7.46286C14.1555 7.37182 14.1003 7.28908 14.0306 7.21937L10.2806 3.46938C10.2109 3.39975 10.1282 3.34454 10.0371 3.3069C9.94609 3.26926 9.84852 3.24992 9.75 3.25H5.25V1.75H12.4397L15.75 5.06031V15.25ZM10.5 12.25C10.5 12.4489 10.421 12.6397 10.2803 12.7803C10.1397 12.921 9.94891 13 9.75 13H5.25C5.05109 13 4.86032 12.921 4.71967 12.7803C4.57902 12.6397 4.5 12.4489 4.5 12.25C4.5 12.0511 4.57902 11.8603 4.71967 11.7197C4.86032 11.579 5.05109 11.5 5.25 11.5H9.75C9.94891 11.5 10.1397 11.579 10.2803 11.7197C10.421 11.8603 10.5 12.0511 10.5 12.25ZM10.5 15.25C10.5 15.4489 10.421 15.6397 10.2803 15.7803C10.1397 15.921 9.94891 16 9.75 16H5.25C5.05109 16 4.86032 15.921 4.71967 15.7803C4.57902 15.6397 4.5 15.4489 4.5 15.25C4.5 15.0511 4.57902 14.8603 4.71967 14.7197C4.86032 14.579 5.05109 14.5 5.25 14.5H9.75C9.94891 14.5 10.1397 14.579 10.2803 14.7197C10.421 14.8603 10.5 15.0511 10.5 15.25Z"
        fill={color}
      />
    </svg>
  );
};

export default MultipleFilesIcon;
