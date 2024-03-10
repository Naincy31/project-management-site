import { useState, useEffect } from "react"; 
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, storage, db } from "../firebase/config";
import { useAuthContext }  from "./useAuthContext";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { collection, doc, setDoc } from "firebase/firestore";

const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (email, password, displayName, avatar) => {
    setError(null)
    setIsPending(true)

    try {
        //signup user
        const res = await createUserWithEmailAndPassword(auth, email, password);

        if(!res){
            throw new Error('Could not complete signup');
        }

        console.log(res);

        //Upload User Avatar
        const uploadPath = `avatars/${res.user.uid}/${avatar.name}`

        //Returns a storage reference for a giver URL
        const storageRef = ref(storage, uploadPath)

        //Uploads data to this object's location. The upload is not resumable.
        const uploadResult = await uploadBytes(storageRef, avatar)
        console.log(uploadResult); //object contains information about the upload process

        //to get the downloadable URL for the uploaded file.
        const imageURL = await getDownloadURL(storageRef, uploadPath); 
        console.log(imageURL);

        //Add display name to current user
        await updateProfile(auth.currentUser, { displayName, photoURL: imageURL })
        console.log(auth.currentUser);

        //create a user document

        const userCollectionRef = collection(db, 'users')

        await setDoc(doc(userCollectionRef, auth.currentUser.uid), {
          online: true,
          displayName,
          photoURL: imageURL
        })

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