import { Divider, Stack, styled, Typography } from "@mui/material";
import React from "react";
import maleAst from "../../assets/v4DesignImages/Patners/maleast.png";
import femaleAst from "../../assets/v4DesignImages/Patners/femaleast.png";
import AudioBarIcon from "../../utils/CustomIcons/BarIcon";

const HeaderComponentWrapper = styled("div")(({ theme }) => ({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: "20px",
}));
const HeaderComponent = styled("div")(({ theme }) => ({
  width: "90%",
  display: "flex",
  flexDirection: "column",
  backgroundColor: "#EAF2FF",
  borderRadius: "10px",
}));
const HeaderIconSection = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: theme.spacing(3, 5),
}));
const ProfileIcon = styled("div")(({ theme }) => ({
  height: "50px",
  width: "50px",
  borderRadius: "50%",
  backgroundImage: `url(${maleAst})`,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
}));

const AgentHeader = () => {
  return (
    <HeaderComponentWrapper>
      <HeaderComponent>
        <HeaderIconSection>
          <Stack
            gap={2}
            flexDirection={"row"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <ProfileIcon />
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: "1.2rem",
                fontFamily: "plus jakarta sans",
                ml: 2,
              }}
            >
              Agent Name
            </Typography>
          </Stack>
          <Stack justifyContent={"center"} alignItems={"center"}>
            <AudioBarIcon />
          </Stack>
        </HeaderIconSection>
        <Divider />
        <Stack alignItems={"center"} justifyContent={"center"} padding={2}>
          <Typography
            sx={{
              color: "#535353",
              fontSize: "0.8rem",
              fontFamily: "source sans pro",
            }}
          >
            Lorem Ipsum has been the industry's standard dummy..
          </Typography>
        </Stack>
      </HeaderComponent>
    </HeaderComponentWrapper>
  );
};

export default AgentHeader;
