import {
  Box,
  Divider,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  styled,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import React, { useRef, useState } from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const AvailableOffersContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  [theme.breakpoints.down("sm")]: {
    maxWidth: "100%",
  },
}));

const DocumentHeaderSection = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: theme.spacing(4),
  gap: theme.spacing(4),
}));

const FormContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "95%",
}));

const SelectBoxContainer = styled("div")(({ theme }) => ({
  border: "1px solid #9E9E9E",
  padding: theme.spacing(4),
  borderRadius: "8px",
  width: 320,
  backgroundColor: "#FFFFFF",
  flex: "0 0 auto",
}));

const SelectBoxHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
}));

const SelectBoxDetails = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
}));

const DetailRow = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
}));

const ScrollContainer = styled("div")(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(2),
  overflowX: "auto",
  scrollBehavior: "smooth",
  maxWidth: "100%",
  boxSizing: "border-box",
  "&::-webkit-scrollbar": {
    display: "none",
  },
}));

const ButtonContainer = styled(IconButton)(({ theme, disabled }) => ({
  height: "30px",
  width: "30px",
  justifyContent: "center",
  border: disabled ? "2px solid #00000042" : "2px solid #000000",
  alignItems: "center",
  padding: theme.spacing(2),
  cursor: disabled ? "not-allowed" : "pointer",
}));

const AvailableOffersPage = () => {
  const [offers, setOffers] = useState([
    {
      offer_details: {
        offer_item_id: "d9eb81e2-96b5-477f-98dc-8518ad60d72e",
        item_price: "81132.23",
        INTEREST_RATE: "26.99%",
        TERM: "24 Months",
        INSTALLMENT_AMOUNT: "3262.51 INR",
      },
      provider_details: {
        name: "DMI FINANCE PRIVATE LIMITED",
        images: [
          {
            url: "https://refo-static-public.s3.ap-south-1.amazonaws.com/dmi/dmi-sm.png",
          },
        ],
      },
    },
    {
      offer_details: {
        offer_item_id: "d9eb81e2-96b5-477f-98dc-8518ad60d72f",
        item_price: "81132.23",
        INTEREST_RATE: "26.99%",
        TERM: "24 Months",
        INSTALLMENT_AMOUNT: "3262.51 INR",
      },
      provider_details: {
        name: "DMI FINANCE PRIVATE LIMITED",
        images: [
          {
            url: "https://refo-static-public.s3.ap-south-1.amazonaws.com/dmi/dmi-sm.png",
          },
        ],
      },
    },
    {
      offer_details: {
        offer_item_id: "d9eb81e2-96b5-477f-98dc-8518ad60d72g",
        item_price: "81132.23",
        INTEREST_RATE: "26.99%",
        TERM: "24 Months",
        INSTALLMENT_AMOUNT: "3262.51 INR",
      },
      provider_details: {
        name: "DMI FINANCE PRIVATE LIMITED",
        images: [
          {
            url: "https://refo-static-public.s3.ap-south-1.amazonaws.com/dmi/dmi-sm.png",
          },
        ],
      },
    },
    {
      offer_details: {
        offer_item_id: "d9eb81e2-96b5-477f-98dc-8518ad60d72h",
        item_price: "81132.23",
        INTEREST_RATE: "26.99%",
        TERM: "24 Months",
        INSTALLMENT_AMOUNT: "3262.51 INR",
      },
      provider_details: {
        name: "Aditya Birla",
        images: [
          {
            url: "https://refo-static-public.s3.ap-south-1.amazonaws.com/dmi/dmi-sm.png",
          },
        ],
      },
    },
  ]);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedOfferId, setSelectedOfferId] = useState(null); // Track selected offer
  const scrollRef = useRef(null);

  const filteredLoanOffers = offers.filter((offer) =>
    offer.provider_details.name.toLowerCase().includes("")
  );

  const handleInputChange = (event, offer) => {
    event.preventDefault();
    setSelectedOfferId(offer.offer_details.offer_item_id); // Set the selected offer's ID
    console.log(offer);
  };

  const scrollTo = (index) => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft =
        scrollRef.current.children[index].offsetLeft;
      setCurrentSlide(index);
    }
  };

  const next = () => {
    if (currentSlide < filteredLoanOffers.length - 1) {
      scrollTo(currentSlide + 1);
    }
  };

  const previous = () => {
    if (currentSlide > 0) {
      scrollTo(currentSlide - 1);
    }
  };

  const formatNumber = (num) => {
    const parsedNum = parseFloat(num);
    return parsedNum % 1 === 0 ? parsedNum.toFixed(0) : parsedNum.toFixed(2);
  };

  return (
    <>
      <AvailableOffersContainer>
        <DocumentHeaderSection>
          <Typography
            sx={{ fontSize: "1.4rem", fontWeight: 700, textAlign: "left" }}
          >
            Available Offers
          </Typography>
          <Typography
            sx={{ fontSize: "1rem", color: "#535353", textAlign: "left" }}
          >
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry
          </Typography>
        </DocumentHeaderSection>
        <FormContainer>
          <FormControl component="fieldset">
            <RadioGroup>
              {filteredLoanOffers && filteredLoanOffers.length > 0 ? (
                <>
                  <ScrollContainer ref={scrollRef}>
                    {filteredLoanOffers.map((offer, index) => (
                      <SelectBoxContainer key={index}>
                        <SelectBoxHeader>
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            {offer.provider_details?.images?.[0]?.url && (
                              <img
                                src={offer.provider_details.images[0].url}
                                style={{ height: "24px", marginRight: "10px" }}
                                alt={"img"}
                              />
                            )}
                            <Typography
                              fontFamily={"Plus Jakarta Sans Bold"}
                              fontSize={16}
                              sx={{ textTransform: "initial" }}
                            >
                              {offer.provider_details.name}
                            </Typography>
                          </div>
                          <div>
                            <FormControlLabel
                              value={offer.offer_details.offer_item_id}
                              control={
                                <Radio
                                  checked={
                                    selectedOfferId ===
                                    offer.offer_details.offer_item_id
                                  }
                                />
                              }
                              onChange={(e) => handleInputChange(e, offer)}
                              label=""
                              style={{ margin: 0 }}
                            />
                          </div>
                        </SelectBoxHeader>
                        <Divider
                          style={{ width: "100%", margin: "16px 0px" }}
                        />
                        <SelectBoxDetails>
                          <DetailRow>
                            <Typography
                              fontFamily={"Source Sans Pro"}
                              color={"#5A5A5A"}
                              fontSize={16}
                            >
                              Loan Amount
                            </Typography>
                            <Typography
                              fontFamily={"Source Sans Pro"}
                              fontSize={16}
                            >
                              Rs.{" "}
                              {formatNumber(offer.offer_details.item_price) ||
                                ""}
                            </Typography>
                          </DetailRow>
                          <DetailRow>
                            <Typography
                              fontFamily={"Source Sans Pro"}
                              color={"#5A5A5A"}
                              fontSize={16}
                            >
                              Interest Rate
                            </Typography>
                            <Typography
                              fontFamily={"Source Sans Pro"}
                              fontSize={16}
                            >
                              {formatNumber(
                                offer.offer_details.INTEREST_RATE
                              ) || ""}{" "}
                              %
                            </Typography>
                          </DetailRow>
                          <DetailRow>
                            <Typography
                              fontFamily={"Source Sans Pro"}
                              color={"#5A5A5A"}
                              fontSize={16}
                            >
                              Tenure
                            </Typography>
                            <Typography
                              fontFamily={"Source Sans Pro"}
                              fontSize={16}
                            >
                              {formatNumber(offer.offer_details.TERM) || ""}{" "}
                              Months
                            </Typography>
                          </DetailRow>
                          <DetailRow>
                            <Typography
                              fontFamily={"Source Sans Pro"}
                              color={"#5A5A5A"}
                              fontSize={16}
                            >
                              Installment Amount
                            </Typography>
                            <Typography
                              fontFamily={"Source Sans Pro"}
                              fontSize={16}
                            >
                              Rs.{" "}
                              {formatNumber(
                                offer.offer_details.INSTALLMENT_AMOUNT
                              ) || ""}{" "}
                              /Month
                            </Typography>
                          </DetailRow>
                        </SelectBoxDetails>
                        <Divider style={{ width: "100%", margin: "16px 0" }} />
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-evenly",
                            width: "100%",
                          }}
                        >
                          <Button
                            variant="text"
                            fontFamily={"Source Sans Pro SemiBold"}
                            fontSize={20}
                            sx={{ textTransform: "initial" }}
                          >
                            {" "}
                            View Details{" "}
                          </Button>
                          <Divider orientation="vertical" flexItem />

                          <Button
                            variant="text"
                            fontFamily={"Source Sans Pro SemiBold"}
                            fontSize={20}
                            sx={{ textTransform: "initial" }}
                          >
                            Customize
                          </Button>
                        </Box>
                      </SelectBoxContainer>
                    ))}
                  </ScrollContainer>
                  <Stack
                    justifyContent={"center"}
                    alignItems={"center"}
                    flexDirection={"row"}
                    gap={2}
                    m={4}
                  >
                    <ButtonContainer
                      disabled={currentSlide === 0}
                      onClick={previous}
                    >
                      <KeyboardArrowLeftIcon />
                    </ButtonContainer>

                    <Typography variant="body2" color="textSecondary">
                      {currentSlide + 1} / {filteredLoanOffers.length}
                    </Typography>

                    <ButtonContainer
                      disabled={currentSlide >= filteredLoanOffers.length - 1}
                      onClick={next}
                    >
                      <ChevronRightIcon />
                    </ButtonContainer>
                  </Stack>
                </>
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h6" color="textSecondary">
                    Please try reloading the page by clicking the reload button.
                  </Typography>
                </Box>
              )}
            </RadioGroup>
          </FormControl>
        </FormContainer>
      </AvailableOffersContainer>
    </>
  );
};

export default AvailableOffersPage;
