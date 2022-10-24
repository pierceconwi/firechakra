// this js file in our /api directory has code for interacting with the firestore db
import { db } from "../firebase";
// now we can import a variety of functions from the firebase SDK
import { 
    collection,
    addDoc,
    updateDoc,
    doc,
    deleteDoc
} from "firebase/firestore";

// create arrow function 
const addTodo = async ( { userId, title, description, status } ) => {
    try {
        await addDoc(
            collection(db, "todo"),
            {
                user: userId,
                title: title,
                description: description,
                status: status,
                createdAt: new Date().getTime()
            }
        );
    } catch(err) {
        console.log(err);
    }

};

// change status
const toggleTodoStatus = async ( { docId, mystatus }) => {
    try {
        // grab reference to existing firestore document via id
        const todoRef = doc(db, "todo", docId );
        // update that doc
        await updateDoc(
            todoRef,
            {
                status: mystatus
            }
        )
    } catch(err) {
        console.log(err);
    }
};

// delete item
const deleteTodo = async ( docId ) => {
try {
    // grab reference to existing firestore document via id
    const todoRef = doc( db, "todo", docId );
    await deleteDoc( todoRef );
} catch(err) {
    console.log(err);
}
};

const editTodo = async ( { title, description, status, id } ) => {
    try {
        console.log("editTodo triggered. doc id: "+id);
        const docref = doc( db, "todo", id );
        if ( !docref.empty ) {
            await updateDoc(docref, 
                {
                    title: title,
                    description: description,
                    status: status
                }
            );
        }
    } catch(err) {
        console.log(err);
    }
}

export { addTodo, toggleTodoStatus, deleteTodo, editTodo };