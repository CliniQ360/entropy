import React from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Button,
  Grid,
  Box,
} from "@mui/material";
import { useState } from "react";
import { submitInsuranceForm } from "../../pages/InsuranceRegistration/insurance.slice";
import { insuranceSearch } from "../../pages/InsuranceRegistration/insurance.slice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import CustomLoader from "../CustomLoader";
import CustomSnackbar from "../CustomSnackbar";

const SelfInsuranceForm = () => {
  const environment = sessionStorage.getItem("environment");
  const txnId = sessionStorage.getItem("txnId");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showLoader, setShowLoader] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);

  const [individualInfo, setIndividualInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    PED: "No",
    diabetes: false,
    bloodPressure: false,
    heartAilments: false,
    other: false,
    gender: "M",
    dob: "",
    amount: "",
    panIndia: false,
    pincode: "",
    politicallyExposedPerson: false,
    gstin: "",
    heightfoot: "",
    heightinch: "",
    weight: "",
    relation: "self",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;
    setIndividualInfo((prevData) => ({
      ...prevData,
      [name]: fieldValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowLoader(true);
    // Handle form submission here
    const payload = {
      formData: {
        individualInfo,
      },
      txnId: txnId,
    };
    sessionStorage.setItem("phone", individualInfo.phone);
    dispatch(submitInsuranceForm(payload)).then((res) => {
      if (res?.error && Object.keys(res?.error)?.length > 0) {
        setShowSnackbar(true);
        setShowLoader(false);
        return;
      }
      const isSuccess = res?.payload.some(
        (item) => item.form_status === "Success"
      );
      if (isSuccess) {
        const searchPayload = {
          environment: environment,
          txnId: txnId,
        };
        dispatch(insuranceSearch(searchPayload)).then((response) => {
          setTimeout(() => {
            setShowLoader(false);
            navigate("/home/insurance-offer");
          }, 3000);
        });
      } else {
        setShowLoader(false);
        return;
      }
    });
  };

  return (
    <Box style={{ padding: "20px" }}>
      <CustomLoader open={showLoader} />
      <CustomSnackbar
        open={showSnackbar}
        message={"Something Went Wrong"}
        status={"error"}
        onClose={() => setShowSnackbar(false)}
      />
      <form onSubmit={handleSubmit}>
        <Grid container spacing={6}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="First Name"
              name="firstName"
              value={individualInfo.firstName}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Last Name"
              name="lastName"
              value={individualInfo.lastName}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Email"
              name="email"
              value={individualInfo.email}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Phone Number"
              name="phone"
              value={individualInfo.phone}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Address"
              name="address"
              value={individualInfo.address}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>PED</InputLabel>
              <Select
                name="PED"
                value={individualInfo.PED}
                onChange={handleChange}
                label="PED"
              >
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {/* {individualInfo.PED === "Yes" && (
              <> */}
          <Grid item xs={12} sm={6} md={3}>
            <FormControlLabel
              control={
                <Checkbox
                  name="diabetes"
                  checked={individualInfo.diabetes}
                  onChange={handleChange}
                />
              }
              label="Diabetes"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControlLabel
              control={
                <Checkbox
                  name="bloodPressure"
                  checked={individualInfo.bloodPressure}
                  onChange={handleChange}
                />
              }
              label="Blood Pressure/Hypertension"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControlLabel
              control={
                <Checkbox
                  name="heartAilments"
                  checked={individualInfo.heartAilments}
                  onChange={handleChange}
                />
              }
              label="Heart Ailments"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControlLabel
              control={
                <Checkbox
                  name="other"
                  checked={individualInfo.other}
                  onChange={handleChange}
                />
              }
              label="Other Health Issues"
            />
          </Grid>
          {/* </>
            )} */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Gender</InputLabel>
              <Select
                name="gender"
                value={individualInfo.gender}
                onChange={handleChange}
                label="Gender"
              >
                <MenuItem value="M">Male</MenuItem>
                <MenuItem value="F">Female</MenuItem>
                {/* <MenuItem value="Other">Other</MenuItem> */}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Date of Birth"
              name="dob"
              type="date"
              value={individualInfo.dob}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Coverage Amount"
              name="amount"
              value={individualInfo.amount}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={
                <Checkbox
                  name="panIndia"
                  checked={individualInfo.panIndia}
                  onChange={handleChange}
                />
              }
              label="PAN India Cover"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Pincode"
              name="pincode"
              value={individualInfo.pincode}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={
                <Checkbox
                  name="politicallyExposedPerson"
                  checked={individualInfo.politicallyExposedPerson}
                  onChange={handleChange}
                />
              }
              label="Politically Exposed"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="GSTIN"
              name="gstin"
              value={individualInfo.gstin}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Weight"
              name="weight"
              value={individualInfo.weight}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Height (Foot)"
              name="heightfoot"
              value={individualInfo.heightfoot}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Height (Inches)"
              name="heightinch"
              value={individualInfo.heightinch}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} style={{ textAlign: "center", marginTop: "10px" }}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default SelfInsuranceForm;
