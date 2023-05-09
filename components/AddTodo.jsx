import React from "react";
import {
Box,
Input,
Button,
Textarea,
Stack,
Select,
useToast,
} from "@chakra-ui/react";
import useAuth from "../hooks/useAuth";
import { addTodo } from "../api/todo";

const AddTodo = () => {
    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [status, setStatus] = React.useState("pending");
    const [isLoading, setIsLoading] = React.useState(false);
    const toast = useToast();
    const { isLoggedIn, user } = useAuth();
    const handleTodoCreate = async () => {
        if (!isLoggedIn) {
            toast({
                title: "You must be logged in to create a todo",
                status: "error",
                duration: 9000,
                isClosable: true,
            });
            return;
        }
        setIsLoading(true);
        const todo = {
            title,
            description,
            status,
            userId: user.uid,
        };
        await addTodo(todo);
        setIsLoading(false);
        setTitle("");
        setDescription("");
        setStatus("pending");
        toast(
            { 
                title: "Task created successfully. Redirecting to list...", 
                status: "success" 
            }
        );
        await new Promise(r => setTimeout(r, 1500));
        window.location.assign("/");
    };
    return (
        <Box w={["450px", "500px", "800px", "1000px", "1300px"]} margin={"0 auto"} display="block" mt={5} mb={5} maxW="100%" px={['5px', '5px', '10px', '10px', '10px']}>
            <Stack direction="column">
                <Input
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <Textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
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
                    onClick={() => handleTodoCreate()}
                    disabled={title.length < 1 || description.length < 1 || isLoading}
                    colorScheme="green"
                    variant="solid"
                >
                Add Task
                </Button>
            </Stack>
        </Box>
    );
};
export default AddTodo;