import { collection, addDoc, Timestamp, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { useReducer } from "react";

const initialState = {
    document: null,
    isPending: false,
    error: null,
    success: null
}

const firestoreReducer = (state, action) => {
    switch (action.type){
        case 'IS_PENDING':
            return { ...state, document: null, isPending: true, error: null, success: false }
        case 'ADDED_DOCUMENT':
            return { ...state, document: action.payload, isPending: false, success: true, error: null }
        case 'DELETED_DOCUMENT':
            return { ...state, document: null, isPending: false, error: null, success: true}
        case 'UPDATE_DOC':
            return { ...state, document: action.payload, isPending: false, success: true, error: null }
        case 'ERROR':
            return { ...state, error: action.payload, isPending: false, success: false, document: null }
        default:
            return state
    }
}

export const useFirestore = (collectionName) => {
    const [response, dispatch] = useReducer(firestoreReducer, initialState);

    // collection ref
    const ref = collection(db, collectionName);

    //add a document
    const addDocument = async (data) => {
        dispatch({ type: 'IS_PENDING' });

        try {
            const createdAt = Timestamp.fromDate(new Date());
            const addedDocument = await addDoc(ref, { ...data, createdAt });
            dispatch({ type: 'ADDED_DOCUMENT', payload: addedDocument })
        } catch (err) {
            dispatch({ type: 'ERROR', payload: err.message })
        }
    }

    //delete a document
    const deleteDocument = async (id) => {
        dispatch({ type: 'IS_PENDING' });

        try {
            await deleteDoc(doc(ref, id));
            dispatch({ type: 'DELETED_DOCUMENT' })
        } catch (err) {
            dispatch({ type: 'ERROR', payload: 'Could not delete' })
        }
    }

    //update document
    const updateDocument = async (id, updates) => {
        dispatch({ type: 'IS_PENDING' });
        console.log(response);

        const docRef = doc(ref, id)
        try {
            const updatedDocument = await updateDoc(docRef, updates)
            dispatch({ type: 'UPDATE_DOC', payload: updatedDocument})
            return updatedDocument
        } catch (err) {
            dispatch({ type: 'ERROR', payload: err.message})
            return null
        }
    }

    return {addDocument, deleteDocument, updateDocument, response};
}