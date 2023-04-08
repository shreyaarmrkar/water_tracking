import * as React from "react";
import { Box, Heading, VStack, FormControl, Input, Button, Center } from "native-base";
import {Image} from "react-native"
const SignupForm = () => {
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
                    <Input />
                </FormControl>
                <FormControl>
                    <FormControl.Label>Password</FormControl.Label>
                    <Input type="password" />
                </FormControl>
                <FormControl>
                    <FormControl.Label>Confirm Password</FormControl.Label>
                    <Input type="password" />
                </FormControl>
                <Button mt="2" colorScheme="indigo">
                    Sign up
                </Button>
            </VStack>
        </Box>
    </Center>;
};

export default SignupForm;