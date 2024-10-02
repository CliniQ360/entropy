import React from "react";

const MuteIcon = ({ color, stroke, width, height }) => {
  return (
    <svg
      width={width || "17"}
      height={height || "23"}
      viewBox="0 0 15 23"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.5042 20.5549C16.357 20.6887 16.1627 20.7585 15.964 20.749C15.7654 20.7395 15.5786 20.6515 15.4448 20.5043L12.5461 17.3168C11.5545 17.9561 10.4242 18.3486 9.24981 18.4615V21.4999C9.24981 21.6988 9.1708 21.8896 9.03014 22.0302C8.88949 22.1709 8.69872 22.2499 8.49981 22.2499C8.3009 22.2499 8.11014 22.1709 7.96948 22.0302C7.82883 21.8896 7.74981 21.6988 7.74981 21.4999V18.4624C5.90073 18.2742 4.18709 17.4071 2.94029 16.0287C1.69349 14.6503 1.0021 12.8585 0.999813 10.9999C0.999813 10.801 1.07883 10.6102 1.21948 10.4696C1.36013 10.3289 1.5509 10.2499 1.74981 10.2499C1.94872 10.2499 2.13949 10.3289 2.28014 10.4696C2.42079 10.6102 2.49981 10.801 2.49981 10.9999C2.50155 12.5907 3.13425 14.1158 4.25909 15.2406C5.38393 16.3655 6.90905 16.9982 8.49981 16.9999C9.56097 17.0031 10.6036 16.7221 11.5195 16.1861L10.4789 15.0424C9.79274 15.3784 9.03235 15.5342 8.26937 15.495C7.50638 15.4559 6.76592 15.2232 6.11775 14.8188C5.46958 14.4144 4.93504 13.8516 4.5645 13.1835C4.19397 12.5153 3.99963 11.7639 3.99981 10.9999V7.91458L0.444813 4.00427C0.313843 3.85664 0.246341 3.66333 0.256943 3.46626C0.267545 3.26919 0.355396 3.08424 0.501449 2.95151C0.647502 2.81878 0.839986 2.74897 1.03717 2.7572C1.23435 2.76544 1.42034 2.85107 1.55481 2.99552L16.5548 19.4955C16.6886 19.6427 16.7584 19.837 16.7489 20.0357C16.7394 20.2344 16.6514 20.4211 16.5042 20.5549ZM14.2364 14.6365C14.3387 14.6871 14.4513 14.7134 14.5654 14.7133C14.7059 14.7134 14.8436 14.6739 14.9628 14.5995C15.082 14.5251 15.1779 14.4187 15.2395 14.2924C15.7428 13.268 16.0029 12.1413 15.9998 10.9999C15.9998 10.801 15.9208 10.6102 15.7801 10.4696C15.6395 10.3289 15.4487 10.2499 15.2498 10.2499C15.0509 10.2499 14.8601 10.3289 14.7195 10.4696C14.5788 10.6102 14.4998 10.801 14.4998 10.9999C14.5026 11.9128 14.2947 12.8139 13.8923 13.6333C13.8049 13.812 13.7921 14.018 13.8566 14.2061C13.9212 14.3943 14.0577 14.549 14.2364 14.6365ZM11.6742 11.8971C11.7716 12.0043 11.8981 12.0811 12.0382 12.118C12.1784 12.1549 12.3262 12.1504 12.4638 12.1051C12.6015 12.0598 12.7231 11.9756 12.8139 11.8626C12.9046 11.7497 12.9608 11.6128 12.9754 11.4686C12.9914 11.3129 12.9995 11.1565 12.9998 10.9999V4.9999C12.9987 3.96635 12.6418 2.96469 11.9891 2.16328C11.3365 1.36186 10.4278 0.809537 9.41593 0.599127C8.40402 0.388717 7.35053 0.533048 6.4325 1.00786C5.51447 1.48268 4.78787 2.25904 4.37481 3.20646C4.31714 3.33889 4.29893 3.48515 4.32238 3.62768C4.34583 3.7702 4.40994 3.90293 4.507 4.0099L11.6742 11.8971Z"
        fill={color || "white"}
      />
    </svg>
  );
};

export default MuteIcon;