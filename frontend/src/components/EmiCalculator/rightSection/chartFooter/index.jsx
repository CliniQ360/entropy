import { Typography } from "@mui/material";
import "./chartFooter.css";
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

const ChartFooter = ({ emi, principal, interestPayable }) => {
  return (
    <div className="chartfooter-wrapper">
      <div>
        <div className="chartfooterIcon-container">
          <div className="chartfooter-icon chartfooter-icon__green"></div>
          <Typography
            color={theme.palette.text.secondary}
            component="p"
            variant="caption"
          >
            Monthly Emi
          </Typography>
        </div>
        <Typography
          color={theme.palette.text.primary}
          component="p"
          variant="body1"
        >
          &#8377;{emi}
        </Typography>
      </div>
      <div>
        <div className="chartfooterIcon-container">
          <div className="chartfooter-icon chartfooter-icon__yellow"></div>
          <Typography
            color={theme.palette.text.secondary}
            component="p"
            variant="caption"
          >
            Principal
          </Typography>
        </div>
        <Typography color={theme.palette.text.primary} variant="body1">
          &#8377;{principal}
        </Typography>
      </div>
      <div>
        <div className="chartfooterIcon-container">
          <div className="chartfooter-icon chartfooter-icon__blue"></div>
          <Typography
            color={theme.palette.text.secondary}
            component="p"
            variant="caption"
          >
            Interest paid
          </Typography>
        </div>
        <Typography color={theme.palette.text.primary} variant="body1">
          &#8377;{interestPayable}
        </Typography>
      </div>
    </div>
  );
};

export default ChartFooter;
