//ComingSoon.jsx

import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ComingSoon = (props) => {
    const navigate = useNavigate();

    return (
        <div style={{
            backgroundImage: `url(${process.env.PUBLIC_URL + '/static/assets/coming-soon.jpg'})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            height: '100vh',
            width: '100vw',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingTop: '2%',
        }}>
            {props.children}
            <img src={process.env.PUBLIC_URL + '/static/assets/chlk-logo-white.png'} alt="CHLK Logo" />
            <Button
                variant="outlined"
                onClick={() => navigate('/editor')}
                sx={{
                    borderColor: '#fff',
                    borderWidth: '2px',
                    borderRadius: '25px',
                    color: '#fff',
                    fontSize: '2rem', // adjust as needed
                    fontFamily: 'Inter, sans-serif', // set font family
                    '&:hover': {
                        backgroundColor: '#f50057', // adjust as needed
                    },
                }}
            >
                Coming Soon
            </Button>
        </div>

    )
}

export default ComingSoon
