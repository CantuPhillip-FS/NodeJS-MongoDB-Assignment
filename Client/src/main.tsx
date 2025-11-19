import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router";
import App from "./App.tsx";
import "./index.css";
import Animes from "./pages/Animes.tsx";
import Studios from "./pages/Studios.tsx";
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
      <Route path="/studios" element={<Studios />} />
      <Route path="/animes" element={<Animes />} />
    </Routes>
    <Footer />
    <Toaster />
  </BrowserRouter>
);
