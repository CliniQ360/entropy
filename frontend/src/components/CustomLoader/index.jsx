import React from "react";
import Backdrop from "@mui/material/Backdrop";
import { PropagateLoader } from "react-spinners";
import LoadingBar from "react-top-loading-bar";

const CustomLoader = ({ open, onClose }) => {
  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClose={onClose}
      >
        <PropagateLoader color="#F8F8F8" />
      </Backdrop>
    </div>
  );
};

export default CustomLoader;
