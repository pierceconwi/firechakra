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
        <Container bg="red.300" minW="100%" pb="20px" border="dotted green 1px" maxW="120%" >
        <Center>
        <Box display="flex" alignItems="center" justifyContent="space-between">
            <Box>
            <Image 
                  borderRadius='full'
                  boxSize='55px'
                  src='/fc-logo.png'
                  alt='FireChakra logo'
                  minW="60px"
                />
            </Box>
            <Box>
                <Button variant="outline" id="home" size={['xs', 'sm', 'md', 'md', 'md']}>
                    <Link href="/" fontSize={['0.8em', '1em', '1.2em', '1.4em', '1.6em']}>Home</Link>
                </Button>
            </Box>
            <Box>
                <Button variant="outline" id="task" size={['xs', 'sm', 'md', 'md', 'md']}>
                    <Link href="/add-todo" fontSize={['0.8em', '1em', '1.2em', '1.4em', '1.6em']}>Task</Link>
                </Button>
            </Box>
            <Box>
                <Button variant="outline" id="event" size={['xs', 'sm', 'md', 'md', 'md']}>
                    <Link href="/add-event" fontSize={['0.8em', '1em', '1.2em', '1.4em', '1.6em']}>Event</Link>
                </Button>
            </Box>
            <Box>
                <Button variant="outline" id="contact" size={['xs', 'sm', 'md', 'md', 'md']}>
                    <Link href="/add-comment" fontSize={['0.8em', '1em', '1.2em', '1.4em', '1.6em']}>Contact</Link>
                </Button>
            </Box>
            <Box>
                {isLoggedIn && (
                    <>
                        <Center>
                        <Link color="red.400" onClick={() => byeBye()} >
                            <Button colorScheme="red" mr="5%" size={['xs', 'sm', 'md', 'md', 'md']}>
                            Logout
                            </Button>
                        </Link>
                        </Center>
                    </>
                )}
                {!isLoggedIn && (
                    <Button leftIcon={<FaGoogle />} onClick={() => handleAuth()} colorScheme="green" mr="5%" size={['xs', 'sm', 'md', 'md', 'md']}>
                        Login
                    </Button>
                )}
            </Box>
        </Box>
        </Center>
        </Container>
    );
};
export default Auth;