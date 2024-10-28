import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";

const SahayakHeaderWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(2),
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
}));
const SahayakHamburger = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));
const SahayakLogo = styled(Typography)(({ theme }) => ({
  fontFamily: "Red Hat Display",
  fontWeight: 700,
  fontSize: "1.6rem",
  marginLeft: 1,
  letterSpacing: "2px",
}));

const SahayakHeader = () => {
  const [open, setOpen] = useState(false);

  /* DRAWER LIST */
  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={() => setOpen(false)}>
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <Drawer open={open} onClose={() => setOpen(false)}>
        {DrawerList}
      </Drawer>
      <SahayakHeaderWrapper>
        <SahayakHamburger>
          <IconButton onClick={() => setOpen(true)}>
            <MenuIcon sx={{ color: "black", fontSize: "2rem" }} />
          </IconButton>
          <SahayakLogo>Sahayak</SahayakLogo>
        </SahayakHamburger>
      </SahayakHeaderWrapper>
    </>
  );
};

export default SahayakHeader;
