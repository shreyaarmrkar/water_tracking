import * as React from "react";
import { Box, Heading, VStack, FormControl,Text, Input, Button, Center } from "native-base";
import {Image} from "react-native";
import {useSignUpHooks} from "./hooks";

const SignupForm = ({navigation}) => {
    const {submitSignUp, fillFormData, state} =  useSignUpHooks(navigation)
    return <Center w="100%">
        <Box safeArea p="2" w="90%" maxW="290" py="8">
            <Heading size="2xl" fontWeight="600" color="coolGray.800" _dark={{
                color: "warmGray.50"
            }}>
                <Image
                    style={{ width: 50, height: 50 }}
                    source={require("../../../assets/splash.png")} alt="Alternate Text" />
                Welcome
            </Heading>
            <Heading mt="1" color="coolGray.600" _dark={{
                color: "warmGray.200"
            }} fontWeight="medium" size="xs">
                Sign up to continue!
            </Heading>
            <VStack space={3} mt="5">
                <FormControl>
                    <FormControl.Label>Email</FormControl.Label>
                    <Input onChangeText={text => fillFormData({key: "email", value: text})} />
                </FormControl>
                <FormControl>
                    <FormControl.Label>Password</FormControl.Label>
                    <Input type="password" onChangeText={text => fillFormData({key: "password", value: text})} />
                </FormControl>
                <Text>{state}</Text>
                <Button mt="2" colorScheme="indigo" onPress={submitSignUp}>
                    Sign up
                </Button>
            </VStack>
        </Box>
    </Center>;
};

export default SignupForm;