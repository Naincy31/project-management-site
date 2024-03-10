import { useState, useEffect } from "react"
import { db } from "../firebase/config"
import { collection, onSnapshot } from "firebase/firestore"

export const useCollection = (collectionName) => {
    const [documents, setDocuments] = useState(null)
    const [error, setError] = useState(null)

    //If we don't use a ref -> infinite loop in useEffect
    //queryDoc is an array and is diff on every function call and is being passed as a reference
    // const _query = useRef(queryDoc).current
    // const _order = useRef(orderDoc).current

    useEffect(() => {
        //let ref = query(collection(db, collectionName), where(..._query), orderBy(..._order))
        const ref = collection(db, collectionName)

        const getDocuments = async () => {

            const unsubscribe = await onSnapshot(ref, (snapshot) => {
                let results = []
                snapshot.forEach(( doc ) => {
                    results.push({ ...doc.data(), id: doc.id })
                })
    
                //update state
                setDocuments(results)
                setError(null)
            }, (error) => {
                console.log(error);
                setError('Could not fetch the data')
            })

            //unsubscribe on unmount
            return () => unsubscribe();
        }

        getDocuments();

    }, [collectionName])

    return { documents, error }
}