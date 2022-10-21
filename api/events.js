// this js file in our /api directory has code for interacting with the firestore db
import { db } from "../firebase";
// now we can import a variety of functions from the firebase SDK
import { 
    collection,
    addDoc,
    doc,
    deleteDoc
} from "firebase/firestore";

// create arrow function which adds new comment
// pattern: const FUNCTIONNAME = async (ARGUMENTS) => { CODE };
// arguments are the firestore document fields you would like to create/use
const addEvent = async ( { userId, title, description } ) => {
    try {
        await addDoc(
            // call collection() function, refer to database, and create/specify a collection
            collection(db, "events" ),
            {
            // reference fields from firestore document, and set values to the above parameters
                user: userId,
                title: title,
                description: description,
                createdAt: new Date().getTime()
            }
        );
    } catch(err) {
        console.log(err);
    }

};

// async arrow function to delete existing comments
const deleteEvent = async ( docId ) => {
    try {
        // grab reference to existing firestore document via id
        const commentRef = doc( db, "events", docId );
        await deleteDoc( commentRef );
    } catch(err) {
        console.log(err);
    }
};

export { addEvent, deleteEvent };