import React from "react";
// import ui components from Chakra
import {
Box,
Input,
Button,
Textarea,
Stack,
useToast,
} from "@chakra-ui/react";
// import useAuth to ensure user is logged in to comment
import useAuth from "../hooks/useAuth";
// import addComment from our api files
import { addEvent } from "../api/events";

// define a react jsx component
const AddEvent = () => {
    // React State Set-Up
    // every input will be associated with a state. React can then update that state
    // comment text input state set-up:
    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    // additional aspect state set-up:
    const [isLoading, setIsLoading] = React.useState(false);
    // chakra related:
    const toast = useToast();

    // call useAuth()
    const { isLoggedIn, user } = useAuth();

    // define function to handle add event operation
    const handleEventCreate = async () => {
        // is user logged in?
        if ( !isLoggedIn ) {
            toast(
                // settings for Chakra UI toast function
                {
                    title: "Please log in to add an event.",
                    status: "error",
                    duration: 9000,
                    isClosable: true
                }
            );
            // end event creation since user is not logged in
            return;
        }
        // if user is logged in, this code runs instead of above:
        setIsLoading(true);
        // build object value template
        const eventData = {
            title,
            description,
            userId: user.uid
        };
        console.log(eventData);
        // call our api function addComment() to use the data stored in comment to build the entry
        await addEvent(eventData);
        // firestore doc has been created/updated, reset comment form:
        setIsLoading(false);
        setTitle("");
        setDescription("");
        // show toast notification with status update
        toast(
            {
                title: "Event posted successfully.",
                status: "success"
            }
        );
    };
    // return markup for event jsx component
    return (
        <Box w="40%" margin={"0 auto"} display="block" mt={5} mb={5}>
            <Stack direction="column">
                <Input 
                    placeholder="Title"
                    value={title}
                    onChange={ (e) => setTitle( e.target.value ) }
                />
                <Textarea 
                    placeholder="Description"
                    value={description}
                    onChange={ (e) => setDescription(e.target.value) }
                />
                <Button
                    onClick={ () => handleEventCreate() } 
                    disabled={ title.length < 1 || description.length < 1 || isLoading }
                    colorScheme="green"
                    variant="solid"
                >
                    Add Event
                </Button>
            </Stack>
        </Box>
    );
};

// export for use
export default AddEvent;