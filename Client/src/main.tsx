import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router";
import App from "./App.tsx";
import "./index.css";
import Users from "./pages/Users.tsx";
import Footer from "./ui/Footer.tsx";
import Navbar from "./ui/Navbar.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route index element={<App />} />
      <Route path="/" element={<App />} />
      <Route path="/users" element={<Users />} />
    </Routes>
    <Footer />
    <Toaster />
  </BrowserRouter>
);
