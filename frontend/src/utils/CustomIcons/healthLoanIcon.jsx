import React from "react";

const HealthLoanIcon = ({ color, stroke, width, height }) => {
  return (
    <svg
      width={width || "30"}
      height={height || "24"}
      viewBox="0 0 30 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M28.64 14.8312C28.2976 14.5675 27.8989 14.3865 27.475 14.3024C27.051 14.2183 26.6134 14.2333 26.1962 14.3463L20.5412 15.6462C20.7266 15.1544 20.79 14.625 20.7258 14.1033C20.6616 13.5816 20.4719 13.0833 20.1729 12.651C19.8738 12.2188 19.4744 11.8655 19.0089 11.6215C18.5434 11.3774 18.0256 11.25 17.5 11.25H11.2425C10.7499 11.2486 10.2618 11.345 9.80673 11.5336C9.35162 11.7222 8.93848 11.9993 8.59125 12.3488L5.69 15.25H2C1.53587 15.25 1.09075 15.4344 0.762563 15.7626C0.434374 16.0908 0.25 16.5359 0.25 17V22C0.25 22.4641 0.434374 22.9093 0.762563 23.2374C1.09075 23.5656 1.53587 23.75 2 23.75H15C15.0615 23.75 15.1228 23.7425 15.1825 23.7275L23.1825 21.7275C23.2204 21.7175 23.2575 21.705 23.2938 21.69L28.1462 19.625L28.1875 19.6063C28.6165 19.392 28.984 19.072 29.2552 18.6765C29.5264 18.281 29.6925 17.823 29.7377 17.3455C29.783 16.8681 29.706 16.387 29.5139 15.9476C29.3219 15.5081 29.0211 15.1248 28.64 14.8337V14.8312ZM1.75 22V17C1.75 16.9337 1.77634 16.8701 1.82322 16.8232C1.87011 16.7763 1.9337 16.75 2 16.75H5.25V22.25H2C1.9337 22.25 1.87011 22.2237 1.82322 22.1768C1.77634 22.1299 1.75 22.0663 1.75 22ZM27.535 18.25L22.76 20.2838L14.9075 22.25H6.75V16.3113L9.65125 13.4088C9.85974 13.1992 10.1077 13.033 10.3809 12.92C10.654 12.8069 10.9469 12.7491 11.2425 12.75H17.5C17.9641 12.75 18.4092 12.9344 18.7374 13.2626C19.0656 13.5908 19.25 14.0359 19.25 14.5C19.25 14.9641 19.0656 15.4092 18.7374 15.7374C18.4092 16.0656 17.9641 16.25 17.5 16.25H14C13.8011 16.25 13.6103 16.329 13.4697 16.4697C13.329 16.6103 13.25 16.8011 13.25 17C13.25 17.1989 13.329 17.3897 13.4697 17.5303C13.6103 17.671 13.8011 17.75 14 17.75H18C18.0564 17.7501 18.1125 17.7438 18.1675 17.7313L26.5425 15.805L26.5725 15.7975C26.8877 15.7116 27.2236 15.7451 27.5156 15.8917C27.8075 16.0383 28.0351 16.2876 28.1544 16.5918C28.2738 16.8959 28.2766 17.2334 28.1622 17.5395C28.0479 17.8456 27.8245 18.0986 27.535 18.25ZM20.5 8.75C20.8059 8.74987 21.111 8.71719 21.41 8.6525C21.6349 9.45131 22.0888 10.1668 22.7157 10.7107C23.3425 11.2545 24.1148 11.603 24.9374 11.713C25.7599 11.823 26.5967 11.6899 27.3444 11.3299C28.0922 10.9699 28.7182 10.3989 29.1452 9.68727C29.5722 8.97567 29.7815 8.15462 29.7473 7.32544C29.7131 6.49627 29.4369 5.69524 28.9528 5.02121C28.4686 4.34717 27.7978 3.82963 27.0229 3.53242C26.2481 3.23522 25.4032 3.17137 24.5925 3.34875C24.3783 2.58739 23.9558 1.90093 23.3727 1.36658C22.7895 0.832236 22.0689 0.471214 21.2917 0.324133C20.5146 0.177052 19.7118 0.249747 18.9738 0.53404C18.2357 0.818332 17.5916 1.30294 17.1139 1.93335C16.6363 2.56376 16.344 3.31495 16.27 4.10241C16.196 4.88987 16.3433 5.68235 16.6951 6.3907C17.047 7.09905 17.5895 7.69517 18.2617 8.11197C18.9339 8.52878 19.7091 8.74974 20.5 8.75ZM28.25 7.5C28.25 8.0439 28.0887 8.57558 27.7865 9.02782C27.4844 9.48005 27.0549 9.83253 26.5524 10.0407C26.0499 10.2488 25.4969 10.3033 24.9635 10.1972C24.4301 10.0911 23.94 9.82914 23.5555 9.44454C23.1709 9.05995 22.9089 8.56995 22.8028 8.0365C22.6967 7.50305 22.7512 6.95012 22.9593 6.44762C23.1675 5.94512 23.5199 5.51563 23.9722 5.21346C24.4244 4.91129 24.9561 4.75 25.5 4.75C26.2293 4.75 26.9288 5.03973 27.4445 5.55546C27.9603 6.07118 28.25 6.77066 28.25 7.5ZM20.5 1.75C21.1313 1.74925 21.7436 1.96635 22.2334 2.36464C22.7233 2.76294 23.0607 3.31804 23.1887 3.93625C22.6451 4.28877 22.1892 4.76093 21.856 5.31664C21.5228 5.87234 21.3211 6.49688 21.2662 7.1425C20.8882 7.25142 20.4912 7.27796 20.102 7.22033C19.7129 7.1627 19.3406 7.02224 19.0104 6.80843C18.6801 6.59462 18.3996 6.31245 18.1877 5.98096C17.9759 5.64946 17.8376 5.27637 17.7822 4.88687C17.7269 4.49737 17.7558 4.10053 17.8669 3.72314C17.978 3.34575 18.1688 2.9966 18.4265 2.69926C18.6841 2.40192 19.0025 2.16332 19.3602 1.99956C19.7179 1.8358 20.1066 1.7507 20.5 1.75Z"
        fill={color || "#0054BA"}
      />
    </svg>
  );
};

export default HealthLoanIcon;