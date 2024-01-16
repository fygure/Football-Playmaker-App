//DEPRECATED (UNUSED)
// import { useState } from 'react';
// import { signIn, confirmSignIn, getCurrentUser } from 'aws-amplify/auth';


// export default function SignIn({ setFlag }) {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [newPassword, setNewPassword] = useState('');
//     const [passwordChangeRequired, setPasswordChangeRequired] = useState(false);
//     const [userObject, setUserObject] = useState(null);

//     async function logIn(e) {
//         e.preventDefault();
//         console.log(username, password);
//         try {
//             const res = await signIn({ username, password });
//             console.log(res);
//             if (res.nextStep.signInStep === 'CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED') {
//                 setPasswordChangeRequired(true);
//             } else {
//                 setFlag(res.isSignedIn);
//             }
//         } catch (err) {
//             console.log('error signing in', err);
//         }
//     }

//     async function handlePasswordChange(e) {
//         e.preventDefault();
//         try {
//             const user = await getCurrentUser();
//             console.log(user);
//             setPasswordChangeRequired(false);
//             setUser(true);
//             console.log('success, try signing with new pass');
//         } catch (err) {
//             console.log('error changing password', err);
//         }
//     }

//     return (
//         <>
//             <form onSubmit={passwordChangeRequired ? handlePasswordChange : logIn}>
//                 <input type="text" placeholder="username" onChange={(e) => setUsername(e.target.value)} />
//                 <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
//                 {passwordChangeRequired && (
//                     <input type="password" placeholder="new password" onChange={(e) => setNewPassword(e.target.value)} />
//                 )}
//                 <input type="submit" value="Log In" />
//             </form>
//         </>
//     )
// }
