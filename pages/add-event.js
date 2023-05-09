import { Container } from "@chakra-ui/react";
import AddEvent from "../components/AddEvent";
import Auth from "../components/Auth";
import Footer from '../components/Footer';

export default function AddEvents() {
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
        <AddEvent />
        <Footer />
        </Container>
    );
}