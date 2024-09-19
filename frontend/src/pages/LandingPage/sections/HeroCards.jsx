import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {
  Stack,
  Grid,
  useMediaQuery,
  useTheme,
  Typography,
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
} from "@mui/material";
import bgBeehive from "../../../assets/bg/sidebar-login.png";
import { useDispatch } from "react-redux";
import { contactUs } from "./landingPage.slice";

const HeroCards = () => {
  const [isApply, setIsApply] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [leadCategory, setLeadCategory] = useState("");
  const [pathName, setPathName] = useState("");
  const [autoPlay, setAutoPlay] = useState(true);

  const dispatch = useDispatch();

  const cardData = [
    // {
    //   title: "Health Insurance",
    //   content:
    //     "Comprehensive health insurance plans to cover your medical expenses.",
    //   button: (
    //     <Button
    //       variant="contained"
    //       sx={{ color: "#1976d2", backgroundColor: "white" }}
    //       onClick={() => {
    //         setIsApply(true);
    //         setLeadCategory("ONDC");
    //         setPathName("in");
    //         setAutoPlay(false);
    //       }}
    //     >
    //       Buy Health Insurance
    //     </Button>
    //   ),
    // },
    {
      title: "Health Loan",
      content:
        "Affordable health loans to help you manage your healthcare costs.",
      button: (
        <Button
          variant="contained"
          sx={{ color: "#1976d2", backgroundColor: "white" }}
          onClick={() => {
            setIsApply(true);
            setPathName("ln");
            setLeadCategory("ONDC");
            setAutoPlay(false);
          }}
        >
          Apply for Loan
        </Button>
      ),
    },
    {
      title: "CliniQ Intelligence",
      content: "Advanced clinical intelligence to improve healthcare outcomes.",
      button: (
        <Button
          variant="contained"
          sx={{ color: "#1976d2", backgroundColor: "white" }}
          onClick={() => {
            setIsApply(true);
            setLeadCategory("HIMS");
            setPathName("ci");
            setAutoPlay(false);
          }}
        >
          SignUp
        </Button>
      ),
    },
  ];

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  const theme = useTheme();
  const isMediumUp = useMediaQuery(theme.breakpoints.up("md"));

  const handleNumber = (event) => {
    const { value } = event.target;
    setMobileNumber(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pathName === "in") {
      window.open("https://fin.cliniq360.com/", "_blank");
    } else if (pathName === "ln") {
      window.open("https://fin.cliniq360.com/loan", "_blank");
    } else if (pathName === "ci") {
      window.open("https://doc.cliniq360.com/", "_blank");
    } else {
      console.log("error while redirecting");
    }
    const payload = {
      mobile_number: mobileNumber,
      lead_category: leadCategory,
    };
    dispatch(contactUs(payload)).then((res) => {
      console.log(res?.payload);
      setIsApply(false);
      setAutoPlay(true);
      setLeadCategory("");
      setMobileNumber("");
      setPathName("");
    });
  };

  useEffect(() => {
    const style = document.createElement("style");
    style.type = "text/css";
    document.head.appendChild(style);

    const updateDotColor = () => {
      if (window.innerWidth <= 900) {
        style.innerHTML = `.dot-hero-card .react-multi-carousel-dot--active button { background-color: white !important; border: white !important; }`;
      } else {
        style.innerHTML = `.dot-hero-card .react-multi-carousel-dot--active button { background-color: #1976d2 !important; }`;
      }
    };

    updateDotColor(); // Set initial dot color
    window.addEventListener("resize", updateDotColor);

    return () => {
      document.head.removeChild(style);
      window.removeEventListener("resize", updateDotColor);
    };
  }, []);

  return (
    <Stack
      direction={isMediumUp ? "row" : "column"}
      sx={{
        backgroundColor: "white",
        width: { md: 500, sm: "100%", lg: 600 },
      }}
      mt={8}
      mx={2}
    >
      <Grid container spacing={2}>
        <Carousel
          additionalTransfrom={0}
          arrows={false}
          autoPlay={autoPlay}
          autoPlaySpeed={5000}
          centerMode={false}
          className=""
          containerClass="container"
          dotListClass="dot-hero-card"
          draggable
          focusOnSelect={false}
          infinite
          itemClass=""
          keyBoardControl
          minimumTouchDrag={80}
          pauseOnHover
          renderArrowsWhenDisabled={false}
          renderButtonGroupOutside={false}
          renderDotsOutside={false}
          responsive={{
            desktop: {
              breakpoint: {
                max: 3000,
                min: 1024,
              },
              items: 1,
            },
            mobile: {
              breakpoint: {
                max: 464,
                min: 0,
              },
              items: 1,
            },
            tablet: {
              breakpoint: {
                max: 1024,
                min: 464,
              },
              items: 1,
            },
          }}
          rewind={false}
          rewindWithAnimation={false}
          rtl={false}
          shouldResetAutoplay
          showDots
          sliderClass=""
          slidesToSlide={1}
          swipeable
          afterChange={() => {
            setIsApply(false);
            setLeadCategory("");
            setMobileNumber("");
            setPathName("");
          }}
        >
          {cardData.map((card, index) => (
            <Box key={index}>
              <Card
                sx={{
                  height: 300,
                  margin: "auto",
                  borderRadius: 2,
                  boxShadow: 3,
                  backgroundImage: `url(${bgBeehive})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  padding: 2,
                }}
              >
                <CardContent>
                  <Box sx={{ height: 50 }}>
                    <Typography
                      fontSize={{ md: 30, sm: 20, xs: 24 }}
                      color="white"
                      fontFamily="poppins"
                      fontWeight="700"
                    >
                      {card.title}
                    </Typography>
                  </Box>
                  <Box mt={3}>
                    <Typography
                      fontSize={"1.3rem"}
                      color="white"
                      fontWeight={550}
                    >
                      {card.content}
                    </Typography>
                  </Box>
                </CardContent>

                {isApply ? (
                  <CardActions>
                    <form onSubmit={handleSubmit}>
                      <Stack flexDirection={"row"}>
                        <TextField
                          placeholder="Enter your mobile number"
                          fullWidth
                          name="mobile_number"
                          value={mobileNumber}
                          onChange={handleNumber}
                          required
                          InputProps={{
                            sx: {
                              color: "black", // Text color needs to be dark to be visible on white background
                              fontWeight: 600,
                              backgroundColor: "white", // Set background color to white
                              "& .MuiOutlinedInput-root": {
                                "& fieldset": {
                                  borderColor: "white", // default border color
                                },
                                "&:hover fieldset": {
                                  borderColor: "white", // border color on hover
                                },
                                "&.Mui-focused fieldset": {
                                  borderColor: "white", // border color when focused
                                },
                              },
                            },
                          }}
                          InputLabelProps={{
                            sx: {
                              color: "white", // label color
                              "&.Mui-focused": {
                                color: "white", // label color when focused
                              },
                            },
                          }}
                        />
                        <Button
                          variant="contained"
                          sx={{
                            color: "#1976d2",
                            backgroundColor: "white",
                            marginLeft: 2,
                            width: 150,
                          }}
                          type="submit"
                        >
                          <b style={{ fontSize: "17px" }}> Submit</b>
                        </Button>
                      </Stack>
                    </form>
                  </CardActions>
                ) : (
                  <CardActions>{card.button}</CardActions>
                )}
              </Card>
            </Box>
          ))}
        </Carousel>
      </Grid>
    </Stack>
  );
};

export default HeroCards;
