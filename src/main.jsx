import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.jsx";
import About from "./pages/about.jsx";
import NavBar from "./components/NavBar.jsx";
import { Box, Container } from "@mui/material";

import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

import "./index.css";
ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
                <NavBar />
                <Routes>
                    <Route path="/about" element={<About />} />
                    <Route path="/" element={<App />} />
                </Routes>
        </BrowserRouter>
    </React.StrictMode>
);
