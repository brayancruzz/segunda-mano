import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/layout/header";
import Home from "./pages/home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Onbording from "./pages/Onbording";
import { Toaster } from "sileo"; // toast container

function App() {
  const location = useLocation();
  const hideHeader = location.pathname === "/login" || location.pathname === "/signup" || location.pathname === "/onbording";

  return (
    <>
      {/* global toaster must be mounted once in the app */}
      <Toaster position="top-right" />

      {!hideHeader && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/onbording" element={<Onbording />} />
      </Routes>
    </>
  );
}

export default App;
