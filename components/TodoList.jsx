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
    import React, { useEffect } from "react";
    import useAuth from "../hooks/useAuth";
    import { collection, onSnapshot, query, where } from "firebase/firestore";
    import { db } from "../firebase";
    import { EditIcon } from '@chakra-ui/icons'
    import { BsTrash } from "react-icons/bs";
    import { deleteTodo } from "../api/todo";

    const TodoList = () => {
        const [todos, setTodos] = React.useState([]);
        const { user } = useAuth() || {};
        const toast = useToast();

        useEffect(
            () => {
                const refreshData = () => {
                    if (!user) {
                    setTodos([]);
                    return;
                    }
                    const q = query(collection(db, "todo"), where("user", "==", user.uid));
                    onSnapshot(q, (querySnapshot) => {
                    let ar = [];
                    querySnapshot.docs.forEach((doc) => {
                    ar.push({ id: doc.id, ...doc.data() });
                    });
                    setTodos(ar);
                    });
                    };
            refreshData();
            },
            [user]
        );

        const handleTodoDelete = async (id) => {
            if (confirm("Are you sure you wanna delete this todo?")) {
                deleteTodo(id);
                toast({ title: "Todo deleted successfully", status: "success" });
            }
        };
        
/*         const handleToggle = async (id, status) => {
            const newStatus = status == "completed" ? "pending" : "completed";
            await toggleTodoStatus({ docId: id, status: newStatus });
            toast({
                title: `Todo marked ${newStatus}`,
                status: newStatus == "completed" ? "success" : "warning",
            });
        }; */
        
        return (
            <Box mt={5}>
            <h2>Tasks</h2>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
                {todos &&
                todos.map((todo) => (
                    <LinkBox key={todo.id}>
                    <Box
                        p={3}
                        boxShadow="2xl"
                        shadow={"dark-lg"}
                        transition="0.2s"
                        _hover={{ boxShadow: "sm" }}
                        borderRadius="md"
                        bg="white"
                    >
                    <Heading as="h3" fontSize={"xl"}>
                    <LinkOverlay href={`/todo/${todo.id}`} ml="6px">{todo.title}{" "}</LinkOverlay>
                         <Badge
                            float="left"
                            mt="3px"
                        >
                            <EditIcon 
                            w="15px"
                            h="15px"
                            />
                        </Badge> 
                        <Badge
                            color="gray.400"
                            bg="inherit"
                            transition={"0.2s"}
                            _hover={{
                                bg: "inherit",
                                transform: "scale(1.2)",
                            }}
                            float="right"
                            size="xs"
                            onClick={() => handleTodoDelete(todo.id)}
                            >
                            <BsTrash />
                        </Badge>
{/*                         <Badge
                            color={todo.status == "pending" ? "gray.500" : "green.500"}
                            bg="inherit"
                            transition={"0.2s"}
                            _hover={{
                                bg: "inherit",
                                transform: "scale(1.2)",
                            }}
                            float="right"
                            size="xs"
                            onClick={() => handleToggle(todo.id, todo.status)}
                        >
                            {todo.status == "pending" ? <FaToggleOff /> : <FaToggleOn />}
                        </Badge>
                        <Badge
                            float="right"
                            opacity="0.8"
                            bg={todo.status == "pending" ? "yellow.500" : "green.500"}
                            >
                            {todo.status}
                        </Badge> */}
                    </Heading>
                    <Text ml="30px">{todo.description}</Text>
                </Box>
                </LinkBox>
                ))}
            </SimpleGrid>
            </Box>
        );
};

export default TodoList;