import { useState } from "react"
import { Button, Flex, Input, Select,CheckIcon, Text, Center } from "native-base"
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

export const useSleepLogHook = () => {
    const [mode, setMode] = useState(false);
    const [showError, setShowError] = useState(false);
    const [time, setTime] = useState(new Date())
    const [details, setDetails] = useState({})
    const [response, setResponse] = useState("")
    const onChange = (event, selectedDate) => {
        setTime(new Date())
        const currentDate = selectedDate;
        setTime(currentDate)
    };
    const dropoDwnOption = [
        { value: "wakeUp", label: "I want to wake up at" },
        { value: "sleepAt", label: "I want to go to sleep at" },
        { value: "sleepNeeded", label: "How much sleep do i need" }
    ]


    const calculateSleepRequirement = (age, workLevel) => {
        let sleepRequirement;
        if (age < 0) {
            throw new Error('Invalid age: age must be a positive number.');
        } else if (age < 1) {
            sleepRequirement = workLevel === 'sedentary' ? 14 : 15;
        } else if (age < 3) {
            sleepRequirement = workLevel === 'sedentary' ? 12 : 14;
        } else if (age < 6) {
            sleepRequirement = workLevel === 'sedentary' ? 10 : 13;
        } else if (age < 14) {
            sleepRequirement = workLevel === 'sedentary' ? 9 : 11;
        } else if (age < 18) {
            sleepRequirement = workLevel === 'sedentary' ? 8 : 10;
        } else if (age < 26) {
            sleepRequirement = workLevel === 'sedentary' ? 7 : 9;
        } else if (age < 65) {
            sleepRequirement = "7 to 9";
        } else if (age >= 65) {
            sleepRequirement = "7 to 8";
        } else {
            throw new Error('Invalid age: age must be a number.');
        }
        return  setResponse(`You require ${sleepRequirement} hour of sleep daily.`);
    }

    const showDatepicker = () =>
        <Flex spac direction="column" mb="2.5" mt="2.5">
            <Center>
                <Button size="sm" w="100%" variant="outline" onPress={() => showDatePicker()}>
                    set time
                </Button>
                <Text mt="4">{time.toLocaleTimeString()}</Text>
            </Center>
        </Flex>

    const onChangeDetails = (val, key) => {
        setDetails((prev) => {
            prev[key] = val
            return prev
        })
    }

    const calculateSleepTime = () => {
        const cycleLength = 90;
        const sleepCycles = 5;
        const wakeUpTime = new Date(time)
        const bedtime = new Date(wakeUpTime - (cycleLength * sleepCycles * 60 * 1000));
        setResponse(`to wake up at ${wakeUpTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}, you need to sleep at ${bedtime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`)
    }

    const calculateWakeUpTime = () => {
        const wakeupTime = new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        const idealSleepDuration = 8;
        const bedtime = new Date(time - idealSleepDuration * 60 * 60 * 1000);
        const formatedtime = bedtime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        setResponse(`If you want to wake up at ${wakeupTime}, you should go to bed at ${formatedtime}.`)
    }

    const getDetails = () => (
        <Flex direction="row" mb="2.5" mt="2.5">
            <Input mr="2" w="46%" defaultValue={details.age} placeholder="Enter Age" onChangeText={(val) => onChangeDetails(val, "age")} />
            <Select w="40" selectedValue={details.workType} accessibilityLabel="Choose Service" placeholder="Choose Service" _selectedItem={{
                bg: "teal.600",
                endIcon: <CheckIcon size={5} />
            }} mt="1" onValueChange={itemValue => onChangeDetails(itemValue, "workType")}>
                <Select.Item label="Sedentary" value="sedentary" key="sedentary" />
                <Select.Item label="Moving" value="moving" key="moving" />
            </Select>
        </Flex>
    )

    const showDatePicker = () => {
        DateTimePickerAndroid.open({
            value: time,
            onChange,
            mode: "time",
            is24Hour: false,
        });
    }

    const calculate = () => {
        setResponse("")
        switch (mode) {
            case "wakeUp":
                calculateWakeUpTime()
                break;
            case "sleepAt":
                calculateSleepTime()
                break;
            case "sleepNeeded":
                calculateSleepRequirement(details.age,details.workType)
                break;
        }
        console.log(response)
    }

    const setSleepMode = (v) => {
        setMode(v)
    }

    const getSleepTime = () => {

    }


    return {
        mode,
        setSleepMode,
        dropoDwnOption,
        showError,
        showDatepicker,
        getDetails,
        calculate,
        response,
        time
    }
}