import { AppBar, Box, Button, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Button color="inherit" component={Link} to="/">
          LectureLogo
        </Button>
        <Box sx={{ flexGrow: 1 }} />
        <Button color="inherit" component={Link} to="/upload">
          Upload
        </Button>
      </Toolbar>
    </AppBar>
  );
}
