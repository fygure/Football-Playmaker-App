// LandingPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();

    const navigateToRoot = () => {
        navigate('/');
    }

    return (
        <>
            LandingPage
            <button onClick={navigateToRoot}>Home</button>
        </>
    )
}

export default LandingPage;