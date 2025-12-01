import { Box, Grid, TextField, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useGetVideoData } from "../hooks/useGetVideoData";
import CircularProgress from "@mui/material/CircularProgress";
import Quiz from "../components/quiz";
import { useEffect, useRef, useState } from "react";

export default function ViewVideo() {
  function formatTime(seconds) {
    const s = Math.floor(Number(seconds));
    const minutes = Math.floor(s / 60);
    const secs = s % 60;
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  }
  const videoRef = useRef(null);
  const { lecName } = useParams();
  const decodedName = decodeURIComponent(lecName);
  const [transcriptIndex, setTranscriptIndex] = useState(0);
  const lineRefs = useRef([]);

  const { data: videoData, isPending } = useGetVideoData(decodedName);
  function handleTimeUpdate(e) {
    let currentTime = e.target.currentTime;
    let cur_index = transcriptIndex;
    while (
      cur_index < videoData?.transcript?.length - 1 &&
      currentTime >= Number(videoData?.transcript[cur_index].end_time)
    ) {
      cur_index++;
    }
    while (
      cur_index > 0 &&
      currentTime < Number(videoData?.transcript[cur_index].start_time)
    ) {
      cur_index--;
    }
    setTranscriptIndex(cur_index);
  }

  function handleClickTranscriptEl(idx) {
    videoRef.current.currentTime = Number(
      videoData?.transcript[idx].start_time
    );
    setTranscriptIndex(idx);
  }

  useEffect(() => {
    if (lineRefs.current[transcriptIndex]) {
      lineRefs.current[transcriptIndex].scrollIntoView({
        behavior: "smooth", // or "auto"
        block: "center", // scrolls the minimal amount to make it visible
      });
    }
  }, [transcriptIndex]);

  if (isPending) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  return (
    <>
      <Grid container justifyContent="center">
        <Typography variant="h4" sx={{ mt: 3 }}>
          {videoData?.itemName.replaceAll("_", " ")}
        </Typography>
      </Grid>
      <Box sx={{ p: 4, display: "flex", justifyContent: "center" }}>
        <Box sx={{ width: "90%" }}>
          {/* Video + Transcript row */}
          <Grid
            container
            spacing={2}
            alignItems="center"
            justifyContent="center"
          >
            {/* Video Player */}
            <Grid item xs={9}>
              <Box
                sx={{
                  bgcolor: "#000",
                  height: 500,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <video
                  src={videoData?.videoUrl}
                  controls
                  ref={videoRef}
                  onTimeUpdate={handleTimeUpdate}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              </Box>
            </Grid>

            {/* Transcript Panel */}
            <Grid item xs={3}>
              <Box
                sx={{
                  height: "450px",
                  width: "300px",
                  overflowY: "scroll",
                  border: "1px solid #aaa",
                  p: 2,
                }}
              >
                {videoData?.transcript?.map((el, idx) => {
                  const start = formatTime(el.start_time);
                  const end = formatTime(el.end_time);
                  const active = idx === transcriptIndex;
                  return (
                    <Typography
                      ref={(el) => (lineRefs.current[idx] = el)}
                      key={el.id}
                      onClick={() => handleClickTranscriptEl(idx)}
                      sx={{
                        border: "1px solid #ccc",
                        borderRadius: "8px",
                        p: 1.5,
                        mb: 2,
                        fontSize: "0.9rem",
                        backgroundColor: active ? "#b2d2e7" : "#fafafa",
                        transform: active ? "scale(1.05)" : "",
                        transition: "all 0.2s ease",
                        cursor: "pointer",
                        "&:hover": {
                          backgroundColor: "#f0f0f0",
                          boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                          transform: "scale(1.02)",
                        },
                      }}
                    >
                      {start} - {end}: {el.transcript}
                    </Typography>
                  );
                })}
              </Box>
            </Grid>
          </Grid>

          {/* Summary */}
          <Box
            sx={{ mt: 4, p: 2, border: "1px solid #aaa", textAlign: "center" }}
          >
            <Typography variant="h6">Summary</Typography>
            <Typography>{videoData?.summaryText}</Typography>
          </Box>

          <Quiz quiz={videoData?.quiz || []} />
        </Box>
      </Box>
    </>
  );
}
