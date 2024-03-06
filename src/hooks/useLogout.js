import { useEffect, useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";

const useLogout = () => {
    const [isCancelled, setIsCancelled] = useState(false);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const { dispatch } = useAuthContext();

    const logout = async () => {
        setError(null);
        setIsPending(true);

        //sign the user out
        try {
            await signOut(auth)
            console.log('Signout Successful');

            //dispatch logout action
            dispatch({type: 'LOGOUT' })

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

    return {logout, error, isPending}
}

export default useLogout