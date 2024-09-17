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
import MicIcon from "@mui/icons-material/Mic";
import ForumIcon from "@mui/icons-material/Forum";
// import Micicon from "../../assets/icons/MicIcon.svg";

const PageWrapper = styled("div")(({ theme }) => ({}));
const ImageSectionWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  backgroundColor: "#EAF2FF",
  height: "45vh",
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
  gap: theme.spacing(1),
}));
const ActionWrapper = styled(Grid)(({ theme }) => ({
  gap: theme.spacing(2),
  margin: theme.spacing(3, 0),
}));
const ActionContainerItem = styled(Grid)(({ theme }) => ({
  gap: theme.spacing(2),
  display: "flex",
  flexDirection: "column",
  border: "1px solid #0188E8 ",
  backgroundColor: "#EAF2FF",
  padding: theme.spacing(3),
  width: "100%",
}));
const FooterButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  backgroundColor: "#0054BA",
  color: "White",
  fontSize: "1.4rem",
  marginTop: "10px",
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
            sx={{ fontSize: "2rem", fontWeight: 700, color: "black" }}
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
            <MicIcon sx={{ color: "#0188E8", fontSize: "2rem" }} />
            <Typography sx={{ fontSize: "1.4rem", fontWeight: 600 }}>
              Audio Experience
            </Typography>
          </ActionContainerItem>
          <ActionContainerItem xs={5.8} sm={5.8}>
            <ForumIcon sx={{ color: "#0188E8", fontSize: "2rem" }} />
            <Typography sx={{ fontSize: "1.4rem", fontWeight: 600 }}>
              Chat Experience
            </Typography>
          </ActionContainerItem>
        </ActionWrapper>
        <FooterButton>Get Started</FooterButton>
      </HomePageContentWrapper>
    </PageWrapper>
  );
};

export default AssistantHomepage;
