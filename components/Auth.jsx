import React from "react";
import { Box, Button, Link, Text, useColorMode } from "@chakra-ui/react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { FaGoogle, FaMoon, FaSun } from "react-icons/fa";
import { auth } from "../firebase";
import useAuth from "../hooks/useAuth";

const Auth = () => {
    const { toggleColorMode, colorMode } = useColorMode();
    const { isLoggedIn, user } = useAuth() || {};

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
        <Box display="flex" alignItems="center" justifyContent="space-between" ml="5%" mr="5%" mt="20px">
            <Button onClick={() => toggleColorMode()}>
                    {colorMode == "dark" ? <FaSun /> : <FaMoon />}
            </Button>{" "}
            <Box>
                <Link href="/" >Home</Link>
            </Box>
            <Box>
                <Link href="/add-todo">Add Task</Link>
            </Box>
            <Box>
                <Link href="/add-event">Add Event</Link>
            </Box>
            <Box>
                <Link href="/add-comment">Add Contact</Link>
            </Box>
            <Box textAlign="right" w="20%">
                {isLoggedIn && (
                    <>
                        <Text fontSize="xs" color="green.500">{user.email}</Text>
                        <Link color="red.500" onClick={() => auth.signOut()}>
                            Logout
                        </Link>
                    </>
                )}
                {!isLoggedIn && (
                    <Button leftIcon={<FaGoogle />} onClick={() => handleAuth()}>
                        Login with Google
                    </Button>
                )}
            </Box>
        </Box>
    );
};
export default Auth;