import React from "react";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { Stack, styled, Dialog, Typography } from "@mui/material";
import ReloadIcon from "../../utils/CustomIcons/ReloadIcon";

const DialogContentSection = styled(Stack)(({ theme }) => ({
  justifyContent: "center",
  alignItems: "center",
  gap: theme.spacing(1),
  padding: theme.spacing(5),
}));
const LogoSectionWrapper = styled(Stack)(({ theme }) => ({
  justifyContent: "center",
  alignItems: "center",
  marginBottom: "20px",
}));
const LogoSectionItem = styled(Stack)(({ theme }) => ({
  justifyContent: "center",
  alignItems: "center",
  padding: theme.spacing(2),
  height: "40px",
  width: "40px",
  borderRadius: "5px",
  border: "2px solid #D2D2D2 ",
}));

const RedirectionDialogComponent = ({ open, setRedirectionVal }) => {
  const handleClose = () => {
    setRedirectionVal(false);
  };
  const activeLanguage = sessionStorage.getItem("activeLanguage");

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          backdropFilter: "blur(3px)",
          backgroundColor: "rgba(0, 0, 0, 0.3)",
        }}
      >
        <DialogContentSection>
          <LogoSectionWrapper>
            <LogoSectionItem>
              <ReloadIcon />
            </LogoSectionItem>
          </LogoSectionWrapper>
          <Typography
            sx={{
              fontSize: "1.1rem",
              fontWeight: 700,
              fontFamily: "plus jakarta sans",
            }}
          >
            {activeLanguage === "hi"
              ? "कृपया बाहर न निकलें या वापस न जाएं ।"
              : "Please don’t exit or press back"}{" "}
          </Typography>
          <Typography
            sx={{
              fontSize: "0.9rem",
              fontFamily: "Inter",
              textAlign: "center",
            }}
          >
            {activeLanguage === "hi"
              ? "कृपया पुनः निर्देशण प्रक्रिया पूरी करें !"
              : "Please complete the redirection flow!"}
          </Typography>
        </DialogContentSection>
      </Dialog>
    </>
  );
};

export default RedirectionDialogComponent;
