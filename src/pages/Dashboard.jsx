import { Link } from "react-router-dom";
// import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

export default function Dashboard() {
  //   const [search, setSearch] = useState("");
  const dummyLectures = ["Lecture 1", "Lecture 2", "Lecture 3", "Lecture 4"];

  return (
    <Box sx={{ p: 2 }}>
      <TextField
        fullWidth
        label="Search Lectures"
        variant="outlined"
        sx={{ mb: 2 }}
      />
      <Grid container spacing={2}>
        {dummyLectures.map((lec, i) => (
          <Grid item xs={12} sm={6} md={3} key={i}>
            <Card>
              <CardContent>
                <Typography variant="h6">{lec}</Typography>
                <Button component={Link} to="/view">
                  View
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
