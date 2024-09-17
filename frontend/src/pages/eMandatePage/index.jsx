import { Stack, styled, Typography } from "@mui/material";
import React, { useState } from "react";
import CustomNavbar from "../../components/CustomNavbar";
import AgentHeader from "../../components/AgentHeaderComponent";
import SubmitDialogBox from "../../components/SubmitDialogComponent";

const EMandateWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(5),
}));
const EmandatePage = () => {
  const [open, setOpen] = useState(true);
  return (
    <>
      <SubmitDialogBox open={open} setOpen={setOpen} />
      <EMandateWrapper>
        <Stack gap={4}>
          <Typography
            sx={{
              fontSize: "1.3rem",
              fontWeight: 700,
              fontFamily: "Plus Jakarta Sans",
            }}
          >
            E-Mandate
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
      </EMandateWrapper>
    </>
  );
};

export default EmandatePage;
