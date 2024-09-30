import React from "react";
import {
  Typography,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Stack,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const ViewOfferDetails = React.memo(({ offer }) => {
  // console.log("loanData", offer);
  const loanData = offer?.offer_details;
  const GRO = offer?.provider_details;
  // console.log(GRO);
  const accordionList = [
    {
      title: "Loan Details",
      content: loanData ? (
        <Grid container spacing={2}>
          {Object.entries(loanData).map(([key, value]) => (
            <Grid item xs={12} md={6} key={key}>
              <TextField label={key} value={value} fullWidth disabled />
            </Grid>
          ))}
        </Grid>
      ) : (
        <p style={{ color: "red" }}>Error While fetching Data</p>
      ),
    },
    {
      title: "GRO information",
      content: GRO ? (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="GRO Name"
              value={GRO?.GRO_NAME}
              InputLabelProps={{ shrink: true }}
              fullWidth
              disabled
              style={{ WebkitTextFillColor: "#000000b0" }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="GRO Email"
              value={GRO?.GRO_EMAIL}
              InputLabelProps={{ shrink: true }}
              fullWidth
              disabled
              style={{ WebkitTextFillColor: "#000000b0" }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="GRO Contact Number"
              value={GRO?.GRO_CONTACT_NUMBER}
              InputLabelProps={{ shrink: true }}
              fullWidth
              disabled
              style={{ WebkitTextFillColor: "#000000b0" }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="GRO Designation"
              value={GRO?.GRO_DESIGNATION}
              InputLabelProps={{ shrink: true }}
              fullWidth
              disabled
              style={{ WebkitTextFillColor: "#000000b0" }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="GRO Address"
              value={GRO?.GRO_ADDRESS}
              InputLabelProps={{ shrink: true }}
              fullWidth
              disabled
              style={{ WebkitTextFillColor: "#000000b0" }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Customer Support Link"
              value={GRO?.CUSTOMER_SUPPORT_LINK}
              InputLabelProps={{ shrink: true }}
              fullWidth
              disabled
              style={{ WebkitTextFillColor: "#000000b0" }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Customer Support Contact Number"
              value={GRO?.CUSTOMER_SUPPORT_CONTACT_NUMBER}
              InputLabelProps={{ shrink: true }}
              fullWidth
              disabled
              style={{ WebkitTextFillColor: "#000000b0" }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Customer Support Email"
              value={GRO?.CUSTOMER_SUPPORT_EMAIL}
              InputLabelProps={{ shrink: true }}
              fullWidth
              disabled
              style={{ WebkitTextFillColor: "#000000b0" }}
            />
          </Grid>
        </Grid>
      ) : (
        <p style={{ color: "red" }}>Error While fetching Data</p>
      ),
    },
    {
      title: "LSP information",
      content: GRO ? (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="LSP Name"
              value={GRO?.LSP_NAME}
              fullWidth
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="LSP Email"
              value={GRO?.LSP_EMAIL}
              fullWidth
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="LSP Contact Number"
              value={GRO?.LSP_CONTACT_NUMBER}
              fullWidth
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="LSP Address"
              value={GRO?.LSP_ADDRESS}
              fullWidth
              disabled
            />
          </Grid>
        </Grid>
      ) : (
        <p style={{ color: "red" }}>Error While fetching Data</p>
      ),
    },
    {
      title: "Terms and Conditions",
      content: (
        <Stack flexDirection={"column"} gap={2}>
          <Typography>Please click the link to view the</Typography>
          <Typography
            variant="overline"
            style={{
              color: "red",
              textDecoration: "underline",
              cursor: "pointer",
            }}
            onClick={() => window.open(loanData?.TNC_LINK, "_blank")}
          >
            Terms and Conditions
          </Typography>
        </Stack>
      ),
    },
  ];

  return (
    <Box sx={{ width: "100%" }}>
      <Accordion sx={{ padding: 2 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Selected Loan Amount Details</Typography>
        </AccordionSummary>
        {accordionList.map((accordion, index) => (
          <Accordion key={index}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${index + 1}a-content`}
              id={`panel${index + 1}a-header`}
            >
              <Typography>{accordion.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{accordion.content}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Accordion>
    </Box>
  );
});

export default ViewOfferDetails;
