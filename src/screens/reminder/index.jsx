
import * as React from "react";
import { Text, Flex,ScrollView, Select, Switch, CheckIcon, Input, Button, Center } from "native-base";
import Card from "../../components/Cards";
import {useReminderHooks} from "./hooks";
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';

const Reminder = () => {
    const {formData, setFieldsInput, calculateWaterIntake,isChecked, schedulePushNotification, response} = useReminderHooks()

    return (
        <ScrollView>
        <Card ItemContent={
            () =>
            <>
                <Flex direction="row">
                <Text w="60%" color="yellow.800" fontSize="16" fontWeight="900">Drink Water Notification</Text>
                <Switch w="35%" mt="-2" size="lg" isChecked={isChecked} onToggle={(arr) => schedulePushNotification(arr)} colorScheme="primary" />
            </Flex>
                <Flex direction="row" mt="4"> <Text w="30%" mt="2"  fontSize="16" fontWeight="600">Gender :</Text><Select minWidth="200" accessibilityLabel="Gender" selectedValue={formData.gender} placeholder="Choose Service" _selectedItem={{
                    bg: "teal.600",
                    endIcon: <CheckIcon size={5} />
                }} onValueChange={itemValue => setFieldsInput({key: "gender", value: itemValue})}>
                    <Select.Item label="Male" value="M" />
                    <Select.Item label="Female" value="F" />
                </Select></Flex>
                <Flex direction="row" mt="2">
                    <Text w="30%" mt="2" fontSize="16" fontWeight="600">Age :</Text>
                    <Input mr="2" defaultValue={formData.age} w="65%" placeholder="Enter Age" onChangeText={(val) => setFieldsInput({key: "age", value: val})} />
                </Flex>
                <Flex direction="row" mt="2">
                    <Text w="30%" mt="2" fontSize="16" fontWeight="600">Weight :</Text>
                    <Input mr="2" w="65%" defaultValue={formData.weight} placeholder="Enter weight" onChangeText={(val) => setFieldsInput({key: "weight", value: val})} />
                </Flex>
                <Flex direction="row" mt="2">
                    <Text w="30%" mt="2" fontSize="16" fontWeight="600">Physical Activity :</Text>
                    <Select minWidth="200" accessibilityLabel="Gender" placeholder="Choose Service" selectedValue={formData.activity} _selectedItem={{
                        bg: "teal.600",
                        endIcon: <CheckIcon size={5} />
                    }} onValueChange={itemValue => setFieldsInput({key: "activity", value: itemValue})}>
                        <Select.Item label="sedentary" value="sedentary" />
                        <Select.Item label="moderately active" value="moderatelyactive" />
                        <Select.Item label="very active" value="veryactive" />
                    </Select>
                </Flex>
                <Center>
                    <Button size="sm" w="100" mt="4" variant="outline" onPress={() => calculateWaterIntake() }> Calculate </Button>
                </Center>

                <Text mt="4" fontSize="16" color="orange.400">{response}</Text>
           </>
        }>
        </Card>
         </ScrollView>
    )
};

export default Reminder;