import { Button, Grid, Typography, Stack } from "@mui/material";
import React from "react";
import medicalBill from "../../../assets/medical-bill.png";
import medicalInsurance from "../../../assets/med-insurance.png";

const Product = () => {
  return (
    <Grid
      container
      gap={2}
      spacing={4}
      display={"flex"}
      justifyContent={"space-evenly"}
      alignItems={"center"}
      padding={"20px 10px 10px 30px"}
      marginTop={"20px"}
    >
      <Grid
        item
        sm={12}
        md={5.5}
        lg={3.5}
        sx={{
          height: "320px",
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          border: "2px solid #f4f4f4",
          boxShadow: "5px 10px #f4f4f4",
          borderRadius: "10px",
          padding: "20px",
          transition: "background 0.5s ease", // Add transition for smooth effect
          ":hover": {
            background:
              "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(255,244,198,1) 0%, rgba(0,255,201,0.12088585434173671) 100%)", // Gradient background on hover
          },
        }}
      >
        <Stack justifyContent={"center"} alignItems={"center"}>
          <img
            style={{ height: "100px" }}
            src={medicalBill}
            alt="medical-loan"
          />
        </Stack>
        <Typography variant="body" textAlign={"center"}>
          CliniQ360 offers quick and easy medical loans to cover surgeries,
          treatments, and medications. With competitive rates and flexible
          repayment options, we make quality healthcare
          accessible and affordable.
        </Typography>

        <Button
          href="https://fin.cliniq360.com/loan"
          variant="contained"
          sx={{ textTransform: "none", mt: 2 }}
        >
          Get Loan
        </Button>
      </Grid>
      <Grid
        item
        sm={12}
        md={5.5}
        lg={3.5}
        sx={{
          height: "320px",
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          border: "2px solid #f4f4f4",
          boxShadow: "5px 10px #f4f4f4",
          borderRadius: "10px",
          padding: "20px",
          ":hover": {
            background:
              "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(255,244,198,1) 0%, rgba(0,255,201,0.12088585434173671) 100%)", // Gradient background on hover
          },
        }}
      >
        <Stack justifyContent={"center"} alignItems={"center"}>
          <img
            style={{ height: "100px" }}
            src={medicalInsurance}
            alt="medical-loan"
          />
        </Stack>
        <Typography variant="body" textAlign={"center"}>
          CliniQ360 provides comprehensive health insurance plans to cover your
          medical expenses, including doctor visits, hospital stays, and
          prescriptions. With a range of options to fit your needs and budget,
          we ensure you get the best care without financial stress.
        </Typography>
        <Button
          href="https://fin.cliniq360.com/"
          variant="contained"
          sx={{ textTransform: "none", mt: 2 }}
        >
          Get Health Insurance
        </Button>
      </Grid>
      <Grid
        item
        sm={12}
        md={5.5}
        lg={3.5}
        sx={{
          height: "320px",
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          border: "2px solid #f4f4f4",
          boxShadow: "5px 10px #f4f4f4",
          borderRadius: "10px",
          padding: "20px",
          ":hover": {
            background:
              "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(255,244,198,1) 0%, rgba(0,255,201,0.12088585434173671) 100%)", // Gradient background on hover
          },
        }}
      >
        <Stack justifyContent={"center"} alignItems={"center"}>
          <img
            style={{ height: "100px" }}
            src={medicalBill}
            alt="medical-loan"
          />
        </Stack>
        <Typography variant="body" textAlign={"center"}>
          CliniQ360's Hospital Information Management System (HIMS) streamlines
          hospital operations by integrating patient records, billing, and
          scheduling. Our HIMS ensures efficient, error-free management,
          enhancing patient care and operational efficiency.
        </Typography>
        <Button
          href="https://doc.cliniq360.com/"
          variant="contained"
          sx={{ textTransform: "none", mt: 2 }}
        >
          Sign up
        </Button>
      </Grid>
    </Grid>
  );
};

export default Product;
