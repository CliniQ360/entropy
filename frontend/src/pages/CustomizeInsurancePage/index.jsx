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

const CustomizeInsurancePage = () => {
  const selectedOffer = JSON.parse(sessionStorage.getItem("selected_offer"));
  const final_selected_premium_amt = sessionStorage.getItem(
    "final_selected_premium_amt"
  );
  const [insuranceOfferDetails, setInsuranceOfferDetails] =
    useState(selectedOffer);
  const [finalPrice, setFinalPrice] = useState(
    parseInt(final_selected_premium_amt)
  );

  const initialSelectedAddOns = sessionStorage.getItem("selectedAddOns")
    ? sessionStorage.getItem("selectedAddOns").split(",")
    : [];
  const [selectedAddOns, setSelectedAddOns] = useState(initialSelectedAddOns);

  const handleToggleAddOn = (addOnId) => {
    setSelectedAddOns((prevSelected) => {
      const updatedSelected = prevSelected.includes(addOnId)
        ? prevSelected.filter((id) => id !== addOnId)
        : [...prevSelected, addOnId];

      sessionStorage.setItem("selectedAddOns", updatedSelected.join(","));
      return updatedSelected;
    });
  };

  useEffect(() => {
    const addOnsPrice = selectedAddOns.reduce((total, addOnId) => {
      const addOn = insuranceOfferDetails.offer_details.available_add_ons.find(
        (item) => item.id === addOnId
      );
      return addOn ? total + parseInt(addOn.price.value) : total;
    }, 0);
    setFinalPrice(parseInt(final_selected_premium_amt) + addOnsPrice);
  }, [selectedAddOns]);

  useEffect(() => {
    console.log("Selected Add-Ons:", selectedAddOns);
    console.log("Final Price:", finalPrice);
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
          Confirm Your Insurance Policy
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
                    backgroundImage: `url(${insuranceOfferDetails.provider_details.images[0].url})`,
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
                  {insuranceOfferDetails.provider_details.name}
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
                  {insuranceOfferDetails.offer_details.policy_name}
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
                  {insuranceOfferDetails.offer_details.offer_item_id}
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
                  {insuranceOfferDetails?.offer_details?.premium_amount?.value}
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
                  {insuranceOfferDetails?.offer_details?.COVERAGE_AMOUNT}
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
                  {insuranceOfferDetails?.offer_details?.CO_PAYMENT}
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
                  {insuranceOfferDetails?.offer_details?.MATERNITY_COVERAGE}
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
                  Rs {insuranceOfferDetails?.offer_details?.CONVIENCE_FEE}
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
                  Rs {insuranceOfferDetails?.offer_details?.PROCESSING_FEE}
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
                  Rs {insuranceOfferDetails?.offer_details?.TAX}
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
          {insuranceOfferDetails.offer_details.available_add_ons.map(
            (addOn) => (
              <Grid item xs={5.8} sm={5.8} key={addOn.id}>
                <AddOnCard
                  selected={selectedAddOns.includes(addOn.id)}
                  onClick={() => handleToggleAddOn(addOn.id)}
                  sx={{
                    cursor: "pointer",
                    backgroundColor: selectedAddOns.includes(addOn.id)
                      ? "#d9ffd9"
                      : "white",
                    color: selectedAddOns.includes(addOn.id)
                      ? "white"
                      : "black",
                  }}
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
            )
          )}
        </Grid>
      </CustomizeOfferAccordianContainer>
    </CustomizeOfferPageWrapper>
  );
};

export default CustomizeInsurancePage;
