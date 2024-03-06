import { collection, addDoc, Timestamp, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/config";
import { useReducer, useEffect, useState } from "react";

let initialState = {
    document: null,
    isPending: false,
    error: null,
    success: null
}

const firestoreReducer = (state, action) => {
    switch (action.type){
        case 'IS_PENDING':
            return { isPending: true, document: null, success: false, error: null }
        case 'ADDED_DOCUMENT':
            return { document: action.payload, isPending: false, success: true, error: null }
        case 'DELETED_DOCUMENT':
            return { document: null, isPending: false, error: null, success: true}
        case 'ERROR':
            return { error: action.payload, isPending: false, success: false, document: null }
        default:
            return state
    }
}

export const useFirestore = (collectionName) => {
    const [response, dispatch] = useReducer(firestoreReducer, initialState);
    const [isCancelled, setIsCancelled] = useState(false);

    // collection ref
    const ref = collection(db, collectionName);

    //only dispatch is not cancelled
    const dispatchIfNotCancelled = (action) => {
        if (!isCancelled) {
            dispatch(action)
        }
    }

    //add a document
    const addDocument = async (data) => {
        dispatch({ type: 'IS_PENDING' });

        try {
            const createdAt = Timestamp.fromDate(new Date());
            const addedDocument = await addDoc(ref, { ...data, createdAt });
            dispatchIfNotCancelled({ type: 'ADDED_DOCUMENT', payload: addedDocument })
        } catch (err) {
            dispatchIfNotCancelled({ type: 'ERROR', payload: err.message })
        }
    }

    //delete a document
    const deleteDocument = async (id) => {
        dispatch({ type: 'IS_PENDING' });

        try {
            await deleteDoc(doc(ref, id));
            dispatchIfNotCancelled({ type: 'DELETED_DOCUMENT' })
        } catch (err) {
            dispatchIfNotCancelled({ type: 'ERROR', payload: 'Could not delete' })
        }
    }

    useEffect(() => {
        return () => setIsCancelled(true); 
    }, [])

    return {addDocument, deleteDocument, response};
}