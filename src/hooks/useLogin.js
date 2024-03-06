import { useEffect, useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { auth } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";

export const useLogin = () => {
    const [isCancelled, setIsCancelled] = useState(false);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const { dispatch } = useAuthContext();

    const login = async (email, password) => {
        setError(null);
        setIsPending(true);

        //sign the user in
        try {
            await signInWithEmailAndPassword(auth, email, password)
            console.log(auth.currentUser);
            //dispatch login action
            dispatch({ type: 'LOGIN', payload: auth.currentUser})

            //update state
            if(!isCancelled){
                setIsPending(false);
                setError(null);
            }
            
        } catch (err) {
            if(!isCancelled){
                console.log(err.message);
                setError(err.message);
                setIsPending(false);
            }
        }
    }

    useEffect(() => {
        return () => setIsCancelled(true);
    }, [])

    return {login, error, isPending}

}