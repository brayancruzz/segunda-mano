import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/layout/header";
import Home from "./pages/home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Onbording from "./pages/Onbording";
import Profile from "./pages/Profile";
import MisProductos from "./pages/MisProductos";
import Favoritos from "./pages/Favoritos";
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
        <Route path="/profile" element={<Profile />} />
        <Route path="/mis-productos" element={<MisProductos />} />
        <Route path="/favoritos" element={<Favoritos />} />
      </Routes>
    </>
  );
}

export default App;
