import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { usePresignedUpload } from "../hooks/usePresignedUpload";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

export default function Upload() {
  function isAlphanumericString(str) {
    if (str === "") return true;
    return /^[a-zA-Z0-9 ]+$/.test(str);
  }

  const { mutateAsync: uploadFile, isPending } = usePresignedUpload();
  const [cls, setCls] = useState("");
  const [classes, setClasses] = useState(["Math", "Science", "History"]);
  const [fileName, setFileName] = useState("");
  const [uploadedVideo, setUploadedVideo] = useState(null);
  const [openNew, setOpenNew] = useState(false);
  const [newClassName, setNewClassName] = useState("");
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleClassChange = (e) => {
    const val = e.target.value;
    if (val === "new") {
      setOpenNew(true);
    } else {
      setCls(val);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedVideo(file);
    }
  };

  const handleClickUpload = async () => {
    if (!uploadedVideo || !cls) return;
    let videoName = "";
    if (fileName.trim()) {
      while (fileName.includes(".")) {
        setFileName((prev) => prev.replace(".", ""));
      }
      videoName = fileName + ".mp4";
    } else {
      videoName = uploadedVideo.name;
    }
    await uploadFile(
      {
        file: uploadedVideo,
        meta: { fileName: videoName, class: cls },
      },
      {
        onSuccess: () => {
          alert("File uploaded successfully!");
          queryClient.invalidateQueries(["videos", ""]);
          navigate("/");
        },
        onError: (err) => {
          alert("File upload failed: " + err.message);
        },
      }
    );
  };

  function handleUpdateNameChange(event) {
    if (isAlphanumericString(event.target.value)) {
      setFileName(event.target.value);
    }
  }

  const handleCreateNewClass = () => {
    const name = newClassName.trim();
    if (!name) return;
    setClasses((prev) => [...prev, name]);
    setCls(name);
    setNewClassName("");
    setOpenNew(false);
  };

  const handleCancelNewClass = () => {
    setNewClassName("");
    setOpenNew(false);
  };
  return (
    <Box
      sx={{
        mt: 4,
        p: 2,
        border: "1px solid #ccc",
        borderRadius: 2,
        maxWidth: 800,
        mx: "auto",
      }}
    >
      <Typography variant="h5">Upload New Lecture</Typography>
      <TextField
        type="file"
        fullWidth
        sx={{ my: 2 }}
        onChange={handleFileUpload}
        disabled={isPending}
        slotProps={{ htmlInput: { accept: ".mp4" } }}
      />
      <TextField
        value={fileName}
        onChange={handleUpdateNameChange}
        fullWidth
        label="Video Name"
        variant="outlined"
        sx={{ mb: 2 }}
      />
      <FormControl fullWidth>
        <InputLabel>Class</InputLabel>
        <Select value={cls} label="Class" onChange={handleClassChange}>
          {classes.map((c, i) => (
            <MenuItem key={i} value={c}>
              {c}
            </MenuItem>
          ))}
          {/* <MenuItem value="new">Create New Class...</MenuItem> */}
        </Select>
      </FormControl>
      <LoadingButton
        variant="contained"
        disabled={!cls || !uploadedVideo}
        loading={isPending}
        onClick={handleClickUpload}
        sx={{ mt: 2 }}
      >
        Upload Video
      </LoadingButton>

      <Dialog open={openNew} onClose={handleCancelNewClass}>
        <DialogTitle>Create New Class</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Class Name"
            fullWidth
            value={newClassName}
            onChange={(e) => setNewClassName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelNewClass}>Cancel</Button>
          <Button onClick={handleCreateNewClass} variant="contained">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
