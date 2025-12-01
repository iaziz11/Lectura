import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useSearchVideos } from "../hooks/useSearchVideos";
import img from "../assets/test.webp";
import { useState } from "react";

export default function Dashboard() {
  const [query, setQuery] = useState("");

  const { data: lectures, isLoading, isError } = useSearchVideos(query);

  return (
    <Box sx={{ p: 3, display: "flex", justifyContent: "center" }}>
      <Box
        sx={{
          width: "80%",
          p: 3,
          borderRadius: 3,
          boxShadow: 4,
          backgroundColor: "white",
        }}
      >
        <Box sx={{ p: 3 }}>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
            Lectures
          </Typography>

          <TextField
            fullWidth
            label="Search Lectures"
            variant="outlined"
            sx={{ mb: 3 }}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {isLoading ? (
            <p>Loading...</p>
          ) : isError ? (
            <p>Error loading lectures</p>
          ) : lectures.length === 0 ? (
            <Typography variant="body1">No lectures found.</Typography>
          ) : (
            <Grid container spacing={3}>
              {lectures.map((lec, i) => (
                <Grid item xs={12} sm={6} md={3} key={i}>
                  <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
                    <CardMedia
                      component="img"
                      height="160"
                      image={img}
                      alt={lec.itemName}
                    />
                    <CardContent>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {lec.itemName.split(".")[0].replaceAll("_", " ")}
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 1, color: "gray" }}>
                        {lec.className}
                      </Typography>
                      <Button
                        component={Link}
                        to={`/view/${encodeURIComponent(lec.itemName)}`}
                        variant="contained"
                        fullWidth
                        disabled={!lec.processed}
                        sx={{ borderRadius: 2, backgroundColor: "#3b7aa5" }}
                      >
                        {lec.processed ? "View" : "Processing"}
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Box>
    </Box>
  );
}
