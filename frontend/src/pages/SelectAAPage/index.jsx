import {
  Box,
  Button,
  FormControl,
  FormLabel,
  styled,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import finvuLogo from "../../assets/v4DesignImages/logo/finvuLogo.png";

const SelectAAContainer = styled(Box)(({ theme }) => ({
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
  gap: theme.spacing(2), // Reduce spacing to match your design
}));

const CustomButton = styled(Button)(({ theme }) => ({
  width: "100%",
  padding: theme.spacing(4),
  justifyContent: "flex-start",
  textTransform: "none",
  fontSize: "16px",
  border: `1px solid #9E9E9E`,
  color: theme.palette.text.primary,
  boxShadow: "none",
  gap: theme.spacing(4),
}));

const SelectAAPage = () => {
  const [formData, setFormData] = useState({
    aa_id: "",
    bureauConsent: "",
  });

  const theme = useTheme();

  const accountAggregators = [
    { id: "Finvu", name: "Finvu", img: finvuLogo },
    { id: "Finvu1", name: "Finvu", img: finvuLogo },
    { id: "Finvu2", name: "Finvu", img: finvuLogo },
  ];

  return (
    <SelectAAContainer>
      <DocumentHeaderSection>
        <Typography
          sx={{ fontSize: "1.4rem", fontWeight: 700, textAlign: "left" }}
        >
          Select Account Aggregator
        </Typography>
        <Typography
          sx={{ fontSize: "1rem", color: "#535353", textAlign: "left" }}
        >
          Please select the account aggregator from the list below:
        </Typography>
      </DocumentHeaderSection>

      <FormControl fullWidth>
        <FormContainer>
          {accountAggregators.map((aggregator) => (
            <CustomButton
              startIcon={
                <img src={aggregator.img} alt="img" height={24} width={48} />
              }
              variant="outlined"
              key={aggregator.id}
              onClick={() =>
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  aa_id: aggregator.id,
                }))
              }
            >
              {aggregator.name}
            </CustomButton>
          ))}
        </FormContainer>
      </FormControl>
    </SelectAAContainer>
  );
};

export default SelectAAPage;
