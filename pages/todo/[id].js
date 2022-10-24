import React from "react";
import useAuth from "../../hooks/useAuth";
import Auth from "../../components/Auth";
import {
    Box,
    Heading,
    Text,
    Badge,
    useToast,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    Center,
    Button,
    Stack,
    Input,
    Textarea,
    Select
} from "@chakra-ui/react";
import { EditIcon } from '@chakra-ui/icons'
import {
    doc,
    getDoc
} from "firebase/firestore";
import { db } from "../../firebase/index";
import { editTodo } from "../../api/todo";

// define jsx component to show a single todo entry
const TodoItem = ( {itemData} ) => {
    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [status, setStatus] = React.useState("pending");
    // additional aspect state set-up:
    const [isLoading, setIsLoading] = React.useState(false);
    // chakra related:
    const toast = useToast();
    // enforce login: should get a useAuth, otherwise user doesnt exist
    const { user } = useAuth() || {};

    // define function to handle edit task operation
    const handleTodoEdit = async () => {
        // if user is logged in, this code runs instead of above:
        setIsLoading(true);
        // build object value template
        const todoData = {
            title: title,
            description: description,
            status: status,
            id: itemData.id
        };
        console.log("todo data: "+ todoData);
        // call our api function addComment() to use the data stored in comment to build the entry
        await editTodo(todoData);
        // firestore doc has been created/updated, reset comment form:
        setIsLoading(false);
        setTitle("");
        setDescription("");
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
            <Auth />
            <Box mt={5} padding="10px" textAlign="center" boxShadow="base" ml="25%" mr="25%" borderRadius="md" bg="white">
                <br />
                <Heading as="h3" fontSize={"xl"}>
                    <Badge>
                        <EditIcon 
                            w="15px"
                            h="15px"
                        />
                    </Badge> 
                    Title: { itemData.title }
                </Heading>
                <Text>
                    Description: { itemData.description }
                </Text>
                <Text>
                    Status: { itemData.status }
                </Text>
            </Box>
            <br />
            <Accordion ml="25%" mr="25%">
                <AccordionItem>
                <AccordionButton>
                    <Center  h={["50px"]} w={["8000px"]}>
                        <Button bg="cyan.300" borderRadius="md" boxShadow="base">Edit Event</Button>
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
                    value={description}
                    onChange={ (e) => setDescription(e.target.value) }
                />
                <Select value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option
                        value={"pending"}
                        style={{ color: "yellow", fontWeight: "bold" }}
                    >
                    Pending ⌛
                    </option>
                    <option
                        value={"completed"}
                        style={{ color: "green", fontWeight: "bold" }}
                    >
                    Completed ✅
                    </option>
                </Select>
                <Button
                    onClick={ () => handleTodoEdit() } 
                    disabled={ title.length < 1 || description.length < 1 || isLoading }
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
    const docRef = doc( db, 'todo', context.params.id )
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
export default TodoItem;