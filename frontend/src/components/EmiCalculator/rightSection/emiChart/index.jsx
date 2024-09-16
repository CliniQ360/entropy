import { Typography } from "@mui/material";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#314467",
      secondary: "#9f9f9f",
    },
    text: {
      primary: "#314467",
      secondary: "#9f9f9f",
    },
  },
  typography: {
    fontFamily: "poppins, sans-serif",
  },
});

ChartJS.register(ArcElement, Tooltip, Legend);

function EmiChart({ principal, interestPayable }) {
  const data = {
    labels: ["Principal Amount", "Interest Payable"],
    datasets: [
      {
        data: [principal, interestPayable],
        backgroundColor: ["rgba(255, 165, 0, 1)", "rgba(124, 181, 236, 1)"],
        borderColor: ["rgba(255, 165, 0, 1)", "rgba(124, 181, 236, 1)"],
      },
    ],

    updateMode: "show",
  };

  return (
    <div
      style={{
        width: "270px",
        textAlign: "center",
        margin: "0 auto",
        position: "relative",
      }}
    >
      <Doughnut
        options={{
          cutout: 90,
        }}
        data={data}
      />
      <Typography
        color={theme.palette.text.primary}
        style={{
          position: "absolute",
          top: "33%",
          left: "50%",
          width: "100%",
          zIndex: "-1",
          transform: "translate(-50%,50%)",
        }}
      >
        Total Amount <br />
        (Principal + Interest) <br />
        {principal + interestPayable}
      </Typography>
    </div>
  );
}

export default EmiChart;
