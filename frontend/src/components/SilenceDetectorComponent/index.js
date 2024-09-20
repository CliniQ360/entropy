export const createSilenceDetector = ({
  noiseThreshold = 10,
  silenceDurationThreshold = 3000,
  onSilence,
}) => {
  const audioContextRef = { current: null };
  const analyserRef = { current: null };
  const silenceStart = { current: null };
  let running = false; // Flag to control detection
  let silenceDetected = false; // New flag to track silence detection

  const initAudioAnalyser = () => {
    return navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const audioContext = new (window.AudioContext ||
          window.webkitAudioContext)();
        const analyser = audioContext.createAnalyser();
        const source = audioContext.createMediaStreamSource(stream);
        source.connect(analyser);

        audioContextRef.current = audioContext;
        analyserRef.current = analyser;
      })
      .catch((error) => {
        console.error("Microphone access denied:", error);
      });
  };

  const checkForSilence = () => {
    if (!running) return; // Stop the loop if not running

    const analyser = analyserRef.current;
    if (!analyser) return;

    const dataArray = new Uint8Array(analyser.fftSize);
    analyser.getByteTimeDomainData(dataArray);

    const rms = Math.sqrt(
      dataArray.reduce((sum, value) => sum + (value - 128) ** 2, 0) /
        dataArray.length
    );

    const isSilent = rms < noiseThreshold;

    if (isSilent && !silenceDetected) {
      if (!silenceStart.current) {
        silenceStart.current = Date.now(); // Start the silence timer
      } else if (Date.now() - silenceStart.current > silenceDurationThreshold) {
        onSilence(); // Trigger onSilence only once
        silenceDetected = true; // Set silence detected flag to prevent multiple calls
        silenceStart.current = null; // Reset silence start time
      }
    } else if (!isSilent) {
      silenceStart.current = null; // Reset the timer if sound is detected
      silenceDetected = false; // Reset silence detection flag
    }

    requestAnimationFrame(checkForSilence); // Continue looping
  };

  const start = async () => {
    await initAudioAnalyser();
    running = true; // Mark detector as running
    checkForSilence();
  };

  const stop = () => {
    running = false; // Mark detector as not running
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
  };

  return { start, stop };
};
