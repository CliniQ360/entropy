import React from "react";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { IconButton, styled } from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import BackupTableIcon from "@mui/icons-material/BackupTable";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 3,
  width: "70%",
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.mode === "dark"
        ? theme.palette.grey[800]
        : theme.palette.grey[300],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "dark" ? "#308fe8" : "#1a90ff",
  },
}));

const ProgressBarWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: theme.spacing(2),
}));

const CustomNavbar = ({ progressValue }) => {
  return (
    <ProgressBarWrapper>
      <IconButton>
        <KeyboardArrowLeftIcon sx={{ fontSize: "2.2rem", color: "black" }} />
      </IconButton>
      {/* Adjusted value to 40 for better visibility */}
      <BorderLinearProgress variant="determinate" value={40} />
      <IconButton>
        <BackupTableIcon sx={{ fontSize: "2rem", color: "#0054BA" }} />
      </IconButton>
    </ProgressBarWrapper>
  );
};

export default CustomNavbar;
