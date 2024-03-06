import { useState, useEffect } from "react"; 
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from "../firebase/config";
import { useAuthContext }  from "./useAuthContext";

const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (email, password, displayName) => {
    setError(null)
    setIsPending(true)

    try {
        //signup user
        const res = await createUserWithEmailAndPassword(auth, email, password);

        if(!res){
            throw new Error('Could not complete signup');
        }

        //Add display name to current user
        await updateProfile(auth.currentUser, { displayName })

        console.log(auth.currentUser);

        //dispatch login action
        dispatch({ type: 'LOGIN', payload: auth.currentUser})

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

  return {error, isPending, signup}
}

export default useSignup;