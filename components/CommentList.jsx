import React, { useEffect } from "react";
import {
    Badge,
    Box,
    Heading,
    SimpleGrid,
    Text,
    useToast,
    LinkBox,
    LinkOverlay
} from "@chakra-ui/react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { AtSignIcon } from '@chakra-ui/icons'
import useAuth from "../hooks/useAuth";
import { deleteComment } from "../api/comments";

// define jsx component for the comment list
const CommentList = () => {
    // set up React useState so states can be manipulated later
    const [comments, setComments] = React.useState([]);
    // enable user authentication
    const { user } = useAuth();
    // set up Chakra UI toast functionality
    const toast = useToast();

    // tell React to update the UI with refreshData()
    useEffect(
        () => {
            // nested func that updates list from firestore data
            const refreshData = () => {
                if (!user) {
                    setComments([]);
                    return;
                }
                // if control reaches this line, user is logged in
                // perform query on firestore collection:
                const q = query(
                    collection( db, "comments" ),
                    where("user", "==", user.uid)
                );
                // since query() is async, set up an event handler w firebase using onSnapshot method
                onSnapshot(
                    q,
                    (querySnapshot) => {
                        // in this function we have all results from q in querySnapshot
                        let ar = [];
                        // loop thru each doc in the results
                        querySnapshot.docs.forEach(
                            (doc) => {
                                ar.push(
                                    {
                                        id: doc.id,
                                        ...doc.data()
                                    }
                                );
                            }
                        );
                        // after looping thru using forEach, array of docs is in ar
                        setComments(ar);
                    }
                );
            };
            refreshData();
        },
        [user]
    );

    // build nested function to delete a comment
    const handleCommentDelete = async (id) => {
        if (
            confirm("Are you sure you want to delete this comment?")
        ) {
            deleteComment(id);
            toast(
                {
                    title: "Comment deleted successfully.",
                    status: "success"
                }
            );
        }
    };
    
    // define the jsx for the component
    return (
        <Box px={['5px', '5px', '10px', '10px', '10px']} mt={5} textAlign="center" fontSize={['0.8em', '1em', '1.2em', '1.4em', '1.6em']}>
            <Heading mb="3px" fontSize={['1.2em', '1.2em', '1.2em', '1.2em', '1.4em']}>Contacts<Badge bg="white">
                    <AtSignIcon
                        w="15px"
                        h="15px"
                    />
                </Badge>
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
                {
                    comments && 
                    comments.map(
                        (comment) => (
                            <LinkBox key={comment.id}>
                            <Box
                            p={3}
                            boxShadow="2xl"
                            shadow={"base"}
                            transition="0.2s"
                            _hover={{ boxShadow: "sm" }}
                            borderRadius="md"
                            >
                                <Heading as="h3" fontSize={"xl"}>
                                    <LinkOverlay href={`/comment/${comment.id}`}>{comment.title}</LinkOverlay>
                            </Heading>
                            <Text                            
                                fontSize={[
                                    "1rem",
                                    "1rem",
                                    "1rem",
                                    "1rem",
                                    "1.2rem"
                                ]}
                            >
                                { comment.comment }
                            </Text>
                            <Text                             
                                fontSize={[
                                    "1rem",
                                    "1rem",
                                    "1rem",
                                    "1rem",
                                    "1.2rem"
                                ]}
                            >
                                { comment.phone }
                            </Text>
                            <Text                         
                                fontSize={[
                                    "1rem",
                                    "1rem",
                                    "1rem",
                                    "1rem",
                                    "1.2rem"
                                ]}
                            >
                                { comment.email }
                            </Text>
                        </Box>
                        </LinkBox>
                        )
                    )
                }
            </SimpleGrid>
            <br />
        </Box>
    );
};

// export the jsx component
export default CommentList;