import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, Stack, styled, Typography } from "@mui/material";

const DialogContentSection = styled(Stack)(({ theme }) => ({
  justifyContent: "center",
  alignItems: "center",
  gap: theme.spacing(1),
  padding: theme.spacing(5),
}));
const DialogActionSection = styled(Stack)(({ theme }) => ({
  gap: theme.spacing(2),
  padding: theme.spacing(4),
}));
const CustomOutlinedButton = styled(Button)(({ theme, buttonType }) => ({
  gap: theme.spacing(2),
  variants: "outlined",
  border: "1px solid #0561A0",
  borderRadius: "8px",
  color: "#0561A0",
  textTransform: "none",
  fontFamily: "plus jakarta sans bold",
  fontWeight: 500,
  fontSize: "1rem",
}));
const CustomContainedButton = styled(Button)(({ theme, buttonType }) => ({
  gap: theme.spacing(2),
  border: "1px solid #0561A0",
  backgroundColor: "#0054BA",
  borderRadius: "8px",
  color: "white",
  textTransform: "none",
  fontFamily: "plus jakarta sans bold",
  fontWeight: 500,
  fontSize: "1rem",
}));

const SubmitDialogBox = ({
  confirmation,
  setConfirmation,
  handlePaymentDialogSubmit,
}) => {
  const handleClose = () => {
    setConfirmation(false);
  };
  const activeLanguage = sessionStorage.getItem("activeLanguage");

  return (
    <Dialog
      open={confirmation}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{
        backdropFilter: "blur(3px)",
        backgroundColor: "rgba(0, 0, 0, 0.3)",
      }}
    >
      <DialogContentSection>
        <Typography
          sx={{
            fontSize: "1.25rem",
            fontWeight: 700,
            fontFamily: "plus jakarta sans bold",
          }}
        >
          {activeLanguage === "hi"
            ? "क्या आप निश्चित रूप से सबमिट करना चाहते हैं?"
            : "Are you sure you want to submit?"}
        </Typography>
        <Typography
          sx={{
            fontSize: "0.9rem",
            fontFamily: "Inter",
            textAlign: "center",
          }}
        >
          {activeLanguage === "hi"
            ? "यदि सब कुछ सही लग रहा है, तो आगे बढ़ने के लिए “हाँ, सबमिट करें” पर क्लिक करें। यदि आपको कोई परिवर्तन करने की आवश्यकता है, तो वापस जाने के लिए “नहीं” पर क्लिक करें ।"
            : "If everything looks correct, click “Yes, Submit” to proceed. If you need to make any changes, click “No” to go back."}
        </Typography>
      </DialogContentSection>
      <DialogActionSection>
        <CustomOutlinedButton onClick={() => setConfirmation(false)}>
          {activeLanguage === "hi" ? "नहीं" : " No"}
        </CustomOutlinedButton>
        <CustomContainedButton onClick={() => handlePaymentDialogSubmit("YES")}>
          {activeLanguage === "hi" ? "हाँ, सबमिट करें" : "Yes, Submit"}
        </CustomContainedButton>
      </DialogActionSection>
    </Dialog>
  );
};

export default SubmitDialogBox;
