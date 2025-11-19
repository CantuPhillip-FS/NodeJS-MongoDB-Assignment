import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import App from "./App.tsx";
import "./index.css";
import Footer from "./ui/Footer.tsx";
import Navbar from "./ui/Navbar.tsx";

createRoot(document.getElementById("root")!).render(
  <>
    <Navbar />
    <App />
    <Footer />
    <Toaster />
  </>
);
