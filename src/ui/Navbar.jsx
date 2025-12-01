import { AppBar, Box, Button, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";
import logo from "../assets/lecturalogo.png";
export default function Navbar() {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#3b7aa5" }}>
      <Toolbar>
        <Button color="inherit" component={Link} to="/">
          <img height="50px" src={logo}></img>
        </Button>
        <Box sx={{ flexGrow: 1 }} />
        <Button color="inherit" component={Link} to="/upload">
          Upload
        </Button>
      </Toolbar>
    </AppBar>
  );
}
