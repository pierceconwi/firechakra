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
    import { BsTrash } from "react-icons/bs";
    import { deleteEvent } from "../api/events";

    const EventList = () => {
        const [events, setEvents] = React.useState([]);
        const { user } = useAuth() || {};
        const toast = useToast();

        useEffect(
            () => {
                const refreshData = () => {
                    if (!user) {
                    setEvents([]);
                    return;
                    }
                    const q = query(collection(db, "events"), where("user", "==", user.uid));
                    onSnapshot(q, (querySnapshot) => {
                    let ar = [];
                    querySnapshot.docs.forEach((doc) => {
                    ar.push({ id: doc.id, ...doc.data() });
                    });
                    setEvents(ar);
                    });
                    };
            refreshData();
            },
            [user]
        );

        const handleEventDelete = async (id) => {
            if (confirm("Are you sure you wanna delete this event?")) {
                deleteEvent(id);
                toast({ title: "Event deleted successfully", status: "success" });
            }
        };
        
        const handleToggle = async (id, status) => {
            const newStatus = status == "completed" ? "pending" : "completed";
            await toggleEventStatus({ docId: id, status: newStatus });
            toast({
                title: `Event marked ${newStatus}`,
                status: newStatus == "completed" ? "success" : "warning",
            });
        };
        
        return (
            <Box mt={5}>
            <h2>Events</h2>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
                {events &&
                events.map((event) => (
                    <LinkBox key={event.id}>
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
                    <LinkOverlay href={`/event/${event.id}`}>{event.title}{" "}</LinkOverlay>
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
                            onClick={() => handleEventDelete(event.id)}
                            >
                            <BsTrash />
                        </Badge>
                    </Heading>
                    <Text>{event.description}</Text>
                </Box>
                </LinkBox>
                ))}
            </SimpleGrid>
            </Box>
        );
};

export default EventList;