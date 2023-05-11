import { Container } from "@chakra-ui/react";
import AddComment from "../components/AddComment";
import Auth from "../components/Auth";
import Footer from '../components/Footer';


export default function AddNewComment() {
    return (
        <Container
            maxW="7xl" 
            w={[
                '100%',
                '100%',
                '75%',
                '75%'
            ]} 
            minHeight={["800px", "0px"]}
            p="0px"
            borderRadius="md" 
            border="dashed black 1px"
        >
        <Auth />
        <AddComment />
        <Footer />
        </Container>
    );
}