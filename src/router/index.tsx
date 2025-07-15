// src/router/index.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import ScheduleDetail from '../pages/ScheduleDetail';
import Header from '../components/core/Header'; // Import the Header component

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Header /> 
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/schedule/:id" element={<ScheduleDetail />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;