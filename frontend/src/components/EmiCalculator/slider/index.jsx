import * as React from "react";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import MuiInput from "@mui/material/Input";
import "./slider.css";
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

const Input = styled(MuiInput)`
  width: 42px;
`;

export default function InputSlider({
  step,
  dispatch,
  title,
  min,
  max,
  minLabel,
  maxLabel,
  type,
  value,
}) {
  const [val, setVal] = React.useState(value);

  const handleSliderChange = (event, newValue) => {
    if (event.target.value >= min) {
      dispatch({ type, payload: Number(newValue) });
      setVal(Number(event.target.value));
    }
  };

  const handleInputChange = (event) => {
    if (event.target.value >= min && event.target.value <= max) {
      dispatch({
        type,
        payload: event.target.value === "" ? "" : Number(event.target.value),
      });
      setVal(event.target.value === "" ? "" : Number(event.target.value));
    }
  };

  return (
    <div className="slider-wrapper">
      <Typography color={theme.palette.text.secondary} id="input-slider">
        {title}
      </Typography>
      <div className="slider-group">
        <Slider
          value={typeof value === "number" ? val : 1}
          onChange={handleSliderChange}
          aria-labelledby="input-slider"
          max={max}
          step={step}
          size="medium"
          marks={[
            {
              value: min,
              label: minLabel,
            },
            {
              value: max,
              label: maxLabel,
            },
          ]}
        />
        <Input
          value={val}
          onChange={handleInputChange}
          style={{ width: "120px" }}
          inputProps={{
            step,
            min,
            max,
            type: "number",
            "aria-labelledby": "input-slider",
          }}
        />
      </div>
    </div>
  );
}
