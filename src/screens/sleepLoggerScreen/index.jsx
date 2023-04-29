import * as React from "react";
import { Select, Box, CheckIcon, Center, Text, FormControl, WarningOutlineIcon, Button } from "native-base";
import Card from "../../components/Cards";
import { useSleepLogHook } from "./hooks"
import { ImageBackground } from "react-native";
import bg from '../../../assets/bg.jpg';
const SleepLoggerScreen = () => {
    const { mode,time, setSleepMode, response, dropoDwnOption, calculate, getDetails, showError, showDatepicker } = useSleepLogHook()

    const getComponent = () => {
        switch (mode) {
            case "wakeUp":
            case "sleepAt":
                return showDatepicker()
            case "sleepNeeded":
                return getDetails()
        }
    }

    return <ImageBackground source={bg} style={{
        flex: 1,
        alignSelf: 'stretch',
        width: null,
    }}><Card
        ItemContent={() =>
            <Box flex={1} w={[72, 85]}>
                <FormControl w="full" maxW="300" isRequired isInvalid={showError}>
                    <FormControl.Label>Choose service</FormControl.Label>
                    <Select minWidth="200" selectedValue={mode} accessibilityLabel="Choose Service" placeholder="Choose Service" _selectedItem={{
                        bg: "teal.600",
                        endIcon: <CheckIcon size={5} />
                    }} mt="1" onValueChange={itemValue => setSleepMode(itemValue)}>
                        {dropoDwnOption.map(a => (
                            <Select.Item label={a.label} value={a.value} key={a.value} />
                        ))}
                    </Select>
                    {showError && <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                        Please make a selection!
                    </FormControl.ErrorMessage>}
                </FormControl>
                <Box>
                    {getComponent()}
                    {mode && <Button size="sm" mt="3.5" w="100%" onPress={() =>
                         calculate()}>
                        Calculate
                    </Button>}
                </Box>
                {response && <Center mt="4"><Text fontSize="md"><Text fontWeight="700">{response}</Text></Text></Center>}
            </Box>
        }
    />
    </ImageBackground>
};

export default SleepLoggerScreen;