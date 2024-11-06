import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Boy, FamilyRestroom } from "@mui/icons-material";
import {
  Box,
  styled,
  Typography,
  Button,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import SelfInsuranceForm from "../../components/SelfInsuranceForm";
import PropTypes from "prop-types";
import { useState } from "react";
import FamilyInsuranceForm from "../../components/FamilyInsuranceForm";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import CustomLoader from "../../components/CustomLoader";

// const steps = ['Self Insurance'];

const InsuranceWrapper = styled("div")(({ theme }) => ({
  "&": {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "24px",
    marginBottom: "4px",
    [theme.breakpoints.down("sm")]: {
      gap: "10px",
    },
  },
}));

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const InsuranceRegistration = () => {
  const [value, setValue] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [proposer, setProposer] = useState("");
  const [steps, setSteps] = useState([""]);
  const [openDialog, setOpenDialog] = useState(true);
  const [count, setCount] = useState(0);
  const environment = sessionStorage.getItem("environment");
  const txnId = sessionStorage.getItem("txnId");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showLoader, setShowLoader] = useState(false);
  const [familyFloaterInfo, setFamilyFloaterInfo] = useState({});
  const [isCoverageAmtDisabled, setIsCoverageAmtDisabled] = useState(false);
  const [coverageAmount, setCoverageAmount] = useState("");

  const [familyFormData, setFamilyFormData] = useState([]);
  // const [formData, setFormData] = useState(Array.from(familyFormData, () => ({})));
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleForamDataChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;
    const updatedFormData = [...familyFormData];
    if (activeStep === 0 && name === "amount") {
      setCoverageAmount(fieldValue);
      updatedFormData[activeStep] = {
        ...updatedFormData[activeStep],
        [name]: fieldValue,
      };
    } else {
      updatedFormData[activeStep] = {
        ...updatedFormData[activeStep],
        [name]: fieldValue,
      };
    }
    setFamilyFormData(updatedFormData);
  };

  const handleNext = () => {
    //   setIsCoverageAmtDisabled(true);
    //   if (activeStep < familyFormData.length - 1) {
    //     setActiveStep((prevActiveStep) => prevActiveStep + 1);
    //   } else {
    //     // setShowLoader(true);
    //     let familyFloaterInfo = familyFormData.reduce((acc, obj) => {
    //       Object.entries(obj).forEach(([key, value]) => {
    //         if (!acc[key] && key === "amount") {
    //           acc[key] = [coverageAmount];
    //         } else if (!acc[key] && key !== "amount") {
    //           acc[key] = [value];
    //         } else if (acc[key] && key === "amount") {
    //           acc[key].push(coverageAmount);
    //         } else {
    //           acc[key].push(value);
    //         }
    //       });
    //       return acc;
    //     }, {});
    //     const payload = {
    //       txnId: txnId,
    //       formData: {
    //         familyFloaterInfo,
    //       },
    //     };
    //     dispatch(submitInsuranceForm(payload)).then((res) => {
    //       if (res?.payload) {
    //         setShowLoader(false);
    //         const searchPayload = {
    //           environment: environment,
    //           txnId: txnId,
    //         };
    //         dispatch(insuranceSearch(searchPayload)).then((response) => {
    //           setShowLoader(false);
    //           setTimeout(() => {
    //             navigate("insurance-offer");
    //           }, 3000);
    //         });
    //       } else {
    //         setShowLoader(false);
    //         return;
    //       }
    //     });
    //   }
  };

  const handleBack = () => {
    // console.log(activeStep);
    if (activeStep === 1) {
      setIsCoverageAmtDisabled(false);
    } else setIsCoverageAmtDisabled(true);
    if (activeStep > 0) {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleRelationshipChange = (e) => {
    setProposer(e.target.value);
  };

  const handleDialogSubmit = (event) => {
    if (count === 0) {
      setSteps([proposer]);
      setIsCoverageAmtDisabled(false);
    } else {
      setSteps((prevState) => [...prevState, proposer]);
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setIsCoverageAmtDisabled(true);
    }
    setCount(count + 1);
    setFamilyFormData((prevState) => [
      ...prevState,
      {
        id: count,
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        relation: proposer,
        PED: "No",
        diabetes: false,
        bloodPressure: false,
        heartAilments: false,
        other: false,
        gender: "M",
        dob: "",
        amount: coverageAmount,
        panIndia: false,
        pincode: "",
        politicallyExposedPerson: false,
        gstin: "",
        heightfoot: "",
        heightinch: "",
        weight: "",
      },
    ]);

    setOpenDialog(false);
  };

  const handleDeleteForm = (index) => {
    setSteps((prevSteps) => prevSteps.filter((step, i) => i !== index));
    const newArray = familyFormData.filter((item) => item.id !== index);
    setFamilyFormData(newArray);
    setActiveStep((prevActiveStep) =>
      prevActiveStep >= steps.length ? prevActiveStep - 1 : prevActiveStep
    );
  };

  return (
    <InsuranceWrapper>
      <CustomLoader open={showLoader} />
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{ borderBottom: 1, borderColor: "divider", alignItems: "center" }}
        >
          <Tabs value={value} onChange={handleChange} centered>
            <Tab
              icon={<Boy />}
              label="SELF"
              {...a11yProps(0)}
              style={{ marginRight: "50px" }}
            />
            <Tab icon={<FamilyRestroom />} label="FAMILY" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <SelfInsuranceForm tabValue={setValue} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <Box sx={{ width: "100%" }}>
            <Stepper activeStep={activeStep}>
              {steps.map((label, index) => {
                const stepProps = {};
                const labelProps = {};
                return (
                  <Step key={index} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                    <Button onClick={() => handleDeleteForm(index)}>
                      Delete
                    </Button>
                  </Step>
                );
              })}
            </Stepper>
            {activeStep === steps.length ? (
              <>
                <Typography sx={{ mt: 2, mb: 1 }}>
                  All steps completed - you&apos;re finished
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Box sx={{ flex: "1 1 auto" }} />
                  <Button onClick={handleReset}>Reset</Button>
                </Box>
              </>
            ) : (
              <>
                {/* <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography> */}
                <FamilyInsuranceForm
                  handleOpenDialog={() => setOpenDialog(true)}
                  handleCloseDialog={handleCloseDialog}
                  openDialog={openDialog}
                  handleRelationshipChange={handleRelationshipChange}
                  proposer={proposer}
                  handleDialogSubmit={handleDialogSubmit}
                  handleChange={handleForamDataChange}
                  formData={familyFormData[activeStep]}
                  person={familyFormData[activeStep]}
                  isCoverageAmtDisabled={isCoverageAmtDisabled}
                  coverageAmount={coverageAmount}
                />
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    Back
                  </Button>
                  <Box sx={{ flex: "1 1 auto" }} />
                  {steps.map((label, index) => {
                    <Button onClick={() => handleDeleteForm(index)}>
                      Delete
                    </Button>;
                  })}
                  <Button onClick={handleNext}>
                    {activeStep === steps.length - 1 ? "Finish" : "Next"}
                  </Button>
                </Box>
              </>
            )}
          </Box>
        </CustomTabPanel>
      </Box>
    </InsuranceWrapper>
  );
};

export default InsuranceRegistration;
