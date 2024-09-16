import { Box, Grid, Typography } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { useBoundStore } from "../../../stores";
import { Fragment, useEffect, useRef } from "react";
import IconButton from "@mui/material/IconButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CycloneIcon from "@mui/icons-material/Cyclone";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import CircularProgress from "@mui/material/CircularProgress";

const item = {
  py: "2px",
  px: 3,
  color: "rgba(255, 255, 255, 0.7)",
  "&:hover, &:focus": {
    bgcolor: "rgba(255, 255, 255, 0.08)",
  },
};

const itemCategory = {
  boxShadow: "0 -1px 0 rgb(255,255,255,0.1) inset",
  py: 1.5,
  px: 3,
};

export default function Navigator(props) {
  const { ...other } = props;
  const chatMessages = useBoundStore((state) => state.chatMessages);

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem
          sx={{ ...item, ...itemCategory, fontSize: 22, color: "#fff" }}
        >
          CliniQ360 - Entropy
        </ListItem>
      </List>
      <Box
        sx={{ flex: 1, display: "flex", flexDirection: "column", padding: 2 }}
      >
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "end",
          }}
        >
          <Grid container>
            {chatMessages.map(({ id, message, msg_from }) => {
              return (
                <Fragment key={id}>
                  <Grid
                    item
                    xs={1}
                    sx={{
                      borderTop: "1px solid #2222",
                      alignItem: "center",
                      justifyContent: "center",
                      display: "flex",
                    }}
                  >
                    {msg_from === "user" && (
                      <AccountCircleIcon
                        style={{ marginTop: "10px", color: "darkgray" }}
                      />
                    )}
                    {msg_from === "gpt" && (
                      <CycloneIcon
                        style={{ marginTop: "10px", color: "darkgray" }}
                      />
                    )}
                  </Grid>
                  <Grid item xs={11} sx={{ borderTop: "1px solid #2222" }}>
                    <Typography
                      sx={{ my: 1.5, mx: 1, whiteSpace: "pre-line" }}
                      color="white"
                    >
                      {message}
                    </Typography>
                  </Grid>
                </Fragment>
              );
            })}
          </Grid>
        </Box>
      </Box>
    </Drawer>
  );
}
