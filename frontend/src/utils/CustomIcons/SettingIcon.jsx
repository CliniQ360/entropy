import React from "react";

const SettingIcon = ({ color, stroke, width, height }) => {
  return (
    <svg
      width={width || "8"}
      height={height || "28"}
      viewBox="0 0 8 28"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 10.25C3.25832 10.25 2.5333 10.4699 1.91661 10.882C1.29993 11.294 0.819282 11.8797 0.535454 12.5649C0.251625 13.2502 0.177362 14.0042 0.322057 14.7316C0.466751 15.459 0.823905 16.1272 1.34835 16.6517C1.8728 17.1761 2.54098 17.5333 3.26841 17.6779C3.99584 17.8226 4.74984 17.7484 5.43506 17.4646C6.12029 17.1807 6.70596 16.7001 7.11801 16.0834C7.53007 15.4667 7.75 14.7417 7.75 14C7.75 13.0054 7.35491 12.0516 6.65165 11.3484C5.94839 10.6451 4.99456 10.25 4 10.25ZM4 16.25C3.55499 16.25 3.11998 16.118 2.74997 15.8708C2.37996 15.6236 2.09157 15.2722 1.92127 14.861C1.75098 14.4499 1.70642 13.9975 1.79323 13.561C1.88005 13.1246 2.09434 12.7237 2.40901 12.409C2.72368 12.0943 3.12459 11.8801 3.56105 11.7932C3.99751 11.7064 4.44991 11.751 4.86104 11.9213C5.27217 12.0916 5.62357 12.38 5.87081 12.75C6.11804 13.12 6.25 13.555 6.25 14C6.25 14.5967 6.01295 15.169 5.59099 15.591C5.16903 16.0129 4.59674 16.25 4 16.25ZM4 7.75C4.74168 7.75 5.46671 7.53007 6.08339 7.11801C6.70008 6.70596 7.18072 6.12029 7.46455 5.43506C7.74838 4.74984 7.82264 3.99584 7.67795 3.26841C7.53325 2.54098 7.1761 1.8728 6.65165 1.34835C6.12721 0.823904 5.45902 0.466751 4.73159 0.322057C4.00416 0.177362 3.25016 0.251625 2.56494 0.535453C1.87972 0.819282 1.29405 1.29993 0.88199 1.91661C0.469935 2.5333 0.250002 3.25832 0.250002 4C0.250002 4.99456 0.64509 5.94839 1.34835 6.65165C2.05161 7.35491 3.00544 7.75 4 7.75ZM4 1.75C4.44501 1.75 4.88002 1.88196 5.25003 2.1292C5.62004 2.37643 5.90843 2.72783 6.07873 3.13896C6.24903 3.5501 6.29358 4.0025 6.20677 4.43896C6.11995 4.87541 5.90566 5.27632 5.59099 5.59099C5.27632 5.90566 4.87541 6.11995 4.43896 6.20677C4.0025 6.29359 3.5501 6.24903 3.13896 6.07873C2.72783 5.90843 2.37643 5.62005 2.1292 5.25003C1.88196 4.88002 1.75 4.44501 1.75 4C1.75 3.40326 1.98706 2.83097 2.40901 2.40901C2.83097 1.98705 3.40326 1.75 4 1.75ZM4 20.25C3.25832 20.25 2.5333 20.4699 1.91661 20.882C1.29993 21.294 0.819282 21.8797 0.535454 22.5649C0.251625 23.2502 0.177362 24.0042 0.322057 24.7316C0.466751 25.459 0.823905 26.1272 1.34835 26.6517C1.8728 27.1761 2.54098 27.5333 3.26841 27.6779C3.99584 27.8226 4.74984 27.7484 5.43506 27.4646C6.12029 27.1807 6.70596 26.7001 7.11801 26.0834C7.53007 25.4667 7.75 24.7417 7.75 24C7.75 23.0054 7.35491 22.0516 6.65165 21.3484C5.94839 20.6451 4.99456 20.25 4 20.25ZM4 26.25C3.55499 26.25 3.11998 26.118 2.74997 25.8708C2.37996 25.6236 2.09157 25.2722 1.92127 24.861C1.75098 24.4499 1.70642 23.9975 1.79323 23.561C1.88005 23.1246 2.09434 22.7237 2.40901 22.409C2.72368 22.0943 3.12459 21.8801 3.56105 21.7932C3.99751 21.7064 4.44991 21.751 4.86104 21.9213C5.27217 22.0916 5.62357 22.38 5.87081 22.75C6.11804 23.12 6.25 23.555 6.25 24C6.25 24.5967 6.01295 25.169 5.59099 25.591C5.16903 26.0129 4.59674 26.25 4 26.25Z"
        fill={color || "#171717"}
      />
    </svg>
  );
};

export default SettingIcon;