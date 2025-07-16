// src/router/index.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import ScheduleDetailPage from "../pages/ScheduleDetailPage";
import Header from "../components/core/Header";

// import ScheduleDetail from "../pages/ScheduleDetail";
import MobileBottomBar from "../components/core/MobileBottomBar";
import Profile from "../pages/Profile";

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/schedule/:scheduleId" element={<ScheduleDetailPage />} />
        {/* Removed duplicate route that was causing infinite loop */}
        {/* <Route path="/schedule/:id" element={<ScheduleDetail />} /> */}
        <Route path="/profile/:id" element={<Profile />} />
      </Routes>
      <MobileBottomBar />
    </Router>
  );
};

export default AppRouter;
