import React, { useState, useEffect } from "react";
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import Subscribe from "./Subscribe";
import App from "./App";

function CTA() {
    const [showAuthenticator, setShowAuthenticator] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    return (
        <>
            {!currentUser && <h1>CHLK App</h1>}
            {!currentUser && <button onClick={() => { setShowAuthenticator(!showAuthenticator); }}>Sign In</button>}
            {showAuthenticator && (
                <Authenticator
                    hideSignUp={true}
                    signUpAttributes={[]}
                    loginMechanisms={['email']}
                    initialAuthState="signIn"
                >
                    {({ signOut, user }) => {
                        setCurrentUser(user);
                        //console.log(user);
                        return (
                            <div>
                                {user && (
                                    <>
                                        {/* <button onClick={() => { signOut(); setCurrentUser(null); setShowAuthenticator(!showAuthenticator) }}>Sign out</button> */}
                                        {/*Paid Content*/}
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
            )}
            {!currentUser && <Subscribe />}
        </>
    )
}

export default CTA;
