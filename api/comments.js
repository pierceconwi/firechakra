// this js file in our /api directory has code for interacting with the firestore db
import { db } from "../firebase";
// now we can import a variety of functions from the firebase SDK
import { 
    collection,
    addDoc,
    doc,
    deleteDoc,
    updateDoc
} from "firebase/firestore";
import { firebase, firestore } from "firebase/app";

// create arrow function which adds new comment
// pattern: const FUNCTIONNAME = async (ARGUMENTS) => { CODE };
// arguments are the firestore document fields you would like to create/use
const addComment = async ( { userId, title, comment, phone, email } ) => {
    try {
        await addDoc(
            // call collection() function, refer to database, and create/specify a collection
            collection( db, "comments" ),
            {
            // reference fields from firestore document, and set values to the above parameters
                user: userId,
                title: title,
                comment: comment,
                phone: phone,
                email: email,
                createdAt: new Date().getTime()
            }
        );
    } catch(err) {
        console.log(err);
    }

};

// async arrow function to delete existing comments
const deleteComment = async ( docId ) => {
    try {
        // grab reference to existing firestore document via id
        const commentRef = doc( db, "comments", docId );
        await deleteDoc( commentRef );
    } catch(err) {
        console.log(err);
    }
};

const editComment = async ( { title, comment, phone, email, id } ) => {
    try {
        console.log("editComment triggered. doc id: "+id);
        const docref = doc( db, "comments", id );
        if ( !docref.empty ) {
            await updateDoc(docref, 
                {
                    title: title,
                    comment: comment,
                    phone: phone,
                    email: email
                }
            );
        }
    } catch(err) {
        console.log(err);
    }
}

export { addComment, deleteComment, editComment };