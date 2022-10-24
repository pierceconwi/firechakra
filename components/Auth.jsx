import React from "react";
import { Box, Button, Center, Link } from "@chakra-ui/react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { FaGoogle } from "react-icons/fa";
import { auth } from "../firebase";
import useAuth from "../hooks/useAuth";

const Auth = () => {
    const { isLoggedIn, user } = useAuth() || {};
    // function for Logout button to log user out and then send them back to the home screen (prevents user from sitting on a protected page after logout)
    const byeBye = () => {
        auth.signOut();
        location.assign('/');
    };

    const handleAuth = async () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // ...
        })
        .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
    };
    // define jsx component to return
    return (
        <Center>
        <Box display="flex" alignItems="center" justifyContent="space-between" mt="20px"  ml="3%" mr="3%" >
            <Box>
                <Button variant="outline" id="home" size={['xs', 'sm', 'md', 'lg', 'lg']}>
                    <Link href="/" fontSize={['0.8em', '1em', '1.2em', '1.4em', '1.6em']}>Home</Link>
                </Button>
            </Box>
            <Box>
                <Button variant="outline" id="task" size={['xs', 'sm', 'md', 'lg', 'lg']}>
                    <Link href="/add-todo" fontSize={['0.8em', '1em', '1.2em', '1.4em', '1.6em']}>Add Task</Link>
                </Button>
            </Box>
            <Box>
                <Button variant="outline" id="event" size={['xs', 'sm', 'md', 'lg', 'lg']}>
                    <Link href="/add-event" fontSize={['0.8em', '1em', '1.2em', '1.4em', '1.6em']}>Add Event</Link>
                </Button>
            </Box>
            <Box>
                <Button variant="outline" id="contact" size={['xs', 'sm', 'md', 'lg', 'lg']}>
                    <Link href="/add-comment" fontSize={['0.8em', '1em', '1.2em', '1.4em', '1.6em']}>Add Contact</Link>
                </Button>
            </Box>
            <Box>
                {isLoggedIn && (
                    <>
                        <Center>
                        <Link color="red.500" onClick={() => byeBye()} >
                            <Button colorScheme="green" mr="5%" size={['xs', 'sm', 'md', 'lg', 'lg']}>
                            Logout
                            </Button>
                        </Link>
                        </Center>
                    </>
                )}
                {!isLoggedIn && (
                    <Button leftIcon={<FaGoogle />} onClick={() => handleAuth()} colorScheme="green" mr="5%" size={['xs', 'sm', 'md', 'lg', 'lg']}>
                        Login
                    </Button>
                )}
            </Box>
        </Box>
        </Center>
    );
};
export default Auth;