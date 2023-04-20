import { useState } from "react"

export const useFormHooks = () => {
    const [formData, setformData] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    const setFieldsInput = (v) => {
        setformData(prevCount => { 
            prevCount[v.key]  = v.value
            return prevCount
        })
    }

    return {
        formData,
        setFieldsInput,
        setShowPassword,
        showPassword
    }
}