import { Box, Grid, TextField, Typography } from "@mui/material";

export default function ViewVideo() {
  //   const { id } = URLSearchParams();
  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Box sx={{ bgcolor: "#ddd", height: 300 }}>
            Video Player Placeholder
          </Box>
          <Box sx={{ mt: 2, p: 2, border: "1px solid #aaa" }}>
            <Typography variant="h6">Summary</Typography>
            <Typography>Lorem ipsum summary text...</Typography>
          </Box>
          <Box sx={{ mt: 2, p: 2, border: "1px solid #aaa" }}>
            <Typography variant="h6">Quiz</Typography>
            <Typography>Placeholder quiz content...</Typography>
          </Box>
        </Grid>

        <Grid item xs={4}>
          <TextField
            fullWidth
            label="Search Transcript"
            variant="outlined"
            sx={{ mb: 1 }}
          />
          <Box
            sx={{
              height: 500,
              overflowY: "scroll",
              border: "1px solid #aaa",
              p: 1,
            }}
          >
            <Typography>Transcript text placeholder...</Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
