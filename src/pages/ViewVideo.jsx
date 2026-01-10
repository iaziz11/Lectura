// import { Box, Grid, TextField, Typography } from "@mui/material";
// import { useParams } from "react-router-dom";
// import { useGetVideoData } from "../hooks/useGetVideoData";
// import CircularProgress from "@mui/material/CircularProgress";
// import Quiz from "../components/quiz";
// import { useEffect, useRef, useState } from "react";

// export default function ViewVideo() {
//   function formatTime(seconds) {
//     const s = Math.floor(Number(seconds));
//     const minutes = Math.floor(s / 60);
//     const secs = s % 60;
//     return `${minutes}:${secs.toString().padStart(2, "0")}`;
//   }
//   const videoRef = useRef(null);
//   const { lecName } = useParams();
//   const decodedName = decodeURIComponent(lecName);
//   const [transcriptIndex, setTranscriptIndex] = useState(0);
//   const lineRefs = useRef([]);

//   const { data: videoData, isPending } = useGetVideoData(decodedName);
//   function handleTimeUpdate(e) {
//     let currentTime = e.target.currentTime;
//     let cur_index = transcriptIndex;
//     while (
//       cur_index < videoData?.transcript?.length - 1 &&
//       currentTime >= Number(videoData?.transcript[cur_index].end_time)
//     ) {
//       cur_index++;
//     }
//     while (
//       cur_index > 0 &&
//       currentTime < Number(videoData?.transcript[cur_index].start_time)
//     ) {
//       cur_index--;
//     }
//     setTranscriptIndex(cur_index);
//   }

//   function handleClickTranscriptEl(idx) {
//     videoRef.current.currentTime = Number(
//       videoData?.transcript[idx].start_time
//     );
//     setTranscriptIndex(idx);
//   }

//   useEffect(() => {
//     if (lineRefs.current[transcriptIndex]) {
//       lineRefs.current[transcriptIndex].scrollIntoView({
//         behavior: "smooth", // or "auto"
//         block: "center", // scrolls the minimal amount to make it visible
//       });
//     }
//   }, [transcriptIndex]);

//   if (isPending) {
//     return (
//       <Box
//         sx={{
//           height: "100vh",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//         <CircularProgress />
//       </Box>
//     );
//   }
//   return (
//     <>
//       <Grid container justifyContent="center">
//         <Typography variant="h4" sx={{ mt: 3 }}>
//           {videoData?.itemName.replaceAll("_", " ")}
//         </Typography>
//       </Grid>
//       <Box sx={{ p: 4, display: "flex", justifyContent: "center" }}>
//         <Box sx={{ width: "90%" }}>
//           {/* Video + Transcript row */}
//           <Grid
//             container
//             spacing={2}
//             alignItems="center"
//             justifyContent="center"
//           >
//             {/* Video Player */}
//             <Grid item xs={9}>
//               <Box
//                 sx={{
//                   bgcolor: "#000",
//                   height: 500,
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                 }}
//               >
//                 <video
//                   src={videoData?.videoUrl}
//                   controls
//                   ref={videoRef}
//                   onTimeUpdate={handleTimeUpdate}
//                   style={{
//                     width: "100%",
//                     height: "100%",
//                     objectFit: "contain",
//                   }}
//                 />
//               </Box>
//             </Grid>

//             {/* Transcript Panel */}
//             <Grid item xs={3}>
//               <Box
//                 sx={{
//                   height: "450px",
//                   width: "300px",
//                   overflowY: "scroll",
//                   border: "1px solid #aaa",
//                   p: 2,
//                 }}
//               >
//                 {videoData?.transcript?.map((el, idx) => {
//                   const start = formatTime(el.start_time);
//                   const end = formatTime(el.end_time);
//                   const active = idx === transcriptIndex;
//                   return (
//                     <Typography
//                       ref={(el) => (lineRefs.current[idx] = el)}
//                       key={el.id}
//                       onClick={() => handleClickTranscriptEl(idx)}
//                       sx={{
//                         border: "1px solid #ccc",
//                         borderRadius: "8px",
//                         p: 1.5,
//                         mb: 2,
//                         fontSize: "0.9rem",
//                         backgroundColor: active ? "#b2d2e7" : "#fafafa",
//                         transform: active ? "scale(1.05)" : "",
//                         transition: "all 0.2s ease",
//                         cursor: "pointer",
//                         "&:hover": {
//                           backgroundColor: "#f0f0f0",
//                           boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
//                           transform: "scale(1.02)",
//                         },
//                       }}
//                     >
//                       {start} - {end}: {el.transcript}
//                     </Typography>
//                   );
//                 })}
//               </Box>
//             </Grid>
//           </Grid>

//           {/* Summary */}
//           <Box
//             sx={{ mt: 4, p: 2, border: "1px solid #aaa", textAlign: "center" }}
//           >
//             <Typography variant="h6">Summary</Typography>
//             <Typography>{videoData?.summaryText}</Typography>
//           </Box>

//           <Quiz quiz={videoData?.quiz || []} />
//         </Box>
//       </Box>
//     </>
//   );
// }

import { Box, Grid, Typography, Paper, Divider } from "@mui/material";
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
  const lineRefs = useRef([]);
  const { lecName } = useParams();
  const decodedName = decodeURIComponent(lecName);

  const [transcriptIndex, setTranscriptIndex] = useState(0);
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
        behavior: "smooth",
        block: "center",
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
          bgcolor: "#f5f7fa",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: "#f5f7fa", minHeight: "100vh", py: 4 }}>
      {/* Page Title */}
      <Typography variant="h4" align="center" fontWeight={600} sx={{ mb: 4 }}>
        {videoData?.itemName.replaceAll("_", " ")}
      </Typography>

      <Box sx={{ maxWidth: "1200px", mx: "auto", px: 2 }}>
        {/* Video + Transcript */}
        <Grid container spacing={3}>
          {/* Video */}
          <Grid item xs={12} md={8}>
            <Paper
              elevation={4}
              sx={{
                borderRadius: 3,
                overflow: "hidden",
                bgcolor: "#000",
              }}
            >
              <video
                src={videoData?.videoUrl}
                controls
                ref={videoRef}
                onTimeUpdate={handleTimeUpdate}
                style={{
                  width: "100%",
                  height: "480px",
                  objectFit: "contain",
                }}
              />
            </Paper>
          </Grid>

          {/* Transcript */}
          <Grid item xs={12} md={4}>
            <Paper
              elevation={3}
              sx={{
                height: "480px",
                borderRadius: 3,
                p: 2,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
                Transcript
              </Typography>

              <Divider sx={{ mb: 2 }} />

              <Box
                sx={{
                  flexGrow: 1,
                  overflowY: "auto",
                  pr: 1,
                }}
              >
                {videoData?.transcript?.map((el, idx) => {
                  const start = formatTime(el.start_time);
                  const end = formatTime(el.end_time);
                  const active = idx === transcriptIndex;

                  return (
                    <Box
                      key={el.id}
                      ref={(el) => (lineRefs.current[idx] = el)}
                      onClick={() => handleClickTranscriptEl(idx)}
                      sx={{
                        mb: 1.5,
                        p: 1.5,
                        borderRadius: 2,
                        cursor: "pointer",
                        fontSize: "0.9rem",
                        lineHeight: 1.4,
                        bgcolor: active ? "primary.light" : "grey.50",
                        color: active ? "primary.contrastText" : "text.primary",
                        boxShadow: active
                          ? "0 4px 10px rgba(0,0,0,0.15)"
                          : "none",
                        transition: "all 0.2s ease",
                        "&:hover": {
                          bgcolor: active ? "primary.main" : "grey.100",
                        },
                      }}
                    >
                      <strong>
                        {start} – {end}
                      </strong>
                      <br />
                      {el.transcript}
                    </Box>
                  );
                })}
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* Summary */}
        <Paper
          elevation={2}
          sx={{
            mt: 4,
            p: 3,
            borderRadius: 3,
          }}
        >
          <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
            Summary
          </Typography>
          <Typography color="text.secondary">
            {videoData?.summaryText}
          </Typography>
        </Paper>

        {/* Quiz */}
        <Box sx={{ mt: 4 }}>
          <Quiz quiz={videoData?.quiz || []} />
        </Box>
      </Box>
    </Box>
  );
}
