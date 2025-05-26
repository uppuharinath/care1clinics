import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Header from "../src/Components/Header/index";
import './App.css';
import './custome.css';
import { useState } from "react";
import Body from "./Pages/body - Copy";
import Register from "./Components/auth/register/register";
import Login from "./Components/auth/login/login";
import { AuthProvider } from "./contexts/auth";
import VerifyEmail from "./Components/auth/verifyemail/VerifyEmail";
import ProtectedRoute from "./Components/auth/ProtectedRoute";
import Footer from "./Pages/footer";
import About from "./Components/About/about";
import Gallery from "./assets/Gallery/gallery";
import Dashboard from "./Components/Dashboard"; // Protected page

function AppWrapper() {
  const [searchInput, setSearchInput] = useState("");
  const location = useLocation();

  const isFullscreen = new URLSearchParams(location.search).get("fullscreen") === "true";

  return (
    <>
      {!isFullscreen && <Header searchInput={searchInput} setSearchInput={setSearchInput} />}
      
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Body searchInput={searchInput} />} />
        <Route path="/about" element={<About />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-email" element={<VerifyEmail />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
      
      {!isFullscreen && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppWrapper />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
