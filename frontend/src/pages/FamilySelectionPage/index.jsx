import {
  Box,
  Card,
  CardContent,
  Grid,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import React from "react";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import PersonIcon from "@mui/icons-material/Person";

const FamilySectionWrapper = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(4),
}));

const WelcomeStylingTypography = styled(Typography)(({ theme }) => ({
  padding: theme.spacing(2),
  fontFamily: "Pacifico",
  fontSize: "2.5rem",
  textAlign: "center",
}));

const InsuranceCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: theme.shadows[4],
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: theme.spacing(2),
}));

const CardContentArr = [
  {
    Icon: FamilyRestroomIcon,
    title: "Family Insurance",
    body: "Comprehensive coverage for your entire family under one plan. Protect your loved ones with a single policy.",
  },
  {
    Icon: PersonIcon,
    title: "Self Insurance",
    body: "Tailored coverage focused on your individual needs. Get personalized protection for your health and well-being.",
  },
];

const FamilySelectionPage = () => {
  return (
    <FamilySectionWrapper>
      <WelcomeStylingTypography>
        Welcome to Insurance Page
      </WelcomeStylingTypography>
      <Typography
        variant="body1"
        sx={{
          fontSize: "1.2rem",
          color: "#565656",
          textAlign: "center",
          marginTop: "10px",
        }}
      >
        Please choose the insurance type that best suits your needs: Family
        Insurance for covering loved ones under one plan, or Self Insurance for
        individual coverage focused on your personal health.
      </Typography>
      <Grid container spacing={4} justifyContent="center" mt={3}>
        {CardContentArr.map((item, index) => (
          <Grid item xs={12} sm={6} md={5} key={index}>
            <InsuranceCard>
              <CardContent>
                <IconWrapper>
                  <item.Icon sx={{ fontSize: 60, color: "primary.main" }} />
                </IconWrapper>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  align="center"
                  sx={{
                    fontSize: "1.5rem",
                    fontFamily: "plus jakarta sans bold",
                  }}
                >
                  {item.title}
                </Typography>
                <Typography
                  align="center"
                  sx={{
                    fontSize: "1.2rem",
                    color: "#565656",
                  }}
                >
                  {item.body}
                </Typography>
              </CardContent>
            </InsuranceCard>
          </Grid>
        ))}
      </Grid>
    </FamilySectionWrapper>
  );
};

export default FamilySelectionPage;
