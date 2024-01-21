import React, { useState } from "react";
import { Authenticator, ThemeProvider, useTheme, } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import App from "./App";
import { Button, IconButton } from '@mui/material';
import { loadStripe } from "@stripe/stripe-js";

/* To add subscription with trial, we need to send a POST to our server
that creates a checkout session with a trial period ID then uses that 
to redirectToCheckout */

const subscribe = async (event) => {
    try {
        //TODO: replace with prod publishable key (exposure is ok)
        const stripe = await loadStripe('pk_test_51OOkwQDtAjmN4bYix4tQvdc1IAmSIhnGIhbk4CLw6TAzFKClu9n7yi1UeHiHSWrUCBc8nZJfjEAq4xGTbYZJ28I900lnw9MSVY');
        const { error } = await stripe.redirectToCheckout({
            lineItems: [{
                //TODO: replace with prod price key
                price: 'price_1OYDuNDtAjmN4bYiLe9mRSxo',
                quantity: 1,
            }],
            mode: 'subscription',
            successUrl: 'https://www.chlk.football/editor',
            cancelUrl: 'https://www.chlk.football/cancel',
        });
    } catch (err) {
        console.log('error occured while trying to subscribe', err);
    }

}


function PayWall() {
    const { tokens } = useTheme();

    const theme = {
        name: 'Auth Example Theme',
        tokens: {
            colors: {
                background: {
                    primary: {
                        value: '#333',
                    },
                    secondary: {
                        value: 'white',
                    },
                },
                font: {
                    primary: { value: 'white' },
                    secondary: { value: 'white' },
                    variable: { value: 'Inter, sans-serif' },
                },
            },
        },
    };




    const [showAuthenticator, setShowAuthenticator] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    const components = {

    }

    //"CHLK PlayMaker Pro"
    //"CHLK Endzone Mastery"
    return (
        <>
            <div style={{ backgroundColor: '#1e1e1e', height: '100vh' }}>
                {!currentUser && (
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <h1 style={{ paddingTop: '10vh', fontFamily: 'Bitter, serif', color: '#ffffff' }}>CHLK Touchdown Tactics</h1>
                    </div>
                )}
                {!currentUser && (
                    <div style={{ display: 'flex', justifyContent: 'center', paddingTop: "20px", paddingBottom: "20px" }}>
                        <IconButton
                            onClick={() => { setShowAuthenticator(!showAuthenticator); }}
                            sx={{
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.25)',
                                },
                                '&:active': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                                },
                            }}
                        >
                            <img src={process.env.PUBLIC_URL + '/static/assets/sign-in-icon.png'} alt="Sign In" />
                        </IconButton>
                    </div >
                )}
                {showAuthenticator && (
                    <ThemeProvider theme={theme}>
                        <Authenticator
                            components={components}
                            hideSignUp={true}
                            signUpAttributes={[]}
                            loginMechanisms={['email']}
                            initialAuthState="signIn"
                        >
                            {({ signOut, user }) => {
                                setCurrentUser(user);
                                return (
                                    <div>
                                        {user && (
                                            <>
                                                <App
                                                    signOut={signOut}
                                                    setCurrentUser={setCurrentUser}
                                                    showAuthenticator={showAuthenticator}
                                                    setShowAuthenticator={setShowAuthenticator}
                                                />
                                            </>
                                        )}
                                    </div>
                                );
                            }}
                        </Authenticator >
                    </ThemeProvider>)}
                {!currentUser && (
                    <div style={{ display: 'flex', justifyContent: 'center', paddingTop: "20px", paddingBottom: "20px" }}>
                        <Button
                            variant="outlined"
                            // size="small"
                            sx={{
                                fontFamily: 'Bitter, serif',
                                color: '#ffffff',
                                borderColor: '#ffffff',
                                '&:hover': {
                                    backgroundColor: '#2b7483',
                                    borderColor: '#2b7483',
                                },
                            }}
                            onClick={() => { subscribe(); }}
                        >Try One Week Free</Button>
                    </div >
                )}
            </div>
        </>
    )
}

export default PayWall;
