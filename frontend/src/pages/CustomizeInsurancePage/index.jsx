import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Card,
  CardContent,
  Checkbox,
  Grid,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const CustomizeOfferPageWrapper = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(4),
}));

const CustomizeOfferAccordianContainer = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(1),
}));

const CustomAccordian = styled(Accordion)(({ theme }) => ({
  border: "1.2px solid #D2D2D2",
  boxShadow: "none",
  borderRadius: "10px",
  marginBottom: "10px",
  marginTop: "20px",
}));

const LoanDetailsWrapper = styled(Grid)(({ theme }) => ({
  gap: theme.spacing(2),
  padding: "10px",
}));

const LoanDetailsItem = styled(Grid)(({ theme }) => ({
  gap: theme.spacing(2),
}));

const AddOnCard = styled(Card)(({ theme, selected }) => ({
  border: `1px solid ${selected ? "#4caf50" : "#D2D2D2"}`,
  padding: theme.spacing(2),
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  boxShadow: "none",
  backgroundColor: `${selected ? "#4caf5029" : "#FFFFFF"}`,
  transition: "background-color 0.3s ease, border-color 0.3s ease",
}));

const dummyData = [
  {
    offer_details: {
      offer_item_id: "M1730961691644",
      premium_amount: {
        currency: "INR",
        value: "20000", //
      },
      available_add_ons: [
        {
          id: "A1",
          quantity: {
            available: {
              count: 1,
            },
          },
          descriptor: {
            name: "No Claim Bonus",
            code: "NO_CLAIM_BONUS",
          },
          price: {
            value: "100",
            currency: "INR",
          },
        },
        {
          id: "A2",
          quantity: {
            available: {
              count: 1,
            },
          },
          descriptor: {
            name: "Daycare Cover",
            code: "DAYCARE_COVER",
          },
          price: {
            value: "200",
            currency: "INR",
          },
        },
        {
          id: "A3",
          quantity: {
            available: {
              count: 1,
            },
          },
          descriptor: {
            name: "Daily Cash Allowance",
            code: "DAILY_CASH_ALLOWANCE",
          },
          price: {
            value: "1000",
            currency: "INR",
          },
        },
        {
          id: "A4",
          quantity: {
            available: {
              count: 1,
            },
          },
          descriptor: {
            name: "Domicialiary Expenses",
            code: "DOMICILIARY_EXPENSES",
          },
          price: {
            value: "400",
            currency: "INR",
          },
        },
        {
          id: "A5",
          quantity: {
            available: {
              count: 1,
            },
          },
          descriptor: {
            name: "Health Check-ups",
            code: "HEALTH_CHECK_UPS",
          },
          price: {
            value: "100",
            currency: "INR",
          },
        },
      ],
      selected_add_ons: {},
      policy_name: "Health Gain Plus Individual",
      error_details: {
        error_code: null,
        error_type: null,
        error_message: null,
      },
      COVERAGE_AMOUNT: "1000000", //
      CO_PAYMENT: "Yes",
      ROOM_RENT_CAP: "25000",
      RESTORATION_BENEFIT: "No",
      CLAIM_SETTLEMENT_RATIO: "0.8",
      PRE_HOSPITALIZATION_COVERAGE_DAYS: "2",
      POST_HOSPITALIZATION_COVERAGE_DAYS: "5",
      MATERNITY_COVERAGE: "Yes", //
      INITIAL_WAITING_PERIOD: "No",
      CASHLESS_HOSPITALS: "50",
      ROOM_CATEGORY: "Deluxe",
      BASE_PRICE: "20000",
      CONVIENCE_FEE: "50",
      PROCESSING_FEE: "10",
      TAX: "3600",
      OFFER_VALIDITY: "PT15D",
    },
    provider_details: {
      images: [
        {
          size_type: "sm",
          url: "https://ondc.org/assets/theme/images/ondc_registered_logo.svg?v=399788fda7",
        },
      ],
      long_desc: "ONDC Insurance Ltd",
      name: "ONDC Insurance Ltd",
      short_desc: "ONDC Insurance Ltd",
    },
    quote_details: null,
    payment_details: [],
  },
];

const CustomizeInsurancePage = () => {
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [finalPrice, setFinalPrice] = useState(
    parseInt(dummyData[0].offer_details.premium_amount.value)
  );

  const handleToggleAddOn = (addOnId) => {
    setSelectedAddOns((prevSelected) =>
      prevSelected.includes(addOnId)
        ? prevSelected.filter((id) => id !== addOnId)
        : [...prevSelected, addOnId]
    );
  };

  useEffect(() => {
    const addOnsPrice = selectedAddOns.reduce((total, addOnId) => {
      const addOn = dummyData[0].offer_details.available_add_ons.find(
        (item) => item.id === addOnId
      );
      return addOn ? total + parseInt(addOn.price.value) : total;
    }, 0);
    setFinalPrice(
      parseInt(dummyData[0].offer_details.premium_amount.value) + addOnsPrice
    );
  }, [selectedAddOns]);

  useEffect(() => {
    console.log(selectedAddOns);
    console.log(finalPrice);
  }, [finalPrice, selectedAddOns]);

  return (
    <CustomizeOfferPageWrapper>
      <CustomizeOfferAccordianContainer>
        <Typography
          fontWeight={700}
          fontSize="1.5rem"
          fontFamily="plus jakarta sans"
          color={"#1976d2"}
          mb={4}
        >
          Customize Your Insurance Policy
        </Typography>
        <Typography></Typography>
        <CustomAccordian defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
            sx={{ ml: "10px" }}
          >
            <Typography
              fontWeight={700}
              fontSize="1.2rem"
              fontFamily="plus jakarta sans"
            >
              Insurance Offer Details
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <LoanDetailsWrapper container>
              <LoanDetailsItem
                item
                xs={12}
                sm={12}
                display="flex"
                alignItems="center"
              >
                <Box
                  sx={{
                    width: "50px",
                    height: "50px",
                    backgroundImage: `url(${dummyData[0].provider_details.images[0].url})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    backgroundSize: "contain",
                  }}
                ></Box>
                <Typography
                  sx={{
                    fontSize: "1.3rem",
                    fontWeight: 700,
                    mt: 1,
                    ml: 1,
                  }}
                >
                  {dummyData[0].provider_details.name}
                </Typography>
              </LoanDetailsItem>
              <LoanDetailsItem item xs={12} sm={12}>
                <Typography sx={{ fontSize: "0.9rem", color: "#5A5A5A" }}>
                  Policy Name
                </Typography>
                <Typography
                  sx={{
                    fontSize: "1.1rem",
                    color: "#171717",
                    fontWeight: 700,
                    mt: 1,
                    mb: 1,
                  }}
                >
                  {dummyData[0].offer_details.policy_name}
                </Typography>
              </LoanDetailsItem>
              <LoanDetailsItem item xs={5.8} sm={5.8}>
                <Typography sx={{ fontSize: "0.9rem", color: "#5A5A5A" }}>
                  Order Id
                </Typography>
                <Typography
                  sx={{
                    fontSize: "1.1rem",
                    color: "#171717",
                    fontWeight: 700,
                    mt: 1,
                    mb: 1,
                  }}
                >
                  {dummyData[0].offer_details.offer_item_id}
                </Typography>
              </LoanDetailsItem>
              <LoanDetailsItem xs={5.8} sm={5.8}>
                <Typography sx={{ fontSize: "0.9rem", color: "#5A5A5A" }}>
                  Principal
                </Typography>
                <Typography
                  sx={{
                    fontSize: "1.1rem",
                    color: "#171717",
                    fontWeight: 700,
                    mt: 1,
                    mb: 1,
                  }}
                >
                  {dummyData[0]?.offer_details?.premium_amount?.value}
                </Typography>
              </LoanDetailsItem>
              <LoanDetailsItem xs={5.8} sm={5.8}>
                <Typography sx={{ fontSize: "0.9rem", color: "#5A5A5A" }}>
                  Coverage Amount
                </Typography>
                <Typography
                  sx={{
                    fontSize: "1.1rem",
                    color: "#171717",
                    fontWeight: 700,
                    mt: 1,
                    mb: 1,
                  }}
                >
                  {dummyData[0]?.offer_details?.COVERAGE_AMOUNT}
                </Typography>
              </LoanDetailsItem>
              <LoanDetailsItem xs={5.8} sm={5.8}>
                <Typography sx={{ fontSize: "0.9rem", color: "#5A5A5A" }}>
                  Cashless Hospitals
                </Typography>
                <Typography
                  sx={{
                    fontSize: "1.1rem",
                    color: "#171717",
                    fontWeight: 700,
                    mt: 1,
                    mb: 1,
                  }}
                >
                  {dummyData[0]?.offer_details?.CO_PAYMENT}
                </Typography>
              </LoanDetailsItem>
              <LoanDetailsItem xs={5.8} sm={5.8}>
                <Typography sx={{ fontSize: "0.9rem", color: "#5A5A5A" }}>
                  Maternity Coverage
                </Typography>
                <Typography
                  sx={{
                    fontSize: "1.1rem",
                    color: "#171717",
                    fontWeight: 700,
                    mt: 1,
                    mb: 1,
                  }}
                >
                  {dummyData[0]?.offer_details?.MATERNITY_COVERAGE}
                </Typography>
              </LoanDetailsItem>
              <LoanDetailsItem xs={5.8} sm={5.8}>
                <Typography sx={{ fontSize: "0.9rem", color: "#5A5A5A" }}>
                  Convinience Fee
                </Typography>
                <Typography
                  sx={{
                    fontSize: "1.1rem",
                    color: "#171717",
                    fontWeight: 700,
                    mt: 1,
                    mb: 1,
                  }}
                >
                  Rs {dummyData[0]?.offer_details?.CONVIENCE_FEE}
                </Typography>
              </LoanDetailsItem>
              <LoanDetailsItem xs={5.8} sm={5.8}>
                <Typography sx={{ fontSize: "0.9rem", color: "#5A5A5A" }}>
                  Processing Fee
                </Typography>
                <Typography
                  sx={{
                    fontSize: "1.1rem",
                    color: "#171717",
                    fontWeight: 700,
                    mt: 1,
                    mb: 1,
                  }}
                >
                  Rs {dummyData[0]?.offer_details?.PROCESSING_FEE}
                </Typography>
              </LoanDetailsItem>
              <LoanDetailsItem xs={5.8} sm={5.8}>
                <Typography sx={{ fontSize: "0.9rem", color: "#5A5A5A" }}>
                  Tax
                </Typography>
                <Typography
                  sx={{
                    fontSize: "1.1rem",
                    color: "#171717",
                    fontWeight: 700,
                    mt: 1,
                    mb: 1,
                  }}
                >
                  Rs {dummyData[0]?.offer_details?.TAX}
                </Typography>
              </LoanDetailsItem>
            </LoanDetailsWrapper>
          </AccordionDetails>
        </CustomAccordian>{" "}
        <LoanDetailsItem xs={12} sm={12}>
          <Typography sx={{ fontSize: "1.2rem", fontWeight: 700 }}>
            Final Price
          </Typography>
          <Typography
            sx={{
              fontSize: "1.1rem",
              color: "#171717",
              fontWeight: 700,
              mt: 1,
              mb: 1,
              padding: "10px",
              border: "1px solid #D2D2D2",
            }}
          >
            Rs {finalPrice}
          </Typography>
        </LoanDetailsItem>
        <Typography
          fontWeight={700}
          fontSize="1.2rem"
          fontFamily="plus jakarta sans"
          mt={3}
        >
          Select Add-Ons Here !
        </Typography>
        <Grid container spacing={3} mt={1}>
          {dummyData[0].offer_details.available_add_ons.map((addOn) => (
            <Grid item xs={5.8} sm={5.8} key={addOn.id}>
              <AddOnCard
                selected={selectedAddOns.includes(addOn.id)}
                onClick={() => handleToggleAddOn(addOn.id)}
                sx={{ cursor: "pointer" }}
              >
                <CardContent>
                  <Typography fontSize={"1rem"} fontWeight={700}>
                    {addOn.descriptor.name}
                  </Typography>
                  <Typography fontSize={"1rem"} color="text.secondary">
                    ₹{addOn.price.value}
                  </Typography>
                </CardContent>
              </AddOnCard>
            </Grid>
          ))}
        </Grid>
      </CustomizeOfferAccordianContainer>
    </CustomizeOfferPageWrapper>
  );
};

export default CustomizeInsurancePage;
