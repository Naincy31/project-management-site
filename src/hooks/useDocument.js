import { doc, onSnapshot } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../firebase/config"


export const useDocument = (collectionName, id) => {
    const [document, setDocument] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        const ref = doc(db, collectionName, id);

        const getDocument = async () => {

            const unsubscribe = await onSnapshot(ref, (snapshot) => {
                if (snapshot.data()) {
                    setDocument({ ...snapshot.data(), id: snapshot.id })
                    setError(null)
                } else {
                    setError('No such document exists')
                }
            }, (error) => {
                console.log(error);
                setError('Could not fetch the data')
            })

            //unsubscribe on unmount
            return () => unsubscribe();
        }

        getDocument();

    }, [collectionName,id])

    return { document, error }
}