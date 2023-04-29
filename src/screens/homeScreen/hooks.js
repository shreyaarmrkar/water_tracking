import { useEffect,useState } from "react"
import {
    BackHandler,
} from 'react-native';
export const useMainHook = () => {
    const [res, setRes] = useState(false)
    const [city,setCity] = useState("nagpur")
    const weekday = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];
    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => true)
        return () => backHandler.remove()
    }
        , [])
    const callList = async () => {
        const url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${city}&days=3`;
        const options = {
            method: 'GET',
            headers: {
                'content-type': 'application/octet-stream',
                'X-RapidAPI-Key': 'd24992d5aemsh37ec686e49b513ep197a45jsn5bdde1defb86',
                'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.text();
            setRes(JSON.parse(result));
        } catch (error) {
            setRes(error);
        }
    }


    useEffect(() => {
        callList()
    },[])


    return {
        res,
        weekday,
        setCity,
        callList
    }
   
}