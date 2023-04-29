import { useEffect, useState } from "react"
import {firestoreDB} from "../../../firebaseConfig";
import { addDoc,doc, collection, getDocs } from "firebase/firestore";

export const useRemediesHook = () => {
const [resp,setResp] = useState(false)
    useEffect(() => {
      addRemedies()
    },[])
    const addRemedies = async () => {
        const response = await getDocs(collection(firestoreDB, "remidies"));
        let d = []
        response.forEach((doc) => {
            let Mydoc = doc.data();
            d.push(Mydoc)
        });
        setResp(d)
    }

    return {
        addRemedies,
        resp
    }
}