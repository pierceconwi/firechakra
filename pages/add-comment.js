import { Container } from "@chakra-ui/react";
import AddComment from "../components/AddComment";
import Auth from "../components/Auth";

export default function AddNewComment() {
    return (
        <Container maxW="7xl">
        <Auth />
        <AddComment />
        </Container>
    );
}