import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./ui/Navbar";
import Dashboard from "./pages/Dashboard";
import ViewVideo from "./pages/ViewVideo";
import Upload from "./pages/Upload";
import "./index.css";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/view/:lecName" element={<ViewVideo />} />
        <Route path="/upload" element={<Upload />} />
      </Routes>
    </Router>
  );
}
