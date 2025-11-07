import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

export default function Upload() {
  const [cls, setCls] = useState("");
  const classes = ["Math", "Science", "History"];

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5">Upload New Lecture</Typography>
      <TextField type="file" fullWidth sx={{ my: 2 }} />
      <TextField
        fullWidth
        label="Video Name"
        variant="outlined"
        sx={{ mb: 2 }}
      />
      <FormControl fullWidth>
        <InputLabel>Class</InputLabel>
        <Select
          value={cls}
          label="Class"
          onChange={(e) => setCls(e.target.value)}
        >
          {classes.map((c, i) => (
            <MenuItem key={i} value={c}>
              {c}
            </MenuItem>
          ))}
          <MenuItem value="new">Create New Class...</MenuItem>
        </Select>
      </FormControl>
      <Button variant="contained" sx={{ mt: 2 }}>
        Upload
      </Button>
    </Box>
  );
}
