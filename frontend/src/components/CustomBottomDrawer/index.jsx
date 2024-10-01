import * as React from "react";
import PropTypes from "prop-types";
import { Global } from "@emotion/react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { grey } from "@mui/material/colors";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { MediaContext } from "../../context/mediaContext";

const drawerBleeding = 0;

const Root = styled("div")(({ theme }) => ({
  height: "100%",
  backgroundColor: grey[100],
}));

const StyledBox = styled("div")(({ theme }) => ({
  backgroundColor: "#fff",
}));

const ChatContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: 8,
  overflowY: "scroll",
  maxHeight: `350px`,
  padding: "24px 16px",
  margin: "16px 0px",
}));

const InputContainer = styled("div")(({ theme, type }) => ({
  display: "flex",
  justifyContent: type === "user" ? "flex-end" : "flex-start",
  marginBottom: 10,
}));

const MessageContainer = styled(Typography)(({ theme, type }) => ({
  fontSize: "14px",
  fontFamily: "Inter",
  backgroundColor: type === "user" ? "#EAF2FF" : "#F5F9FF",
  padding: "10px",
  borderRadius: "10px",
  color: "black",
  width: "fit-content",
  maxWidth: "90%",
}));

const Puller = styled("div")(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: grey[300],
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
}));

const CustomDrawer = ({ open, setDrawerOpen, window }) => {
  const { chats } = React.useContext(MediaContext);
  const container =
    window !== undefined ? () => window().document.body : undefined;

  const chatContainerRef = React.useRef(null);

  React.useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chats]);

  return (
    <Root>
      <CssBaseline />
      <Global
        styles={{
          ".MuiDrawer-root > .MuiPaper-root": {
            height: `calc(60% - ${drawerBleeding}px)`,
            overflow: "visible",
          },
        }}
      />
      <SwipeableDrawer
        container={container}
        anchor="bottom"
        open={open}
        onClose={() => setDrawerOpen(false)}
        onOpen={() => setDrawerOpen(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
      >
        {chats && chats.length > 0 ? (
          <StyledBox
            ref={chatContainerRef}
            sx={{
              position: "absolute",
              top: -drawerBleeding,
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              right: 0,
              left: 0,
            }}
          >
            <Puller />
            <ChatContainer>
              {chats.map((chat, index) => (
                <React.Fragment key={index}>
                  {chat.sender === "user" ? (
                    <InputContainer type="user">
                      <MessageContainer type="user">
                        {chat.message}
                      </MessageContainer>
                    </InputContainer>
                  ) : (
                    <InputContainer type="agent">
                      <MessageContainer type="agent">
                        {chat.message}
                      </MessageContainer>
                    </InputContainer>
                  )}
                </React.Fragment>
              ))}
            </ChatContainer>
          </StyledBox>
        ) : (
          <StyledBox sx={{ height: "100%", overflow: "auto" }}>
            <Skeleton variant="rectangular" height="100%" />
          </StyledBox>
        )}
      </SwipeableDrawer>
    </Root>
  );
};

CustomDrawer.propTypes = {
  window: PropTypes.func,
  open: PropTypes.bool.isRequired,
  setDrawerOpen: PropTypes.func.isRequired,
};

export default CustomDrawer;
