import React from "react";
// import ui components from Chakra
import {
Box,
Input,
Button,
Textarea,
Stack,
useToast
} from "@chakra-ui/react";
// import useAuth to ensure user is logged in to comment
import useAuth from "../hooks/useAuth";
// import addComment from our api files
import { addComment } from "../api/comments";

// define a react jsx component
const AddComment = () => {
    // React State Set-Up
    // every input will be associated with a state. React can then update that state
    // comment text input state set-up:
    const [title, setTitle] = React.useState("");
    const [comment, setComment] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [email, setEmail] = React.useState("");
    // additional aspect state set-up:
    const [isLoading, setIsLoading] = React.useState(false);
    // chakra related:
    const toast = useToast();

    // call useAuth()
    const { isLoggedIn, user } = useAuth();

    // define function to handle add comment operation
    const handleCommentCreate = async () => {
        // is user logged in?
        if ( !isLoggedIn ) {
            toast(
                // settings for Chakra UI toast function
                {
                    title: "Please log in to create a contact.",
                    status: "error",
                    duration: 9000,
                    isClosable: true
                }
            );
            // end comment creation since user is not logged in
            return;
        }
        // if user is logged in, this code runs instead of above:
        setIsLoading(true);
        // build object value template
        const commentData = {
            title,
            comment,
            phone,
            email,
            userId: user.uid
        };
        // call our api function addComment() to use the data stored in comment to build the entry
        await addComment(commentData);
        // firestore doc has been created/updated, reset comment form:
        setIsLoading(false);
        setTitle("");
        setComment("");
        setPhone("");
        setEmail("");
        // show toast notification with status update
        toast(
            {
                title: "Contact saved successfully.",
                status: "success"
            }
        );
    };
    // return markup for comment jsx component
    return (
        <Box w={["450px", "500px", "800px", "1000px", "1300px"]} margin={"0 auto"} display="block"  mt={5} mb={5}>
            <Stack direction="column">
                <Input 
                    placeholder="Name"
                    value={title}
                    onChange={ (e) => setTitle( e.target.value ) }
                />
                <Textarea 
                    placeholder="Description"
                    value={comment}
                    onChange={ (e) => setComment(e.target.value) }
                />
                <Textarea 
                    placeholder="Phone"
                    value={phone}
                    onChange={ (e) => setPhone(e.target.value) }
                />
                <Textarea 
                    placeholder="Email"
                    value={email}
                    onChange={ (e) => setEmail(e.target.value) }
                />
                <Button
                    onClick={ () => handleCommentCreate() } 
                    disabled={ title.length < 1 || comment.length < 1 || phone < 1 || isLoading }
                    colorScheme="green"
                    variant="solid"
                >
                    Add Contact
                </Button>
            </Stack>
        </Box>
    );
};

// export for use
export default AddComment;