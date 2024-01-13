import React, { useEffect, useState } from "react";
import { Auth } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { Hub } from "aws-amplify/utils";
import { signInWithRedirect, signOut, getCurrentUser } from "aws-amplify/auth";
import '@aws-amplify/ui-react/styles.css';

function Test({ signOut, user }) {

    console.log(user);

    return (
        <>
            <h1>Hello {user.username}</h1>
            <button onClick={() => signOut()}>Sign Out</button>
        </>
    );

}

export default withAuthenticator(Test, {
    socialProviders: ['google']
});

// function Test() {
//     const [user, setUser] = useState(null);
//     const [error, setError] = useState(null);
//     const [customState, setCustomState] = useState(null);

//     useEffect(() => {
//         const unsubscribe = Hub.listen("auth", ({ payload }) => {
//             switch (payload.event) {
//                 case "signInWithRedirect":
//                     getUser();
//                     break;
//                 case "signInWithRedirect_failure":
//                     setError("An error has ocurred during the OAuth flow.");
//                     break;
//                 case "customOAuthState":
//                     setCustomState(payload.data); // this is the customState provided on signInWithRedirect function
//                     break;
//             }
//         });

//         getUser();

//         return unsubscribe;
//     }, []);

//     const getUser = async () => {
//         try {
//             const currentUser = await getCurrentUser();
//             setUser(currentUser);
//         } catch (error) {
//             console.error(error);
//             console.log("Not signed in");
//         }
//     };

//     return (
//         <>
//             <button onClick={() => signInWithRedirect({ customState: "shopping-cart" })}>Open Hosted UI</button>
//             <button onClick={() => signInWithRedirect({ provider: "Facebook", customState: "shopping-cart" })}>
//                 Open Facebook
//             </button>
//             <button onClick={() => signInWithRedirect({ provider: "Google", customState: "shopping-cart" })}>
//                 Open Google
//             </button>
//             <button onClick={() => signInWithRedirect({ provider: "Amazon", customState: "shopping-cart" })}>
//                 Open Amazon
//             </button>
//             <button onClick={() => signInWithRedirect({ provider: "Apple", customState: "shopping-cart" })}>
//                 Open Apple
//             </button>
//             <button onClick={() => signOut()}>Sign Out</button>
//             <div>{user?.username}</div>
//             <div>{customState}</div>
//         </>
//     );
// }

// export default Test;
