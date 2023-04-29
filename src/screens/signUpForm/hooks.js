import {auth} from '../../../firebaseConfig';
import { useEffect, useState } from "react";
import { createUserWithEmailAndPassword } from 'firebase/auth';

export const useSignUpHooks = (navigation) => {
    const [state, setState] = useState("")
    const [formData, setformData] = useState({});

    const submitSignUp = async () => {
        try {
            await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            setState("user Created")
            navigation.navigate("home")
          } catch (error) {
            setState("not able to sign-in")
          }
    }
    const fillFormData = (v) => {
        setformData(prevCount => { 
            prevCount[v.key]  = v.value
            return prevCount
        })
    }

    return {
        submitSignUp,
        fillFormData,
        state
    }
}
