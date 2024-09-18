import React from "react";

const DownloadIcon = ({ color, stroke, width, height }) => {
  return (
    <svg
      width={width || "25"}
      height={height || "25"}
      viewBox="0 0 18 19"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.71938 9.03063C1.57864 8.88989 1.49958 8.69902 1.49958 8.5C1.49958 8.30098 1.57864 8.11011 1.71938 7.96937C1.86011 7.82864 2.05098 7.74958 2.25 7.74958C2.44902 7.74958 2.63989 7.82864 2.78062 7.96937L8.25 13.4397V1C8.25 0.801088 8.32902 0.610322 8.46967 0.46967C8.61032 0.329018 8.80109 0.25 9 0.25C9.19891 0.25 9.38968 0.329018 9.53033 0.46967C9.67098 0.610322 9.75 0.801088 9.75 1V13.4397L15.2194 7.96937C15.2891 7.89969 15.3718 7.84442 15.4628 7.8067C15.5539 7.76899 15.6515 7.74958 15.75 7.74958C15.8485 7.74958 15.9461 7.76899 16.0372 7.8067C16.1282 7.84442 16.2109 7.89969 16.2806 7.96937C16.3503 8.03906 16.4056 8.12178 16.4433 8.21283C16.481 8.30387 16.5004 8.40145 16.5004 8.5C16.5004 8.59855 16.481 8.69613 16.4433 8.78717C16.4056 8.87822 16.3503 8.96094 16.2806 9.03063L9.53063 15.7806C9.46097 15.8504 9.37825 15.9057 9.2872 15.9434C9.19616 15.9812 9.09856 16.0006 9 16.0006C8.90144 16.0006 8.80384 15.9812 8.7128 15.9434C8.62175 15.9057 8.53903 15.8504 8.46937 15.7806L1.71938 9.03063ZM17.25 17.5H0.75C0.551088 17.5 0.360322 17.579 0.21967 17.7197C0.0790178 17.8603 0 18.0511 0 18.25C0 18.4489 0.0790178 18.6397 0.21967 18.7803C0.360322 18.921 0.551088 19 0.75 19H17.25C17.4489 19 17.6397 18.921 17.7803 18.7803C17.921 18.6397 18 18.4489 18 18.25C18 18.0511 17.921 17.8603 17.7803 17.7197C17.6397 17.579 17.4489 17.5 17.25 17.5Z"
        fill={color || "black"}
      />
    </svg>
  );
};

export default DownloadIcon;
