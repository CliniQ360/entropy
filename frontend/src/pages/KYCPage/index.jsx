import React from "react";
import CustomNavbar from "../../components/CustomNavbar";
import AgentHeader from "../../components/AgentHeaderComponent";
import { Stack, styled, Typography } from "@mui/material";

const KYCWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(5),
}));
const KYCPage = () => {
  return (
    <>
      <CustomNavbar />
      <AgentHeader />
      <KYCWrapper>
        <Stack gap={4}>
          <Typography
            sx={{
              fontSize: "1.3rem",
              fontWeight: 700,
              fontFamily: "Plus Jakarta Sans",
            }}
          >
            KYC
          </Typography>
          <Typography
            sx={{
              fontSize: "1.2rem",
              color: "#535353",
              fontFamily: "source sans pro",
            }}
          >
            I, hereby declare that I am voluntarily sharing my Aadhaar Number
            and demographic information issued by UIDAI, with National Health
            Authority (NHA) for the sole purpose of creation of ABHA number . I
            understand that my ABHA number can be used and shared for purposes
            as may be notified by ABDM from time to time including provision of
            healthcare services.
          </Typography>
        </Stack>
      </KYCWrapper>
    </>
  );
};

export default KYCPage;
