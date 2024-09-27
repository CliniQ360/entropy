import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Stack,
  styled,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DownloadIcon from "../../utils/CustomIcons/DownloadIcon";
import { useLocation } from "react-router-dom";

const CreditOfferWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(5),
}));

const CreditHeaderSection = styled(Stack)(({ theme }) => ({
  gap: theme.spacing(1),
  marginBottom: theme.spacing(4),
}));
const CustomAccordian = styled(Accordion)(({ theme }) => ({
  border: "1.2px solid #D2D2D2",
  boxShadow: "none",
  borderTopLeftRadius: "10px",
  borderTopRightRadius: "10px",
  borderBottomLeftRadius: "10px",
  borderBottomRightRadius: "10px",
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

const PDFPreviewSection = styled("div")(({ theme }) => ({
  flexDirection: "column",
  boxShadow: "0 0 10px 3px #d2d2d278",
  height: "250px",
  width: "100%",
}));
const PdfPreview = styled("div")(({ theme }) => ({
  height: "80%",
  flex: 1,
}));
const PreviewBottomSection = styled("div")(({ theme }) => ({
  backgroundColor: "#F8F8F8",
  height: "20%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));
const CreditOfferPage = () => {
  // const pdfUrl =
  //   "https://pramaan.ondc.org/beta/preprod/mock/seller/document/agreement.pdf";
  const [showLoader, setShowLoader] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");
  const location = useLocation();
  const [offerDetails, setOfferDetails] = useState([]);
  const [paymentDetails, setPaymentDetails] = useState([]);
  // const [providerDetails, setProviderDetails] = useState([]);
  const [quoteDetails, setQuoteDetails] = useState([]);
  const [customerDetails, setCustomerdetails] = useState({});

  useEffect(() => {
    setPdfUrl(location.state);
  });

  useEffect(() => {
    const offerDetails = {
      transaction_details: {
        current_stage: "ORDER_CNF",
        domain: "ONDC:FIS12",
        txn_id: "c4f6d3d1-7d13-4b0e-8180-b4d7f327174b",
        user_id: 99,
        status: "COMPLETED",
        current_action: "ON_CONFIRM",
        redirection_status: "LOAN_AGRMT_APPROVED",
        customer_id: 109,
        environment: null,
        created_at: "2024-09-27T14:07:32.364268",
        updated_at: "2024-09-27T14:12:04.340282",
      },
      offer_list: [
        {
          offer_details: {
            offer_item_id: "3b55859a-0d94-427e-b1ef-9deab8cb6928",
            offer_row_id: 10089,
            order_id: "659f261e-5994-492b-89d7-b2ad523e30f3",
            loan_status: "INITIATED",
            item_price: "442300",
            INTEREST_RATE: "12%",
            TERM: "5 months",
            INTEREST_RATE_TYPE: "FIXED",
            APPLICATION_FEE: "0",
            FORECLOSURE_FEE: "0.5%",
            INTEREST_RATE_CONVERSION_CHARGE: "0",
            DELAY_PENALTY_FEE: "5%",
            OTHER_PENALTY_FEE: "1%",
            ANNUAL_PERCENTAGE_RATE: "5%",
            REPAYMENT_FREQUENCY: "MONTHLY",
            NUMBER_OF_INSTALLMENTS_OF_REPAYMENT: "5",
            TNC_LINK:
              "https://pramaan.ondc.org/beta/preprod/mock/seller/document/tnc.pdf",
            COOL_OFF_PERIOD: "PT5M",
            INSTALLMENT_AMOUNT: "88460.00",
            CONSENT_HANDLER: "0849681d-07f9-4aaa-9a8d-88ae1e198187",
            MIN_INTEREST_RATE: "9%",
            MAX_INTEREST_RATE: "15%",
            MIN_TENURE: "5 months",
            MAX_TENURE: "5 years",
            MIN_LOAN_AMOUNT: "50000",
            MAX_LOAN_AMOUNT: "5000000",
          },
          provider_details: {
            images: [
              {
                size_type: "sm",
                url: "https://ondc.org/assets/theme/images/ondc_registered_logo.svg?v=399788fda7",
              },
            ],
            long_desc: "ONDC Bank Ltd, India.",
            name: "ONDC Bank",
            short_desc: "Ondc Bank Ltd",
            GRO_NAME: "ONDC",
            GRO_EMAIL: "lifeline@ondc.com",
            GRO_CONTACT_NUMBER: "1860 266 7766",
            GRO_DESIGNATION: "Nodal Grievance Redressal Officer",
            GRO_ADDRESS:
              "One Indiabulls centre, Tower 1, 18th Floor Jupiter mill compound 841, Senapati Bapat Marg, Elphinstone Road, Mumbai 400013",
            CUSTOMER_SUPPORT_LINK:
              "https://buy.ondc.org/buy/GrievanceRedStep.htm?execution=e1s1",
            CUSTOMER_SUPPORT_CONTACT_NUMBER: "1800 1080",
            CUSTOMER_SUPPORT_EMAIL: "customer.care@ondc.com",
            LSP_NAME: "ONDC_BANK_LSP",
            LSP_EMAIL: "lsp@ondcbank.com",
            LSP_CONTACT_NUMBER: "1860 266 7766",
            LSP_ADDRESS:
              "One Indiabulls centre, Tower 1, 18th Floor Jupiter mill compound 841, Senapati Bapat Marg, Elphinstone Road, Mumbai 400013",
          },
          quote_details: {
            PRINCIPAL: "400000",
            INTEREST: "40000",
            PROCESSING_FEE: "1800",
            OTHER_UPFRONT_CHARGES: "0",
            INSURANCE_CHARGES: "500",
            NET_DISBURSED_AMOUNT: "397700",
            OTHER_CHARGES: "0",
            quote_price: "442300",
          },
          payment_details: [
            {
              id: "7e20bbcb-fa71-4512-8bdc-6508971cd925",
              type: "ON_ORDER",
              status: "NOT-PAID",
              collected_by: "BPP",
              tags: [
                {
                  descriptor: {
                    code: "BUYER_FINDER_FEES",
                  },
                  display: false,
                  list: [
                    {
                      descriptor: {
                        code: "BUYER_FINDER_FEES_TYPE",
                      },
                      value: "percent-annualized",
                    },
                    {
                      descriptor: {
                        code: "BUYER_FINDER_FEES_PERCENTAGE",
                      },
                      value: "1",
                    },
                  ],
                },
                {
                  descriptor: {
                    code: "SETTLEMENT_TERMS",
                  },
                  display: false,
                  list: [
                    {
                      descriptor: {
                        code: "SETTLEMENT_WINDOW",
                      },
                      value: "PT60M",
                    },
                    {
                      descriptor: {
                        code: "SETTLEMENT_BASIS",
                      },
                      value: "INVOICE_RECEIPT",
                    },
                    {
                      descriptor: {
                        code: "MANDATORY_ARBITRATION",
                      },
                      value: "TRUE",
                    },
                    {
                      descriptor: {
                        code: "COURT_JURISDICTION",
                      },
                      value: "New Delhi",
                    },
                    {
                      descriptor: {
                        code: "STATIC_TERMS",
                      },
                      value:
                        "https://bpp.credit.becknprotocol.org/personal-banking/loans/personal-loan",
                    },
                    {
                      descriptor: {
                        code: "OFFLINE_CONTRACT",
                      },
                      value: "true",
                    },
                    {
                      descriptor: {
                        code: "SETTLEMENT_AMOUNT",
                      },
                      value: "1666.67",
                    },
                  ],
                },
              ],
            },
            {
              id: "1",
              type: "POST_FULFILLMENT",
              params: {
                amount: "88460.00",
                currency: "INR",
              },
              status: "NOT-PAID",
              time: {
                label: "INSTALLMENT",
                range: {
                  start: "2024-10-01T08:41:40.454Z",
                  end: "2024-10-31T08:41:40.454Z",
                },
              },
            },
            {
              id: "2",
              type: "POST_FULFILLMENT",
              params: {
                amount: "88460.00",
                currency: "INR",
              },
              status: "NOT-PAID",
              time: {
                label: "INSTALLMENT",
                range: {
                  start: "2024-11-01T08:41:40.454Z",
                  end: "2024-11-30T08:41:40.454Z",
                },
              },
            },
            {
              id: "3",
              type: "POST_FULFILLMENT",
              params: {
                amount: "88460.00",
                currency: "INR",
              },
              status: "NOT-PAID",
              time: {
                label: "INSTALLMENT",
                range: {
                  start: "2024-12-01T08:41:40.454Z",
                  end: "2024-12-31T08:41:40.454Z",
                },
              },
            },
            {
              id: "4",
              type: "POST_FULFILLMENT",
              params: {
                amount: "88460.00",
                currency: "INR",
              },
              status: "NOT-PAID",
              time: {
                label: "INSTALLMENT",
                range: {
                  start: "2024-01-01T08:41:40.454Z",
                  end: "2024-01-31T08:41:40.454Z",
                },
              },
            },
            {
              id: "5",
              type: "POST_FULFILLMENT",
              params: {
                amount: "88460.00",
                currency: "INR",
              },
              status: "NOT-PAID",
              time: {
                label: "INSTALLMENT",
                range: {
                  start: "2025-02-01T08:41:40.454Z",
                  end: "2025-02-28T08:41:40.454Z",
                },
              },
            },
          ],
        },
      ],
    };
    setOfferDetails(offerDetails?.offer_list[0]?.offer_details);
    setPaymentDetails(offerDetails?.offer_list[0]?.payment_details);
    setQuoteDetails(offerDetails?.offer_list[0]?.quote_details);
    setCustomerdetails(JSON.parse(sessionStorage.getItem("customer_details")));
  }, [location.pathname]);

  const handleDownload = async () => {
    try {
      setShowLoader(true);
      const response = await fetch(pdfUrl);
      const blob = await response.blob();
      setShowLoader(false);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "Loan Agreement.pdf";
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to download PDF:", error);
    }
  };

  return (
    <CreditOfferWrapper>
      <CreditHeaderSection>
        <Typography
          sx={{
            fontSize: "1.3rem",
            fontWeight: 700,
            color: "#00A91C",
            fontFamily: "plus jakarta sans bold",
          }}
        >
          Success Message
        </Typography>
        <Typography
          sx={{
            fontSize: "1rem",
            color: "#535353",
            fontFamily: "inter",
          }}
        >
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry
        </Typography>
      </CreditHeaderSection>
      <PDFPreviewSection>
        <PdfPreview>
          <iframe src={pdfUrl} title="PDF Preview" width="100%" height="100%" />
        </PdfPreview>
        <PreviewBottomSection>
          <Box ml={5}>
            <Typography
              sx={{ fontFamily: "source sans pro", fontSize: "1.1rem" }}
            >
              Loan Agreement.pdf
            </Typography>
          </Box>
          <Stack mr={6}>
            <IconButton onClick={handleDownload}>
              <DownloadIcon width={"18"} />
            </IconButton>
          </Stack>
        </PreviewBottomSection>
      </PDFPreviewSection>
      <CustomAccordian defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          sx={{ ml: "10px" }}
        >
          <Typography
            fontWeight={700}
            fontSize={"0.9rem"}
            fontFamily={"plus jakarta sans"}
          >
            Loan Details
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <LoanDetailsWrapper container>
            <LoanDetailsItem xs={5.8} sm={5.8}>
              <Typography sx={{ fontSize: "0.9rem", color: "#5A5A5A" }}>
                Patient Name
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
                {customerDetails?.firstName + " " + customerDetails?.lastName}
              </Typography>
            </LoanDetailsItem>
            <LoanDetailsItem xs={5.8} sm={5.8}>
              <Typography sx={{ fontSize: "0.9rem", color: "#5A5A5A" }}>
                Gender
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
                {customerDetails?.gender}
              </Typography>
            </LoanDetailsItem>
            <LoanDetailsItem xs={5.8} sm={5.8}>
              <Typography sx={{ fontSize: "0.9rem", color: "#5A5A5A" }}>
                Date of Birth
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
                {customerDetails?.dob}
              </Typography>
            </LoanDetailsItem>
            <LoanDetailsItem xs={5.8} sm={5.8}>
              <Typography sx={{ fontSize: "0.9rem", color: "#5A5A5A" }}>
                Email Address{" "}
              </Typography>
              <Typography
                sx={{
                  fontSize: "1.1rem",
                  color: "#171717",
                  fontWeight: 700,
                  mt: 1,
                  mb: 1,
                  wordBreak: "break-all",
                  overflowWrap: "break-word",
                }}
              >
                {customerDetails?.email}
              </Typography>
            </LoanDetailsItem>
            <LoanDetailsItem xs={5.8} sm={5.8}>
              <Typography sx={{ fontSize: "0.9rem", color: "#5A5A5A" }}>
                Order ID{" "}
              </Typography>
              <Typography
                sx={{
                  fontSize: "1.1rem",
                  color: "#171717",
                  fontWeight: 700,
                  mt: 1,
                  mb: 1,
                  wordBreak: "break-all",
                  overflowWrap: "break-word",
                }}
              >
                {offerDetails?.order_id}{" "}
              </Typography>
            </LoanDetailsItem>
            <LoanDetailsItem xs={5.8} sm={5.8}>
              <Typography sx={{ fontSize: "0.9rem", color: "#5A5A5A" }}>
                Principal{" "}
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
                {quoteDetails?.PRINCIPAL}
              </Typography>
            </LoanDetailsItem>
            <LoanDetailsItem xs={5.8} sm={5.8}>
              <Typography sx={{ fontSize: "0.9rem", color: "#5A5A5A" }}>
                Interest
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
                {quoteDetails?.INTEREST}
              </Typography>
            </LoanDetailsItem>
          </LoanDetailsWrapper>
        </AccordionDetails>
      </CustomAccordian>
      <CustomAccordian>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          sx={{ ml: "10px" }}
        >
          <Typography
            fontWeight={700}
            fontSize={"0.9rem"}
            fontFamily={"plus jakarta sans"}
          >
            Order Details
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <LoanDetailsWrapper container>
            <LoanDetailsItem xs={5.8} sm={5.8}>
              <Typography sx={{ fontSize: "0.9rem", color: "#5A5A5A" }}>
                Order ID
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
                {offerDetails?.order_id}
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
                {quoteDetails?.PRINCIPAL}
              </Typography>
            </LoanDetailsItem>
            <LoanDetailsItem xs={5.8} sm={5.8}>
              <Typography sx={{ fontSize: "0.9rem", color: "#5A5A5A" }}>
                Interest
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
                {quoteDetails?.INTEREST}
              </Typography>
            </LoanDetailsItem>
            <LoanDetailsItem xs={5.8} sm={5.8}>
              <Typography sx={{ fontSize: "0.9rem", color: "#5A5A5A" }}>
                Net Disbursed Amount
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
                {quoteDetails?.NET_DISBURSED_AMOUNT}
              </Typography>
            </LoanDetailsItem>
            <LoanDetailsItem xs={5.8} sm={5.8}>
              <Typography sx={{ fontSize: "0.9rem", color: "#5A5A5A" }}>
                Other Upfront Charges
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
                {quoteDetails?.OTHER_UPFRONT_CHARGES}
              </Typography>
            </LoanDetailsItem>
            <LoanDetailsItem xs={5.8} sm={5.8}>
              <Typography sx={{ fontSize: "0.9rem", color: "#5A5A5A" }}>
                Insurance Charges
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
                {quoteDetails?.INSURANCE_CHARGES}
              </Typography>
            </LoanDetailsItem>
            <LoanDetailsItem xs={5.8} sm={5.8}>
              <Typography sx={{ fontSize: "0.9rem", color: "#5A5A5A" }}>
                Other Charges
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
                {quoteDetails?.OTHER_CHARGES}
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
                {quoteDetails?.PROCESSING_FEE}
              </Typography>
            </LoanDetailsItem>
            <LoanDetailsItem xs={5.8} sm={5.8}>
              <Typography sx={{ fontSize: "0.9rem", color: "#5A5A5A" }}>
                Final Price
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
                {quoteDetails?.quote_price}
              </Typography>
            </LoanDetailsItem>
          </LoanDetailsWrapper>
        </AccordionDetails>
      </CustomAccordian>
    </CreditOfferWrapper>
  );
};

export default CreditOfferPage;
