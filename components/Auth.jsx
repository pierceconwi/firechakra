import React from "react";
import { Container, Box, Button, Center, Image, Link } from "@chakra-ui/react";
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
        <Container bg="red.300" border="dotted green 1px" maxW="100%">
        <Center>
        <Box display="flex" alignItems="center" justifyContent="space-between">
            <Box>
            <Link href="/"><Image 
                borderRadius='full'
                w={[
                    "60px",
                    "70px",
                    "75px",
                    "80px",
                    "90px"
                ]}
                minW="45px"
                src='/fc-logo.png'
                alt='FireChakra logo'
                /></Link>
            </Box>
            <Box>
                <Button variant="ghost" id="home" size={['sm', 'sm', 'md', 'md', 'md']}>
                    <Link href="/" fontSize={['0.8em', '1em', '1.2em', '1.4em', '1.6em']}>Home</Link>
                </Button>
            </Box>
            <Box>
                <Button variant="ghost" id="task" size={['sm', 'sm', 'md', 'md', 'md']}>
                    <Link href="/add-todo" fontSize={['0.8em', '1em', '1.2em', '1.4em', '1.6em']}>Task</Link>
                </Button>
            </Box>
            <Box>
                <Button variant="ghost" id="event" size={['sm', 'sm', 'md', 'md', 'md']}>
                    <Link href="/add-event" fontSize={['0.8em', '1em', '1.2em', '1.4em', '1.6em']}>Event</Link>
                </Button>
            </Box>
            <Box>
                <Button variant="ghost" id="contact" size={['sm', 'sm', 'md', 'md', 'md']}>
                    <Link href="/add-comment" fontSize={['0.8em', '1em', '1.2em', '1.4em', '1.6em']}>Contact</Link>
                </Button>
            </Box>
            <Box>
                {isLoggedIn && (
                    <>
                            <Button variant="ghost" mr="5%" size={['sm', 'sm', 'md', 'md', 'md']}>
                                <Link onClick={() => byeBye()} fontSize={['0.8em', '1em', '1.2em', '1.4em', '1.6em']}>
                                Logout
                                </Link>
                            </Button>
                    </>
                )}
                {!isLoggedIn && (
                    <Button variant="ghost" mr="5%" size={['sm', 'sm', 'md', 'md', 'md']}>
                        <Link onClick={() => handleAuth()} fontSize={['0.8em', '1em', '1.2em', '1.4em', '1.6em']}>Login</Link>
                    </Button>
                    
                )}
            </Box>
        </Box>
        </Center>
        </Container>
    );
};
export default Auth;