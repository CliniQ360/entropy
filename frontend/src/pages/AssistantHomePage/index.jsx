import {
  Button,
  Grid,
  IconButton,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import * as React from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import ImageIcon from "@mui/icons-material/Image";
import MicIcon from "../../utils/CustomIcons/MicIcon";
import ChatIcon from "../../utils/CustomIcons/ChatIcon";

// import Micicon from "../../assets/icons/MicIcon.svg";

const PageWrapper = styled("div")(({ theme }) => ({}));
const ImageSectionWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  backgroundColor: "#EAF2FF",
  height: "40vh",
}));
const RedirectionContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-start",
  padding: theme.spacing(2),
}));
const ImageContainerSection = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flex: 1,
  padding: theme.spacing(2),
}));
const HomePageContentWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: "40px 20px",
}));
const TextFeildWrapper = styled(Stack)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(3),
}));
const ActionWrapper = styled(Grid)(({ theme }) => ({
  gap: theme.spacing(2),
  margin: theme.spacing(8, 0),
}));
const ActionContainerItem = styled(Grid)(({ theme }) => ({
  gap: theme.spacing(2),
  display: "flex",
  flexDirection: "column",
  border: "1px solid #0188E8 ",
  backgroundColor: "#EAF2FF",
  padding: theme.spacing(4),
  width: "100%",
}));
const FooterButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  backgroundColor: "#0054BA",
  color: "White",
  fontSize: "1.4rem",
  marginTop: "10px",
  width: "90%",
}));

const FooterButtonWrapper = styled(Stack)(({ theme }) => ({
  position: "absolute",
  bottom: 25,
  left: 0,
  justifyContent: "center",
  alignItems: "center",
  width: "100%", // Ensure full width for horizontal centering
}));

const AssistantHomepage = () => {
  return (
    <PageWrapper>
      <ImageSectionWrapper>
        <RedirectionContainer>
          <IconButton>
            <KeyboardArrowLeftIcon
              sx={{ fontSize: "2.2rem", color: "black" }}
            />
          </IconButton>
        </RedirectionContainer>
        <ImageContainerSection>
          <ImageIcon sx={{ color: "#B4DBFF", fontSize: "2.5rem" }} />
        </ImageContainerSection>
      </ImageSectionWrapper>
      <HomePageContentWrapper>
        <Stack flexDirection={"row"} gap={2} mb={4}>
          <Stack
            sx={{
              borderRadius: "50%",
              height: "10px",
              width: "10px",
              backgroundColor: "#0188E8",
            }}
          ></Stack>
          <Stack
            sx={{
              borderRadius: "50%",
              height: "10px",
              width: "10px",
              backgroundColor: "#1F2024",
            }}
          ></Stack>
          <Stack
            sx={{
              borderRadius: "50%",
              height: "10px",
              width: "10px",
              backgroundColor: "#1F2024",
            }}
          ></Stack>
        </Stack>
        <TextFeildWrapper>
          <Typography
            sx={{
              fontSize: "2rem",
              fontWeight: 700,
              color: "black",
              fontFamily: "plus jakarta sans bold",
            }}
          >
            Lorem Ipsum is simply dummy text
          </Typography>
          <Typography sx={{ fontSize: "1.4rem", color: "#535353" }}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry{" "}
          </Typography>
        </TextFeildWrapper>
        <ActionWrapper container>
          <ActionContainerItem xs={5.8} sm={5.8}>
            <MicIcon />
            <Typography
              sx={{
                fontSize: "1.4rem",
                fontFamily: "plus jakarta sans bold",
              }}
            >
              Audio Experience
            </Typography>
          </ActionContainerItem>
          <ActionContainerItem xs={5.8} sm={5.8}>
            <ChatIcon />{" "}
            <Typography
              sx={{
                fontSize: "1.4rem",
                fontWeight: 600,
                fontFamily: "plus jakarta sans bold",
              }}
            >
              Chat Experience
            </Typography>
          </ActionContainerItem>
        </ActionWrapper>
        <FooterButtonWrapper>
          <FooterButton variant="contained">Get Started</FooterButton>
        </FooterButtonWrapper>
      </HomePageContentWrapper>
    </PageWrapper>
  );
};

export default AssistantHomepage;
