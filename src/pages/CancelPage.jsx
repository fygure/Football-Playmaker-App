// CancelPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

function CancelPage() {
    const navigate = useNavigate();

    const navigateToRoot = () => {
        navigate('/');
    }

    return (
        <>
            CancelPage
            <button onClick={navigateToRoot}>Home</button>
        </>
    )
}

export default CancelPage;
