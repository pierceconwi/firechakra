import React from "react";
import useAuth from "../../hooks/useAuth";
import Auth from "../../components/Auth";
import {
    Box,
    Heading,
    Text
} from "@chakra-ui/react";
import {
    doc,
    getDoc
} from "firebase/firestore";
import { db } from "../../firebase/index";

// define jsx component to show a single todo entry
const TodoItem = ( {itemData} ) => {
    // enforce login: should get a useAuth, otherwise user doesnt exist
    const { user } = useAuth() || {};
    if (!user) {
        return;
    }
    // if code hits here, user is logged in
    // return the jsx component
    return (
        <Box>
            <Auth />
            <Box mt={5} padding="10px" textAlign="center" boxShadow="base" ml="25%" mr="25%" borderRadius="md" bg="white">
                <br />
                <Heading as="h3" fontSize={"xl"}>
                    Title: { itemData.title }
                </Heading>
                <Text>
                    Description: { itemData.description }
                </Text>
                <Text>
                    Status: { itemData.status }
                </Text>
            </Box>
        </Box>
    );
};

// define required getServerSideProps() func that Next will call
// dynamically routed url: /todo/x (where x is the id)
export async function getServerSideProps(context) {
    // receive everything it needs via Next's "context" variable
    // get url paramater that Next.js set for id: context.params.id contains it
    let itemData = null;
    //get doc from firestore collection
    const docRef = doc( db, 'todo', context.params.id )
    const docSnap = await getDoc(docRef);
    if ( docSnap.exists() ) {
        itemData = docSnap.data();
        // add the Firebase document's ID (name of doc) as the value of a new parameter in itemData's "id" field so it may be used later
        itemData.id = context.params.id;
        console.log("itemData contents:")
        console.log(itemData);
    }
    return {
        props: {
            itemData
        }
    }
}

// export component
export default TodoItem;