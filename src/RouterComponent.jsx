// RouterComponent.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import PaymentPage from './pages/PaymentPage';
import Test from './Test';
import App from './App';

const RouterComponent = () => (
    <Router>
        <Routes>
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/" element={<App />} />
            <Route path="/sign" element={<Test />} />
            <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
    </Router>
);

export default RouterComponent;