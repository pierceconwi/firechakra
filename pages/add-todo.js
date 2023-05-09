import { Container } from "@chakra-ui/react";
import AddTodo from "../components/AddTodo";
import Auth from "../components/Auth";
import Footer from '../components/Footer';

export default function AddToDo() {
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
        <Auth />
        <AddTodo />
        <Footer />
        </Container>
    );
}