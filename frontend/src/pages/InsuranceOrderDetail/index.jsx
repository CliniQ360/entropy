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

    const offerList = [
      {
        offer_details: {
          offer_item_id: "3b55859a-0d94-427e-b1ef-9deab8cb6928",
          offer_row_id: 14822,
          order_id: "3136adf2-e5bf-4333-a9dc-08d7a9dc9566",
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
          CONSENT_HANDLER: "8c90274a-530b-4520-acc1-e028c2ca818d",
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
            id: "8b71b2c7-38fe-471b-8f82-f9c8dc30a272",
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
                start: "2024-11-01T08:26:28.115Z",
                end: "2024-11-30T08:26:28.115Z",
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
                start: "2024-12-01T08:26:28.115Z",
                end: "2024-12-31T08:26:28.115Z",
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
                start: "2025-01-01T08:26:28.115Z",
                end: "2025-01-31T08:26:28.115Z",
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
                start: "2025-02-01T08:26:28.115Z",
                end: "2025-02-28T08:26:28.115Z",
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
                start: "2025-03-01T08:26:28.115Z",
                end: "2025-03-31T08:26:28.115Z",
              },
            },
          },
        ],
      },
    ];

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
          offer_item_id: "3b55859a-0d94-427e-b1ef-9deab8cb6928",
          offer_row_id: 14822,
          order_id: "3136adf2-e5bf-4333-a9dc-08d7a9dc9566",
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
          CONSENT_HANDLER: "8c90274a-530b-4520-acc1-e028c2ca818d",
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
            id: "8b71b2c7-38fe-471b-8f82-f9c8dc30a272",
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
                start: "2024-11-01T08:26:28.115Z",
                end: "2024-11-30T08:26:28.115Z",
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
                start: "2024-12-01T08:26:28.115Z",
                end: "2024-12-31T08:26:28.115Z",
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
                start: "2025-01-01T08:26:28.115Z",
                end: "2025-01-31T08:26:28.115Z",
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
                start: "2025-02-01T08:26:28.115Z",
                end: "2025-02-28T08:26:28.115Z",
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
                start: "2025-03-01T08:26:28.115Z",
                end: "2025-03-31T08:26:28.115Z",
              },
            },
          },
        ],
      },
    ];
    if (offerList) {
      setOfferDetails(offerList[0]?.offer_details);
      setPaymentDetails(offerList[0]?.payment_details);
      setQuoteDetails(offerList[0]?.quote_details);
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
      {offerDetails && (
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
              Loan Details
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <LoanDetailsWrapper container>
              <LoanDetailsItem xs={5.8} sm={5.8}>
                <Typography sx={{ fontSize: "0.9rem", color: "#5A5A5A" }}>
                  Annual Percentage Rate
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
                  {offerDetails?.ANNUAL_PERCENTAGE_RATE || ""}
                </Typography>
              </LoanDetailsItem>
              <LoanDetailsItem xs={5.8} sm={5.8}>
                <Typography sx={{ fontSize: "0.9rem", color: "#5A5A5A" }}>
                  Application Fee
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
                  {offerDetails?.APPLICATION_FEE || ""}
                </Typography>
              </LoanDetailsItem>
              <LoanDetailsItem xs={5.8} sm={5.8}>
                <Typography sx={{ fontSize: "0.9rem", color: "#5A5A5A" }}>
                  Cool Off Period
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
                  {offerDetails?.COOL_OFF_PERIOD || ""}
                </Typography>
              </LoanDetailsItem>
              <LoanDetailsItem xs={5.8} sm={5.8}>
                <Typography sx={{ fontSize: "0.9rem", color: "#5A5A5A" }}>
                  Delay Penalty Fee
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
                  {offerDetails?.DELAY_PENALTY_FEE || ""}
                </Typography>
              </LoanDetailsItem>
              <LoanDetailsItem xs={5.8} sm={5.8}>
                <Typography sx={{ fontSize: "0.9rem", color: "#5A5A5A" }}>
                  Foreclouser Fee
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
                  {offerDetails?.FORECLOSURE_FEE || ""}
                </Typography>
              </LoanDetailsItem>
              <LoanDetailsItem xs={5.8} sm={5.8}>
                <Typography sx={{ fontSize: "0.9rem", color: "#5A5A5A" }}>
                  Installment Amount
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
                  {offerDetails?.INSTALLMENT_AMOUNT || ""}
                </Typography>
              </LoanDetailsItem>
              <LoanDetailsItem xs={5.8} sm={5.8}>
                <Typography sx={{ fontSize: "0.9rem", color: "#5A5A5A" }}>
                  Interest Rate
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
                  {offerDetails?.INTEREST_RATE || ""}
                </Typography>
              </LoanDetailsItem>
              <LoanDetailsItem xs={5.8} sm={5.8}>
                <Typography sx={{ fontSize: "0.9rem", color: "#5A5A5A" }}>
                  Interest Rate Conversion Charge
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
                  {offerDetails?.INTEREST_RATE_CONVERSION_CHARGE || ""}
                </Typography>
              </LoanDetailsItem>
              <LoanDetailsItem xs={5.8} sm={5.8}>
                <Typography sx={{ fontSize: "0.9rem", color: "#5A5A5A" }}>
                  Interest Rate Type
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
                  {offerDetails?.INTEREST_RATE_TYPE || ""}
                </Typography>
              </LoanDetailsItem>
              <LoanDetailsItem xs={5.8} sm={5.8}>
                <Typography sx={{ fontSize: "0.9rem", color: "#5A5A5A" }}>
                  Number of Installments of Repayment
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
                  {offerDetails?.NUMBER_OF_INSTALLMENTS_OF_REPAYMENT || ""}
                </Typography>
              </LoanDetailsItem>
              <LoanDetailsItem xs={5.8} sm={5.8}>
                <Typography sx={{ fontSize: "0.9rem", color: "#5A5A5A" }}>
                  Loan Status
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
                  {offerDetails?.loan_status || ""}
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
            EMI Details
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <LoanDetailsWrapper overflow={"auto"} container>
            {paymentDetails && (
              <>
                <CustomTableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="left">ID</TableCell>
                        <TableCell>Amount</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Type</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {(paymentDetails.length > 0 && rowsPerPage > 0
                        ? paymentDetails.slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                        : paymentDetails
                      )?.map(
                        (offer, index) =>
                          offer?.type === "POST_FULFILLMENT" && (
                            <>
                              <TableRow key={index}>
                                <TableCell align="left">{offer?.id}</TableCell>
                                <TableCell align="left">
                                  {offer?.params?.amount}
                                </TableCell>

                                <TableCell align="left">
                                  {offer?.time?.range
                                    ? new Date(
                                        offer?.time?.range?.start
                                      ).toLocaleDateString()
                                    : "-"}
                                </TableCell>
                                <TableCell align="left">
                                  {(offer?.status).split("-").join(" ")}
                                </TableCell>
                                <TableCell align="left">
                                  {(offer?.time?.label).split("_").join(" ")}
                                </TableCell>
                              </TableRow>
                            </>
                          )
                      )}
                    </TableBody>
                  </Table>
                </CustomTableContainer>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  component="div"
                  colSpan={3}
                  count={paymentDetails.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      "aria-label": "rows per page",
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </>
            )}
          </LoanDetailsWrapper>
        </AccordionDetails>
      </CustomAccordian>
    </CreditOfferWrapper>
  );
};

export default InsuranceOrderDetail;
