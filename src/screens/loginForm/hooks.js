import { useState } from "react"
import { signInWithEmailAndPassword } from 'firebase/auth';
import {auth} from '../../../firebaseConfig';

export const useFormHooks = (navigation) => {
    const [formData, setformData] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [status, setStatus] = useState("")
    const [showSpin, setShowSpin] = useState(false)
    const setFieldsInput = (v) => {
        setformData(prevCount => { 
            prevCount[v.key]  = v.value
            return prevCount
        })
    }
    const submitLogin = async () => {
        setShowSpin(true)
        navigation.navigate('root')
        // try {
        //     await signInWithEmailAndPassword(auth, formData.email, formData.password);
        //     setShowSpin(false)
        //     navigation.navigate('root')
        //   } catch (error) {
        //     setShowSpin(false)
        //     setStatus(error.message)
        //   }
    }

    return {
        formData,
        setFieldsInput,
        setShowPassword,
        showPassword,
        submitLogin,
        status,
        showSpin
    }
}