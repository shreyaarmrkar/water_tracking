import { useEffect, useState } from "react"
import {firestoreDB} from "../../../firebaseConfig";
import { addDoc,doc, collection, getDocs } from "firebase/firestore";

export const useExerciseHook = () => {
const [resp,setResp] = useState(false)

    useEffect(() => {
      getExercise()

    },[])
    const getExercise = async () => {
        const response = await getDocs(collection(firestoreDB, "excercise"));
        response.forEach((doc) => {
           setResp(doc.data().data)
        });
       
    }

    return {
        resp
    }
}