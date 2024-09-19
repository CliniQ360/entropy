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

const SubmitDialogBox = ({ open, setOpen }) => {
  const handleClose = () => {
    setOpen(false);
  };
  return (
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
        <Typography
          sx={{
            fontSize: "1.25rem",
            fontWeight: 700,
            fontFamily: "plus jakarta sans bold",
          }}
        >
          Are you sure you want to submit?
        </Typography>
        <Typography
          sx={{
            fontSize: "0.9rem",
            fontFamily: "Inter",
            textAlign: "center",
          }}
        >
          If everything looks correct, click “Yes, Submit” to proceed. If you
          need to make any changes, click “No” to go back.
        </Typography>
      </DialogContentSection>
      <DialogActionSection>
        <CustomOutlinedButton onClick={() => setOpen(false)}>
          No
        </CustomOutlinedButton>
        <CustomContainedButton>Yes, Submit</CustomContainedButton>
      </DialogActionSection>
    </Dialog>
  );
};

export default SubmitDialogBox;
