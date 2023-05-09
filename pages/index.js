import { Container, Divider } from "@chakra-ui/react";
import Auth from "../components/Auth";
import TodoList from "../components/TodoList";
import CommentList from "../components/CommentList";
import EventList from "../components/EventList";
import Footer from '../components/Footer';
import { ColorModeScript } from "@chakra-ui/color-mode";
import theme from "../api/theme";

export default function Home() {
    return (
        <Container 
            maxW="7xl" 
            w={[
                '100%',
                '100%',
                '75%',
                '75%'
            ]} 
            p="0px"
            borderRadius="md" 
            border="dashed black 1px"
        >
            {/* Decides if browser may change dark/light mode depending on time of day: */}
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            {/* User Login Component */}
            <Auth />
            {/* Saved To-Do List Component */}
            <TodoList />
            <Divider 
                orientation='horizontal' 
                my={[   
                    "10px",
                    "10px",
                    "20px",
                    "20px",
                    "20px"
                ]} 
            />
            {/* Saved Event List Component */}
            <EventList />
            <Divider
                orientation='horizontal' 
                my={[   
                    "10px",
                    "10px",
                    "20px",
                    "20px",
                    "20px"
                ]} 
            />
            {/* Saved Contact List Component */}
            <CommentList />
            <Footer />
        </Container>
    );
}