import { useState, useEffect, useRef } from "react"
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import {firestoreDB} from "../../../firebaseConfig";
import { addDoc,collection, updateDoc,doc } from "firebase/firestore";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
  
  async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
      alert('Must use physical device for Push Notifications');
    }
   
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
    return token;
   }
  
  const sheduleNotification = async (expoPushToken, dailyWaterIntake) => {
    const notification = {
        to: expoPushToken,
        sound: 'default',
        title: 'Test title',
        body: 'Test body',
        priority: 'high',
        channelId: 'default',
        badge: 1,
        data:  `time to drink ${Math.round(dailyWaterIntake/3)}L water`,
      };
      const res = await fetch('https://exp.host/--/api/v2/push/send', {
            method: 'POST',
            headers: {
            'host': "exp.host",
            'accept': "application/json",
            'accept-encoding': "gzip,deflate",
            'content-type': "application/json",
            'expo-push-token': expoPushToken,
            },
            body: JSON.stringify(notification),
        })
        console.log("g",res)
}

export const useReminderHooks = () => {
    const [formData, setformData] = useState({});
    const [response, setRespnse] = useState("")
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const [isChecked, setIsChecked] = useState(false)
    const notificationListener = useRef();
    const responseListener = useRef();
    let dailyWaterIntake;
    let act = 6
    const setFieldsInput = (v) => {
        setformData(prevCount => {
            prevCount[v.key] = v.value
            return prevCount
        })
    }


       useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
          setNotification(notification);
        });
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
          console.log(response);
        });
    
        return () => {
          Notifications.removeNotificationSubscription(notificationListener.current);
          Notifications.removeNotificationSubscription(responseListener.current);
        };
    
      }, []);

    const schedulePushNotification = async (arr) => {
       setIsChecked(arr)
       if(arr) {
        await sheduleNotification(expoPushToken, dailyWaterIntake)
         try {
           await updateDoc(doc(firestoreDB, "reminder", "list"), {todo: "wakeUp"});
         } catch (e) {
           console.error("Error adding document: ", e);
         }
       }
     }    

    const calculateWaterIntake = () => {
        const { age, gender, weight, activity } = formData


        if (age < 18) {
            // Children's recommended water intake
            if (gender === "M") {
                dailyWaterIntake = 30 * weight / 1000;
            } else if (gender === "F") {
                dailyWaterIntake = 25 * weight / 1000;
            } else {
                setRespnse("Invalid gender input");
            }
        } else {
            // Adults' recommended water intake
            if (gender === "M") {
                if (activity === "sedentary") {
                    act = 3
                    dailyWaterIntake = 3.7;
                } else if (activity === "moderatelyactive") {
                    act = 6
                    dailyWaterIntake = 4.7;
                } else if (activity === "veryactive") {
                    act = 10
                    dailyWaterIntake = 6.0;
                } else {
                    setRespnse("Invalid activity input");
                }
            } else if (gender === "F") {
                if (activity === "sedentary") {
                    dailyWaterIntake = 2.7;
                } else if (activity === "moderatelyactive") {
                    dailyWaterIntake = 3.7;
                } else if (activity === "veryactive") {
                    dailyWaterIntake = 4.7;
                } else {
                    setRespnse("Invalid activity input");
                }
            } else {
                setRespnse("Invalid gender input");
            }
        }
        setRespnse(`Recommended daily water intake: ${dailyWaterIntake} litters`);
    }

    return {
        formData,
        setFieldsInput,
        calculateWaterIntake,
        response,
        schedulePushNotification,
        isChecked
    }
}