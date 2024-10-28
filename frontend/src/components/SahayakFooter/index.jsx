import { Divider, IconButton, Stack, styled, Typography } from "@mui/material";
import React from "react";
import logo from "../../assets/v4DesignImages/logo/cliniQLogoWhite.png";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const ShayakFooterWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: theme.spacing(5),
  backgroundColor: "#07192E",
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
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  padding: theme.spacing(2),
}));

const SahayakLogo = styled(Typography)(({ theme }) => ({
  fontFamily: "plus jakarta sans semibold",
  fontWeight: 700,
  fontSize: "1.4rem",
  letterSpacing: "2px",
  color: "white",
}));

const SahayakFooter = () => {
  return (
    <ShayakFooterWrapper>
      <LogosContainer>
        <Stack>
          <SahayakLogo>SAHAYAK</SahayakLogo>
        </Stack>
        <Stack flexDirection={"row"} alignItems={"center"}>
          <IconButton>
            <FaInstagram style={{ color: "white" }} />
          </IconButton>
          <IconButton>
            <FaLinkedin style={{ color: "white" }} />
          </IconButton>
        </Stack>
      </LogosContainer>
      <Divider sx={{ backgroundColor: "#ffffff5c", my: 1 }} />
      <CompanyInfo>
        <Stack>
          {" "}
          <Typography sx={{ color: "white" }}>© 2024 sahayak </Typography>
        </Stack>
        <Stack>
          {" "}
          <Typography sx={{ color: "white" }}>Made with ❤️ in India</Typography>
        </Stack>
      </CompanyInfo>
    </ShayakFooterWrapper>
  );
};

export default SahayakFooter;
