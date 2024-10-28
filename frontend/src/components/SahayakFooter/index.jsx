import { Divider, IconButton, Stack, styled, Typography } from "@mui/material";
import React from "react";
import logo from "../../assets/v4DesignImages/logo/cliniQLogoWhite.png";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const ShayakFooterWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: theme.spacing(5),
  backgroundColor: "#000000",
}));
const LogosContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  padding: theme.spacing(2),
}));

const CompanyInfo = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: theme.spacing(2),
}));

const SahayakFooter = () => {
  return (
    <ShayakFooterWrapper>
      <LogosContainer>
        <Stack>
          <img
            alt="ClinQ360 Logo"
            className="object-contain"
            src={logo}
            width={153}
          />
        </Stack>
        <Stack flexDirection={"row"} alignItems={"center"}>
          <IconButton>
            <FaFacebook style={{ color: "white" }} />
          </IconButton>
          <IconButton>
            <FaTwitter style={{ color: "white" }} />
          </IconButton>
          <IconButton>
            <FaInstagram style={{ color: "white" }} />
          </IconButton>
          <IconButton>
            <FaLinkedin style={{ color: "white" }} />
          </IconButton>
        </Stack>
      </LogosContainer>
      <Divider sx={{ backgroundColor: "white", mt: 3 }} />
      <CompanyInfo>
        <Typography sx={{ color: "white" }}>
          Powered by cliniQ360 – Crafted with love in India.
        </Typography>
        <Typography sx={{ color: "#535353" }}>© 2023 clinq360</Typography>
      </CompanyInfo>
    </ShayakFooterWrapper>
  );
};

export default SahayakFooter;
