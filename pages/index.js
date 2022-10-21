import { Container, Spacer } from "@chakra-ui/react";
import Auth from "../components/Auth";
import TodoList from "../components/TodoList";
import CommentList from "../components/CommentList";
import EventList from "../components/EventList";
import { ColorModeScript } from "@chakra-ui/color-mode";
import theme from "../api/theme";

export default function Home() {
    return (
        <Container maxW="7xl" borderRadius="md">
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            <Auth />
            <TodoList />
            <EventList />
            <CommentList />
        </Container>
    );
}