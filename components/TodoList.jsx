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
            if (confirm("Are you sure you wanna delete this task?")) {
                deleteTodo(id);
                toast({ title: "Task deleted successfully", status: "success" });
            }
        };
        
        return (
            <Box px={['5px', '5px', '10px', '10px', '10px']} mt={5} textAlign="center" fontSize={['0.8em', '1em', '1.2em', '1.4em', '1.6em']}>
                <Heading fontSize={['1.2em', '1.2em', '1.2em', '1.2em', '1.4em']}>Tasks<Badge  bg="white">
                    <EditIcon 
                    w="15px"
                    h="15px"
                    />
                </Badge></Heading>
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
                    {todos &&
                    todos.map((todo) => (
                        <LinkBox key={todo.id}>
                        <Box
                            p={3}
                            boxShadow="2xl"
                            shadow={"base"}
                            transition="0.2s"
                            _hover={{ boxShadow: "sm" }}
                            borderRadius="md"
                        >
                        <Heading as="h3" mb="3px" fontSize={['1.4em', '1.2em', '1em', '1em', '1em']}>
                        <LinkOverlay href={`/todo/${todo.id}`}>{todo.title}{" "}</LinkOverlay>
                        </Heading>
                        <Text 
                            fontSize={[
                                "1rem",
                                "1rem",
                                "1rem",
                                "1rem",
                                "1.2rem"
                            ]}
                        >{todo.description}</Text>
                    </Box>
                    </LinkBox>
                    ))}
                </SimpleGrid>
            </Box>
        );
};

export default TodoList;