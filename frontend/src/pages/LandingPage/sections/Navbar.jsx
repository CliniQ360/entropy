import {
  Button,
  Divider,
  Drawer,
  FormControl,
  IconButton,
  List,
  MenuItem,
  Select,
  Typography,
  useTheme,
  Stack,
  styled,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MenuIcon from "@mui/icons-material/Menu";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import { useNavigate } from "react-router-dom";

const NavbarHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(2),
}));

const NavbarLogo = styled("div")(({ theme }) => ({
  padding: theme.spacing(1),
  marginLeft: theme.spacing(2),
}));
const NavbarAction = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(1),
  flexDirection: "row",
  gap: theme.spacing(3),
  justifyContent: "center",
  alignItems: "center",
  [theme.breakpoints.down("md")]: {
    gap: theme.spacing(1),
    marginLeft: 2,
    flexDirection: "column",
  },
}));

const SelectBar = styled(Select)(({ theme }) => ({
  backgroundColor: "#F1F1F1",
  border: "none", // Removes the outer border
  borderRadius: "30px",
  fontWeight: 700,
  color: "#1976d2",
  width: "100%",
  height: "45px",
  padding: "5px 10px",
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  "&:focus": {
    border: "none",
  },
  "& .MuiSelect-select": {
    border: "none",
  },
}));
export const Navbar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleOpenDrawer = () => {
    console.log("hello");
    setOpenDrawer(true);
  };
  return (
    <>
      <NavbarHeader>
        <NavbarLogo>
          <Typography
            fontFamily={"Red Hat Display"}
            variant="h4"
            fontSize="1.7rem"
            fontWeight={600}
          >
            cliniQ360
          </Typography>
        </NavbarLogo>
        <NavbarAction>
          {!isMobile ? (
            <>
              <Button
                variant="contained"
                onClick={() => navigate("/route-1")}
                sx={{
                  backgroundColor: "#0054BA",
                  textTransform: "none",
                  paddingX: 3,
                  fontWeight: 600,
                  fontSize: "1rem",
                }}
              >
                Apply for Loan
              </Button>
              <Button
                variant="contained"
                onClick={() => navigate("/insurance/register")}
                sx={{
                  backgroundColor: "#0054BA",
                  textTransform: "none",
                  paddingX: 3,
                  fontWeight: 600,
                  fontSize: "1rem",
                }}
              >
                Apply for Insurance
              </Button>
            </>
          ) : (
            <>
              <IconButton onClick={() => handleOpenDrawer()}>
                <MenuIcon />
              </IconButton>
            </>
          )}
        </NavbarAction>
      </NavbarHeader>

      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        PaperProps={{
          sx: {
            padding: theme.spacing(3, 1),
            width: "300px",
            backgroundColor: "#FAFAFA",
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
          },
        }}
      >
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate("/route-1")}>
              <ListItemIcon>
                <CreditScoreIcon sx={{ color: "#1976d2" }} />
              </ListItemIcon>
              <Typography fontWeight={700} fontSize={"1rem"} color={"#1976d2"}>
                Apply for Loan
              </Typography>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate("/insurance/register")}>
              <ListItemIcon>
                <HealthAndSafetyIcon sx={{ color: "#1976d2" }} />
              </ListItemIcon>
              <Typography fontWeight={700} fontSize={"1rem"} color={"#1976d2"}>
                Apply for Insurance
              </Typography>
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
      </Drawer>
    </>
  );
};
