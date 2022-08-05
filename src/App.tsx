import React from "react";
import { Route, Routes } from "react-router-dom";
import { toast } from "react-toastify";

import MainLoginPage from "./pages/LoginPage/LoginPage";
import MainPage from "./pages/MainPage/MainPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import WelcomePage from "./pages/WelcomePage/WelcomePage";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<MainLoginPage />} />
        <Route path="/home" element={<MainPage />} />
      </Routes>
    </div>
  );
}

export default App;
