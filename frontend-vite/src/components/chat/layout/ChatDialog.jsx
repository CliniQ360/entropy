import { useEffect, useRef } from "react";
import { useState, Fragment } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import MicIcon from "@mui/icons-material/Mic";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { useBoundStore } from "../../../stores";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CycloneIcon from "@mui/icons-material/Cyclone";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { Stack, TextField } from "@mui/material";

function CustomizedInputBase() {
  const sendChatMessageAsync = useBoundStore(
    (state) => state.sendChatMessageAsync
  );
  const pendingResponse = useBoundStore((state) => state.pendingResponse);
  const initChatWebSocket = useBoundStore((state) => state.initChatWebSocket);
  const currWebSocket = useBoundStore((state) => state.currWebSocket);
  const [message, setMessage] = useState("");
  const [openSnack, setOpenSnack] = useState(false);

  useEffect(() => {
    initChatWebSocket();
    return () => {
      try {
        currWebSocket.close();
      } catch (err) {
        // log
      }
    };
  }, []);

  const clickHandler = async (e) => {
    if (message.trim().length == 0) return;
    setMessage("");
    sendChatMessageAsync(message);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      clickHandler(event);
    }
  };
  const handleCloseSnack = () => {
    setOpenSnack(false);
  };

  const [recording, setRecording] = useState(false);
  const [transcriptionText, setTranscriptionText] = useState("");
  const mediaRecorderRef = useRef(null);
  const audioChunks = useRef([]);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const silenceStart = useRef(null);
  const silenceDurationThreshold = 3000;
  const noiseThreshold = 10;

  useEffect(() => {
    if (recording) {
      checkForSilence();
    }
    return () => {
      if (recording) {
        stopRecording();
      }
    };
  }, [recording]);

  const startRecording = () => {
    audioChunks.current = [];
    silenceStart.current = null;
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;

        const audioContext = new (window.AudioContext ||
          window.webkitAudioContext)();
        const analyser = audioContext.createAnalyser();
        const source = audioContext.createMediaStreamSource(stream);
        source.connect(analyser);

        audioContextRef.current = audioContext;
        analyserRef.current = analyser;

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunks.current.push(event.data);
          }
        };

        mediaRecorder.onstop = () => {
          if (audioChunks.current.length > 0) {
            const audioBlob = new Blob(audioChunks.current, {
              type: "audio/wav",
            });
            sttPost(audioBlob);
          }
        };

        mediaRecorder.start();
        setRecording(true);
      })
      .catch((error) => {
        console.error("Microphone access denied:", error);
      });
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && recording) {
      mediaRecorderRef.current.stop();
      if (
        audioContextRef.current &&
        audioContextRef.current.state !== "closed"
      ) {
        audioContextRef.current.close();
      }
      setRecording(false);
    }
  };

  const BaseURL = "http://localhost:8001/";

  const sttPost = async (audioBlob) => {
    if (audioBlob && audioBlob.size > 0) {
      const audioFile = new File([audioBlob], "recording.wav", {
        type: "audio/wav",
      });
      try {
        const formData = new FormData();
        formData.append("audioFile", audioFile);

        const response = await axios.post(
          `${BaseURL}v1/transcribe-audio`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        if (response) {
          sendChatMessageAsync(response.data.transcribedText);
        }
        const transcriptionText = response.data.transcribedText;
        setTranscriptionText(transcriptionText);
      } catch (error) {
        console.error("Error during transcription:", error);
      }
    } else {
      console.error("AudioBlob is empty or null");
    }
  };

  const checkForSilence = () => {
    const analyser = analyserRef.current;
    if (!analyser) return;

    const dataArray = new Uint8Array(analyser.fftSize);
    analyser.getByteTimeDomainData(dataArray);

    const rms = Math.sqrt(
      dataArray.reduce((sum, value) => sum + (value - 128) ** 2, 0) /
        dataArray.length
    );

    const isSilent = rms < noiseThreshold;

    if (isSilent) {
      if (!silenceStart.current) {
        silenceStart.current = Date.now();
      } else if (Date.now() - silenceStart.current > silenceDurationThreshold) {
        stopRecording();
      }
    } else {
      silenceStart.current = null;
    }

    if (recording) {
      setTimeout(checkForSilence, 100);
    }
  };

  return (
    <Paper
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: "auto",
      }}
    >
      <InputBase
        onChange={(event) => {
          setMessage(event.target.value);
        }}
        id="message_box"
        onKeyDown={handleKeyDown}
        value={message}
        sx={{ ml: 1, flex: 1 }}
        placeholder="Send message"
        disabled={pendingResponse}
        inputRef={(input) => {
          if (input != null) {
            input.focus();
          }
        }}
      />
      <IconButton
        id="send_message"
        disabled={pendingResponse}
        onClick={clickHandler}
        type="button"
        sx={{ p: "10px" }}
        aria-label="search"
      >
        {!pendingResponse && <PlayArrowIcon id="send_ok" />}
        {pendingResponse && <CircularProgress size="1rem" />}
      </IconButton>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton
        disabled={false}
        color="primary"
        sx={{ p: "10px" }}
        aria-label="directions"
        onClick={startRecording}
      >
        <MicIcon />
      </IconButton>
      <IconButton
        disabled={false}
        color="primary"
        sx={{ p: "10px" }}
        aria-label="directions"
        onClick={stopRecording}
      >
        <StopCircleIcon />
      </IconButton>
      <Snackbar
        open={openSnack}
        autoHideDuration={6000}
        onClose={handleCloseSnack}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          Error sending message
        </Alert>
      </Snackbar>
    </Paper>
  );
}

const ChatDialog = () => {
  const formData = useBoundStore((state) => state.formData);
  console.log(formData);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, flex: 1 }}>
      <Stack sx={{ padding: 2, gap: 3 }}>
        <TextField
          variant="outlined"
          label="First Name"
          value={formData.first_name}
          InputProps={{
            readOnly: true,
          }}
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
        />
        <TextField
          variant="outlined"
          label="Last Name"
          value={formData.last_name}
          InputProps={{
            readOnly: true,
          }}
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
        />
        <TextField
          variant="outlined"
          label="Mobile Number"
          value={formData.mobile_number}
          InputProps={{
            readOnly: true,
          }}
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
        />
        <TextField
          variant="outlined"
          label="Gender"
          value={formData.gender}
          InputProps={{
            readOnly: true,
          }}
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
        />
      </Stack>
      <Box sx={{ p: 1, bgcolor: "#eaeff1", marginTop: "auto" }}>
        <CustomizedInputBase />
      </Box>
    </Box>
  );
};

export default ChatDialog;
