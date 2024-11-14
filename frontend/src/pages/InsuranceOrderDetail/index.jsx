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
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Paper,
} from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DownloadIcon from "../../utils/CustomIcons/DownloadIcon";
import { useLocation } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage";
import { AudioDataContext } from "../../context/audioDataContext";
import Lottie from "lottie-react";
import PartyAnimation from "../../utils/lottieJson/Party_Animation.json";

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

const CustomTableContainer = styled(TableContainer)(({ theme }) => ({
  overflowX: "auto",
  width: 320,
  [theme.breakpoints.up("sm")]: {
    width: "100%",
  },
}));

const InsuranceOrderDetail = () => {
  const [showLoader, setShowLoader] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");
  const location = useLocation();
  const [offerDetails, setOfferDetails] = useState([]);
  const [paymentDetails, setPaymentDetails] = useState([]);
  const [quoteDetails, setQuoteDetails] = useState([]);
  const [providerDetails, setProviderDetails] = useState({});
  const [customerDetails, setCustomerdetails] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  //   const { offerList } = useContext(AudioDataContext);
  const lottieRef = useRef(null);
  const [playCount, setPlayCount] = useState(0);
  const activeLanguage = sessionStorage.getItem("activeLanguage");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
      onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
      onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
      onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
      onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
      <Box sx={{ flexShrink: 0, ml: 2.5 }}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </Box>
    );
  }

  useEffect(() => {
    setPdfUrl(location.state);
  });

  useEffect(() => {
    const offerList = [
      {
        offer_details: {
          offer_item_id: "M1731560351950",
          premium_amount: {
            currency: "INR",
            value: "25460.00",
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
          selected_add_ons: [
            {
              id: "A1",
              descriptor: {
                name: "No Claim Bonus",
                code: "NO_CLAIM_BONUS",
              },
              price: {
                value: "100",
                currency: "INR",
              },
              quantity: {
                selected: {
                  count: 1,
                },
              },
            },
            {
              id: "A2",
              descriptor: {
                name: "Daycare Cover",
                code: "DAYCARE_COVER",
              },
              price: {
                value: "200",
                currency: "INR",
              },
              quantity: {
                selected: {
                  count: 1,
                },
              },
            },
            {
              id: "A3",
              descriptor: {
                name: "Daily Cash Allowance",
                code: "DAILY_CASH_ALLOWANCE",
              },
              price: {
                value: "1000",
                currency: "INR",
              },
              quantity: {
                selected: {
                  count: 1,
                },
              },
            },
            {
              id: "A4",
              descriptor: {
                name: "Domicialiary Expenses",
                code: "DOMICILIARY_EXPENSES",
              },
              price: {
                value: "400",
                currency: "INR",
              },
              quantity: {
                selected: {
                  count: 1,
                },
              },
            },
            {
              id: "A5",
              descriptor: {
                name: "Health Check-ups",
                code: "HEALTH_CHECK_UPS",
              },
              price: {
                value: "100",
                currency: "INR",
              },
              quantity: {
                selected: {
                  count: 1,
                },
              },
            },
          ],
          policy_name: "Health Gain Plus Individual",
          error_details: {
            error_code: null,
            error_type: null,
            error_message: null,
          },
          order_id: "66cdc340-1f5e-48d6-8349-84d85113aa9f",
          order_status: "ACTIVE",
          documents: [
            {
              descriptor: {
                code: "POLICY_DOC",
                name: "Insurance Policy Document",
                short_desc:
                  "Download your digitally signed policy document here",
                long_desc:
                  "Download you digitally signed policy document here. This document is password protected. To open this document, please type in your password in DDMMMYYYYXXXX format where DDMMMYYYY represents your date of birth, and XXXX represents the first four letters of your name",
              },
              mime_type: "application/pdf",
              url: "https://pramaan.ondc.org/beta/preprod/mock/seller/document/tnc.pdf",
            },
            {
              descriptor: {
                code: "CLAIM_DOC",
                name: "Claim Insurance Policy",
                short_desc:
                  "Buyer can claim their insurance by visiting the below url",
                long_desc:
                  "Buyer can claim their insurance by visiting the below url",
              },
              mime_type: "application/html",
              url: "https://pramaan.ondc.org/beta/preprod/mock/seller/form/f7924764-26a4-4434-937b-177d6d326afb",
            },
            {
              descriptor: {
                code: "RENEW_DOC",
                name: "Renew Insurance Policy",
                short_desc:
                  "Buyer can renew their insurance by visiting the below url",
                long_desc:
                  "Buyer can easily renew their insurance policies by visiting the following URL",
              },
              mime_type: "application/html",
              url: "https://pramaan.ondc.org/beta/preprod/mock/seller/form/277e1821-e7d4-4427-ae17-01b54f445adf",
            },
          ],
          fulfillment_status: {
            claim_status: "N/A",
            renewal_status: "N/A",
            order_status: "GRANTED",
          },
          COVERAGE_AMOUNT: "1000000",
          CO_PAYMENT: "Yes",
          ROOM_RENT_CAP: "25000",
          RESTORATION_BENEFIT: "No",
          CLAIM_SETTLEMENT_RATIO: "0.8",
          PRE_HOSPITALIZATION_COVERAGE_DAYS: "2",
          POST_HOSPITALIZATION_COVERAGE_DAYS: "5",
          MATERNITY_COVERAGE: "Yes",
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
        quote_details: {
          id: "8b73b544-2e6d-4ef6-857c-e6d7ba653df2",
          breakup: [
            {
              price: {
                value: "20000",
                currency: "INR",
              },
              title: "BASE_PRICE",
            },
            {
              price: {
                value: "50",
                currency: "INR",
              },
              title: "CONVIENCE_FEE",
            },
            {
              price: {
                value: "10",
                currency: "INR",
              },
              title: "PROCESSING_FEE",
            },
            {
              price: {
                value: "3600",
                currency: "INR",
              },
              title: "TAX",
            },
            {
              title: "ADD_ONS",
              item: {
                id: "I1",
                add_ons: [
                  {
                    id: "A1",
                  },
                ],
              },
              price: {
                value: "100",
                currency: "INR",
              },
            },
            {
              title: "ADD_ONS",
              item: {
                id: "I1",
                add_ons: [
                  {
                    id: "A2",
                  },
                ],
              },
              price: {
                value: "200",
                currency: "INR",
              },
            },
            {
              title: "ADD_ONS",
              item: {
                id: "I1",
                add_ons: [
                  {
                    id: "A3",
                  },
                ],
              },
              price: {
                value: "1000",
                currency: "INR",
              },
            },
            {
              title: "ADD_ONS",
              item: {
                id: "I1",
                add_ons: [
                  {
                    id: "A4",
                  },
                ],
              },
              price: {
                value: "400",
                currency: "INR",
              },
            },
            {
              title: "ADD_ONS",
              item: {
                id: "I1",
                add_ons: [
                  {
                    id: "A5",
                  },
                ],
              },
              price: {
                value: "100",
                currency: "INR",
              },
            },
          ],
          price: {
            currency: "INR",
            value: "25460.00",
          },
          ttl: "PT15D",
        },
        payment_details: [],
      },
    ];
    if (offerList) {
      setOfferDetails(offerList[0]?.offer_details);
      setPaymentDetails(offerList[0]?.payment_details);
      setQuoteDetails(offerList[0]?.quote_details);
      setProviderDetails(offerList[0]?.provider_details);
      setCustomerdetails(
        JSON.parse(sessionStorage.getItem("customer_details"))
      );
    }
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

  useEffect(() => {
    const hasPlayed = JSON.parse(sessionStorage.getItem("cracker_animation"));
    if (hasPlayed) {
      if (lottieRef.current) {
        lottieRef.current.play();
      }
    }
  }, []);

  const handleAnimationComplete = () => {
    if (playCount < 2) {
      sessionStorage.setItem("cracker_animation", false);
      setPlayCount(playCount + 1);
    }
  };

  return (
    <CreditOfferWrapper>
      {JSON.parse(sessionStorage.getItem("cracker_animation")) && (
        <Lottie
          style={{ position: "fixed", top: 10, height: "100%", zIndex: 1 }}
          animationData={PartyAnimation}
          loop={false}
          autoPlay={false}
          lottieRef={lottieRef}
          onComplete={handleAnimationComplete}
        />
      )}
      <CreditHeaderSection>
        <Typography
          sx={{
            fontSize: "1.3rem",
            fontWeight: 700,
            color: "#00A91C",
            fontFamily: "plus jakarta sans bold",
          }}
        >
          {activeLanguage === "hi"
            ? "लोन प्रक्रिया सफलतापूर्वक पूरी हो गई!"
            : "Loan Process Successfully Completed! "}
        </Typography>
        <Typography
          sx={{
            fontSize: "1rem",
            color: "#535353",
            fontFamily: "inter",
          }}
        >
          {activeLanguage === "hi"
            ? "बधाई हो, आपका लोन प्रक्रिया में है। यदि आपके Loan दस्तावेज़ के संबंध में कोई प्रश्न हैं, तो मुझे बताएं।"
            : "Congratulations your Loan is processed. Let me know if you have any queries regarding your Loan Document "}
        </Typography>
      </CreditHeaderSection>

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
            Customer Details
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
            Policy Details
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
                Status
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
                {offerDetails?.order_status}
              </Typography>
            </LoanDetailsItem>
            <LoanDetailsItem xs={5.8} sm={5.8}>
              <Typography sx={{ fontSize: "0.9rem", color: "#5A5A5A" }}>
                Premium Amount
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
                {offerDetails?.premium_amount?.value}
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
                {offerDetails?.COVERAGE_AMOUNT}
              </Typography>
            </LoanDetailsItem>
            <LoanDetailsItem xs={5.8} sm={5.8}>
              <Typography sx={{ fontSize: "0.9rem", color: "#5A5A5A" }}>
                Co Payment
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
                {offerDetails?.CO_PAYMENT}
              </Typography>
            </LoanDetailsItem>
            <LoanDetailsItem xs={5.8} sm={5.8}>
              <Typography sx={{ fontSize: "0.9rem", color: "#5A5A5A" }}>
                Room Rent Cap
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
                {offerDetails?.ROOM_RENT_CAP}
              </Typography>
            </LoanDetailsItem>
            <LoanDetailsItem xs={5.8} sm={5.8}>
              <Typography sx={{ fontSize: "0.9rem", color: "#5A5A5A" }}>
                Room Category
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
                {offerDetails?.ROOM_CATEGORY}
              </Typography>
            </LoanDetailsItem>
            <LoanDetailsItem xs={5.8} sm={5.8}>
              <Typography sx={{ fontSize: "0.9rem", color: "#5A5A5A" }}>
                Restoration Benifit
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
                {offerDetails?.RESTORATION_BENEFIT}
              </Typography>
            </LoanDetailsItem>
            <LoanDetailsItem xs={5.8} sm={5.8}>
              <Typography sx={{ fontSize: "0.9rem", color: "#5A5A5A" }}>
                Claim Settlement Ratio
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
                {offerDetails?.CLAIM_SETTLEMENT_RATIO}
              </Typography>
            </LoanDetailsItem>
            <LoanDetailsItem xs={5.8} sm={5.8}>
              <Typography sx={{ fontSize: "0.9rem", color: "#5A5A5A" }}>
                Pre Hospitalization Coverage Days
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
                {offerDetails?.PRE_HOSPITALIZATION_COVERAGE_DAYS}
              </Typography>
            </LoanDetailsItem>
            <LoanDetailsItem xs={5.8} sm={5.8}>
              <Typography sx={{ fontSize: "0.9rem", color: "#5A5A5A" }}>
                Claim Settlement Ratio
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
                {offerDetails?.CLAIM_SETTLEMENT_RATIO}
              </Typography>
            </LoanDetailsItem>
            <LoanDetailsItem xs={5.8} sm={5.8}>
              <Typography sx={{ fontSize: "0.9rem", color: "#5A5A5A" }}>
                Post Hospitalization Coverage Days
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
                {offerDetails?.POST_HOSPITALIZATION_COVERAGE_DAYS}
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
                {offerDetails?.MATERNITY_COVERAGE}
              </Typography>
            </LoanDetailsItem>
            <LoanDetailsItem xs={5.8} sm={5.8}>
              <Typography sx={{ fontSize: "0.9rem", color: "#5A5A5A" }}>
                Initial Waiting Period
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
                {offerDetails?.INITIAL_WAITING_PERIOD}
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
                {offerDetails?.CASHLESS_HOSPITALS}
              </Typography>
            </LoanDetailsItem>
            <LoanDetailsItem xs={5.8} sm={5.8}>
              <Typography sx={{ fontSize: "0.9rem", color: "#5A5A5A" }}>
                Base Price
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
                {offerDetails?.BASE_PRICE}
              </Typography>
            </LoanDetailsItem>
            <LoanDetailsItem xs={5.8} sm={5.8}>
              <Typography sx={{ fontSize: "0.9rem", color: "#5A5A5A" }}>
                Convience Fee
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
                {offerDetails?.CONVIENCE_FEE}
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
                {offerDetails?.PROCESSING_FEE}
              </Typography>
            </LoanDetailsItem>
            <LoanDetailsItem xs={5.8} sm={5.8}>
              <Typography sx={{ fontSize: "0.9rem", color: "#5A5A5A" }}>
                Tax{" "}
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
                {offerDetails?.TAX}
              </Typography>
            </LoanDetailsItem>
            <LoanDetailsItem xs={5.8} sm={5.8}>
              <Typography sx={{ fontSize: "0.9rem", color: "#5A5A5A" }}>
                Offer Validity
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
                {offerDetails?.OFFER_VALIDITY}
              </Typography>
            </LoanDetailsItem>
            <LoanDetailsItem xs={5.8} sm={5.8}>
              <Typography sx={{ fontSize: "0.9rem", color: "#5A5A5A" }}>
                Claim Status
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
                {offerDetails?.fulfillment_status?.claim_status
                  ? offerDetails?.fulfillment_status?.claim_status
                  : "N/A"}
              </Typography>
            </LoanDetailsItem>
            <LoanDetailsItem xs={5.8} sm={5.8}>
              <Typography sx={{ fontSize: "0.9rem", color: "#5A5A5A" }}>
                Renewal Status
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
                {offerDetails?.fulfillment_status?.renewal_status
                  ? offerDetails?.fulfillment_status?.renewal_status
                  : "N/A"}
              </Typography>
            </LoanDetailsItem>
            <LoanDetailsItem xs={5.8} sm={5.8}>
              <Typography sx={{ fontSize: "0.9rem", color: "#5A5A5A" }}>
                Order Status
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
                {offerDetails?.fulfillment_status?.order_status
                  ? offerDetails?.fulfillment_status?.order_status
                  : "N/A"}
              </Typography>
            </LoanDetailsItem>
          </LoanDetailsWrapper>
        </AccordionDetails>
      </CustomAccordian>
      {providerDetails && (
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
              Insurer Details
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <LoanDetailsWrapper container>
              <LoanDetailsItem xs={5.8} sm={5.8}>
                <Typography sx={{ fontSize: "0.9rem", color: "#5A5A5A" }}>
                  Name{" "}
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
                  {providerDetails?.name || ""}
                </Typography>
              </LoanDetailsItem>
              <LoanDetailsItem xs={5.8} sm={5.8}>
                <Typography sx={{ fontSize: "0.9rem", color: "#5A5A5A" }}>
                  Long Description
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
                  {providerDetails?.long_desc || ""}
                </Typography>
              </LoanDetailsItem>
              <LoanDetailsItem xs={5.8} sm={5.8}>
                <Typography sx={{ fontSize: "0.9rem", color: "#5A5A5A" }}>
                  Short Description
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
                  {providerDetails?.short_desc || ""}
                </Typography>
              </LoanDetailsItem>
            </LoanDetailsWrapper>
          </AccordionDetails>
        </CustomAccordian>
      )}
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
            Price Details{" "}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {quoteDetails ? (
            <LoanDetailsWrapper overflow={"auto"} container>
              {Object.entries(quoteDetails?.breakup).map(([key, value]) => (
                <LoanDetailsItem xs={5.8} sm={5.8}>
                  <Typography sx={{ fontSize: "0.9rem", color: "#5A5A5A" }}>
                    {value.title.split("_").join(" ")}{" "}
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
                    {value.price.currency} {value.price.value}{" "}
                  </Typography>
                </LoanDetailsItem>
              ))}
              <LoanDetailsItem xs={5.8} sm={5.8}>
                <Typography sx={{ fontSize: "0.9rem", color: "#5A5A5A" }}>
                  TOTAL PRICE
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
                  {" "}
                  {quoteDetails?.price?.currency} {quoteDetails?.price?.value}{" "}
                </Typography>
              </LoanDetailsItem>
            </LoanDetailsWrapper>
          ) : (
            "Not Available"
          )}
        </AccordionDetails>
      </CustomAccordian>
    </CreditOfferWrapper>
  );
};

export default InsuranceOrderDetail;
