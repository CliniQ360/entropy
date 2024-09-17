import {
  Box,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const AvailableOffersContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(4),
  gap: theme.spacing(6),
}));

const DocumentHeaderSection = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(4),
}));

const FormContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  gap: theme.spacing(4),
}));

const SelectBoxContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  margin: theme.spacing(3),
  border: "1px solid #9E9E9E",
  padding: theme.spacing(2),
  borderRadius: "5px",
  minWidth: "350px",
  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  [theme.breakpoints.down("sm")]: {
    minWidth: 280,
    padding: theme.spacing(1),
  },
}));

const SelectBoxHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
}));

const SelectBoxDetails = styled("div")(({ theme }) => ({
  marginTop: theme.spacing(1),
}));

const DetailRow = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
  marginBottom: theme.spacing(1),
}));

const AvailableOffersPage = () => {
  const [offers, setOffers] = useState([
    {
      offer_details: {
        offer_item_id: "d9eb81e2-96b5-477f-98dc-8518ad60d72e",
        offer_row_id: 8352,
        order_id: null,
        loan_status: "DISCOVERY",
        item_price: "81132.23",
        INTEREST_RATE: "26.99%",
        TERM: "24 Months",
        INTEREST_RATE_TYPE: "FIXED",
        APPLICATION_FEE: "0.00 INR",
        FORECLOSURE_FEE: "4.00% + GST",
        INTEREST_RATE_CONVERSION_CHARGE: "0",
        DELAY_PENALTY_FEE: "3.00% + GST",
        OTHER_PENALTY_FEE: "0",
        TNC_LINK:
          "https://www.dmifinance.in/pdf/Loan-Application-Undertaking.pdf",
        ANNUAL_PERCENTAGE_RATE: "32.23%",
        REPAYMENT_FREQUENCY: "MONTHLY",
        NUMBER_OF_INSTALLMENTS_OF_REPAYMENT: "24",
        COOL_OFF_PERIOD: "P5DT0H0M",
        INSTALLMENT_AMOUNT: "3262.51 INR",
        CONSENT_HANDLER: "e85a4bbd-9387-4223-b717-f43935b37215",
        MIN_INTEREST_RATE: "20.0000%",
        MAX_INTEREST_RATE: "28.0000%",
        MIN_TENURE: "24 Months",
        MAX_TENURE: "24 Months",
        MIN_LOAN_AMOUNT: "5000.0000",
        MAX_LOAN_AMOUNT: "100000.0000",
      },
      provider_details: {
        name: "DMI FINANCE PRIVATE LIMITED",
        images: [
          {
            url: "https://refo-static-public.s3.ap-south-1.amazonaws.com/dmi/dmi-sm.png",
            size_type: "sm",
          },
          {
            url: "https://refo-static-public.s3.ap-south-1.amazonaws.com/dmi/dmi-md.png",
            size_type: "md",
          },
          {
            url: "https://refo-static-public.s3.ap-south-1.amazonaws.com/dmi/dmi-lg.png",
            size_type: "lg",
          },
        ],
        short_desc: "DMI FINANCE PRIVATE LIMITED",
        long_desc: "DMI FINANCE PRIVATE LIMITED",
        GRO_NAME: "Ashish Sarin",
        GRO_EMAIL: "head.services@dmifinance.in/grievance@dmifinance.in",
        GRO_CONTACT_NUMBER: "011-41204444",
        GRO_DESIGNATION: "Senior Vice President - Customer Success",
        GRO_ADDRESS:
          "Express Building, 3rd Floor, 9-10, Bahadur Shah Zafar Marg, New Delhi-110002",
        CUSTOMER_SUPPORT_LINK: "https://portal.dmifinance.in",
        CUSTOMER_SUPPORT_CONTACT_NUMBER: "9350657100",
        CUSTOMER_SUPPORT_EMAIL: "customercare@dmifinance.in",
        LSP_NAME: "DMI Finance Pvt. Ltd",
        LSP_EMAIL: "customercare@dmifinance.in",
        LSP_CONTACT_NUMBER: "9350657100",
        LSP_ADDRESS:
          "Express Building, 3rd Floor, 9-10, Bahadur Shah Zafar Marg New Delhi-110002",
      },
      quote_details: {
        PRINCIPAL: "60000.00",
        INTEREST: "18300.23",
        NET_DISBURSED_AMOUNT: "57168.00",
        OTHER_UPFRONT_CHARGES: "0",
        INSURANCE_CHARGES: "0",
        OTHER_CHARGES: "0",
        PROCESSING_FEE: "2832.00",
        quote_price: "81132.23",
      },
      payment_details: [],
    },
  ]);
  const [searchText, setSearchText] = useState("");
  const [formData, setFormData] = useState({
    aa_id: "",
    bureauConsent: "",
  });

  const filteredLoanOffers = offers.filter((offer) =>
    offer.provider_details.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleInputChange = (event, offer) => {
    event.preventDefault();
    console.log(offer);
  };

  const formatNumber = (num) => {
    const parsedNum = parseFloat(num);
    return parsedNum % 1 === 0 ? parsedNum.toFixed(0) : parsedNum.toFixed(2);
  };

  return (
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
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry
        </Typography>
      </DocumentHeaderSection>
      <FormContainer>
        <FormControl component="fieldset">
          <RadioGroup>
            <Grid container spacing={1}>
              {filteredLoanOffers ? (
                filteredLoanOffers.map((offer, index) => (
                  <Grid item xs={12} md={5.8} key={index}>
                    <SelectBoxContainer>
                      <SelectBoxHeader>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          {offer.provider_details.images[0].url && (
                            <img
                              src={offer.provider_details.images[0].url}
                              style={{ height: "40px", marginRight: "10px" }}
                              alt=""
                            />
                          )}
                          <Typography fontSize={18} fontWeight={600}>
                            {offer.provider_details.name}
                          </Typography>
                        </div>
                        <FormControlLabel
                          value={offer.offer_details.offer_item_id}
                          onChange={(e) => handleInputChange(e, offer)}
                          control={<Radio />}
                          label=""
                          style={{ margin: 0 }}
                        />
                      </SelectBoxHeader>
                      <Divider style={{ width: "100%", margin: "10px 0" }} />
                      <SelectBoxDetails>
                        <DetailRow>
                          <span>Loan Amount</span>
                          <span>
                            Rs.
                            {formatNumber(
                              offer?.quote_details?.SelectedLoanAmount ||
                                offer?.quote_details?.PRINCIPAL
                            ) || ""}
                          </span>
                        </DetailRow>
                        <DetailRow>
                          <span>Interest Rate</span>
                          <span>
                            {formatNumber(offer.offer_details.INTEREST_RATE) ||
                              ""}{" "}
                            %
                          </span>
                        </DetailRow>
                        <DetailRow>
                          <span>Tenure</span>
                          <span>
                            {formatNumber(offer.offer_details.TERM) || ""}{" "}
                            Months
                          </span>
                        </DetailRow>
                        <DetailRow>
                          <span>Installment Amount</span>
                          <span>
                            Rs.
                            {formatNumber(
                              offer.offer_details.INSTALLMENT_AMOUNT
                            ) || ""}
                            /Month
                          </span>
                        </DetailRow>
                      </SelectBoxDetails>
                      {/*   <Divider style={{ width: "100%", margin: "10px 0" }} />
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-evenly",
                          width: "100%",
                        }}
                      >
                        <ViewOfferDetails
                          offer={selectedOffer}
                          handleDialogButton={() => handleViewDetails(offer)}
                          open={openDialog.offerDetailsDetails}
                          setOpen={handleDialogClose}
                          pageName={"offerPage"}
                        />
                        <Divider orientation="vertical" flexItem />
                        <CustomizeOfferDetails
                          offer={selectedOffer}
                          setNewOfferValues={setNewOfferValues}
                          handleDialogButton={() => handleCustomizeOffer(offer)}
                          handleButton={handleSaveChanges}
                          open={openDialog.customizeOfferDetails}
                          setOpen={handleDialogClose}
                        /> 
                      </Box>*/}
                    </SelectBoxContainer>
                  </Grid>
                ))
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
            </Grid>
          </RadioGroup>
        </FormControl>
      </FormContainer>
    </AvailableOffersContainer>
  );
};

export default AvailableOffersPage;
