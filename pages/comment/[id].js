import React from "react";
import useAuth from "../../hooks/useAuth";
import Auth from "../../components/Auth";
import {
    Box,
    Heading,
    Text,
    Textarea,
    Stack,
    Input,
    Button,
    useToast,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    Center,
    Badge
} from "@chakra-ui/react";
import { AtSignIcon } from '@chakra-ui/icons'
import {
    doc,
    getDoc
} from "firebase/firestore";
import { db } from "../../firebase/index";
import { editComment } from "../../api/comments";

// define jsx component to show a single todo entry
const ContactItem = ( {itemData} ) => {
    // comment text input state set-up:
    const [title, setTitle] = React.useState("");
    const [comment, setComment] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [email, setEmail] = React.useState("");
    // additional aspect state set-up:
    const [isLoading, setIsLoading] = React.useState(false);
    // chakra related:
    const toast = useToast();
    // enforce login: should get a useAuth, otherwise user doesnt exist
    const { user } = useAuth() || {};

    // define function to handle edit contact operation
    const handleCommentEdit = async () => {
        // if user is logged in, this code runs instead of above:
        setIsLoading(true);
        // build object value template
        const commentData = {
            title: title,
            comment: comment,
            phone: phone,
            email: email,
            id: itemData.id
        };
        console.log(commentData);
        // call our api function addComment() to use the data stored in comment to build the entry
        await editComment(commentData);
        // firestore doc has been created/updated, reset comment form:
        setIsLoading(false);
        setTitle("");
        setComment("");
        setPhone("");
        setEmail("");
        // show toast notification with status update
        toast(
            {
                title: "Update successful. The page will now refresh.",
                status: "success"
            }
        );
        await new Promise(r => setTimeout(r, 1500));
        window.location.reload();
    };


    if (!user) {
        return;
    }
    // if code hits here, user is logged in
    // return the jsx component
    return (
        <Box ml="3%" mr="3%">
            <Auth/>
            <Box w={["80%", "300px", "750px", "940px", ]} mt={5} padding="10px" textAlign="center" boxShadow="base" ml="25%" mr="25%" borderRadius="md" bg="white" fontSize={['1em', '1.2em', '1.4em', '1.6em', '1.8em']}>
                <br />
                <Heading as="h3" fontSize={"xl"}>
                    <Badge>
                        <AtSignIcon 
                            w="15px"
                            h="15px"
                        />
                    </Badge>
                    Title: { itemData.title }
                </Heading>
                <Text>
                    Description: { itemData.comment }
                </Text>
                <Text>
                    Phone: { itemData.phone }
                </Text>
                <Text>
                    Email: { itemData.email }
                </Text>
                <br />
            </Box>
            <br />
            <Accordion ml="25%" mr="25%">
                <AccordionItem>
                <AccordionButton>
                    <Center  h={["50px"]} w={["8000px"]}>
                        <Button bg="cyan.300" borderRadius="md" boxShadow="base">Edit Contact</Button>
                    </Center>
                </AccordionButton>
                <AccordionPanel>
            <Box margin={"0 auto"} display="block" mt={5}>
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
                    onClick={ () => handleCommentEdit() } 
                    disabled={ title.length < 1 || comment.length < 1 || phone < 1 || isLoading }
                    bg="cyan.300"
                    variant="solid"
                >
                    Save
                </Button>
            </Stack>
        </Box>
        </AccordionPanel>
        </AccordionItem>
        </Accordion>
        </Box>
    );
};

// define required getServerSideProps() func that Next will call
// dynamically routed url: /todo/x (where x is the id)
export async function getServerSideProps(context) {
    // receive everything it needs via Next's "context" variable
    // get url paramater that Next.js set for id: context.params.id contains it
    let itemData = null;
    //get doc from firestore collection
    const docRef = doc( db, 'comments', context.params.id );
    const docSnap = await getDoc(docRef);
    if ( docSnap.exists() ) {
        itemData = docSnap.data();
        // add the Firebase document's ID (name of doc) as the value of a new parameter in itemData's "id" field so it may be used later
        itemData.id = context.params.id;
        console.log("itemData contents:")
        console.log(itemData);
    }
    return {
        props: {
            itemData
        }
    }
}

// export component
export default ContactItem;