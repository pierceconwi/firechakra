import { Container } from "@chakra-ui/react";
import Auth from "../components/Auth";
import TodoList from "../components/TodoList";
import CommentList from "../components/CommentList";
import EventList from "../components/EventList";
import { ColorModeScript } from "@chakra-ui/color-mode";
import theme from "../api/theme";

export default function Home() {
    return (
        <Container maxW="7xl" w="100%" borderRadius="md" border="dashed black 1px">
            {/* Decides if browser may change dark/light mode depending on time of day: */}
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            {/* User Login Component */}
            <Auth />
            {/* Saved To-Do List Component */}
            <TodoList />
            {/* Saved Event List Component */}
            <EventList />
            {/* Saved Contact List Component */}
            <CommentList />
        </Container>
    );
}