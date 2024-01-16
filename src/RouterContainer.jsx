// RouterContainer.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import CancelPage from './pages/CancelPage';
import CTA from './CTA';
import App from './App';

const RouterContainer = () => (
    <Router>
        <Routes>
            <Route path="/demo" element={<App />} />
            <Route path="/app" element={<CTA />} />
            <Route path="/cancel" element={<CancelPage />} />
            <Route path="/" element={<Navigate to="/demo" />} />
            <Route path="*" element={<h1>404 Page Not Found</h1>} />
        </Routes>
    </Router>
);

export default RouterContainer;