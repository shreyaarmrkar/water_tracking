import { useState, useEffect, useRef } from "react"
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import * as Permissions from 'expo-permissions';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

export const useReminderHooks = () => {
    const [formData, setformData] = useState({});
    const [response, setRespnse] = useState("")
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();
    let act = 6
    const setFieldsInput = (v) => {
        setformData(prevCount => {
            prevCount[v.key] = v.value
            return prevCount
        })
    }
   
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
          console.log("Expo push token:", token);
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

       useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
     
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
          setNotification(notification);
        });
     
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        });
     
        return () => {
          Notifications.removeNotificationSubscription(notificationListener.current);
          Notifications.removeNotificationSubscription(responseListener.current);
        };
      }, []);

     const sheduleNotification = async () => {
        const notification = {
            to: expoPushToken,
            sound: 'default',
            title: 'Test title',
            body: 'Test body',
            data: { testData: 'test data' },
          };
          await fetch('https://exp.host/--/api/v2/push/send', {
                method: 'POST',
                headers: {
                Accept: 'application/json',
                'Accept-encoding': 'gzip, deflate',
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(notification),
            });
    }

    const calculateWaterIntake = () => {
        const { age, gender, weight, activity } = formData
        let dailyWaterIntake;

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
        sheduleNotification
    }
}