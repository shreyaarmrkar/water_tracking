import React from 'react';
import { Box, Text, Heading, VStack, FormControl,Spinner, Input, Link, Button,Icon, HStack, Center, Pressable } from "native-base";
import {useFormHooks} from "./hooks";
import { MaterialIcons } from "@expo/vector-icons";
import {Image} from "react-native"

const LoginForm = ({navigation}) => {
  const { setFieldsInput, formData,status,showSpin, setShowPassword,showPassword, submitLogin } = useFormHooks(navigation);
  return (
    <Center flex={1} px="3" w="100%">
      <Box safeArea p="2" py="8" w="90%" maxW="290">
     
        <Heading size="2xl" fontWeight="600" color="coolGray.800" _dark={{
          color: "warmGray.50"
        }}>
           <Image 
      style={{ width: 50, height: 50 }}
      source={require("../../../assets/splash.png")} alt="Alternate Text" />
          Welcome
        </Heading>
        <Heading mt="1" _dark={{
          color: "warmGray.200"
        }} color="coolGray.600" fontWeight="medium" size="xs">
          Sign in to continue!
        </Heading>

        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label>Email ID</FormControl.Label>
            <Input onChangeText={text => setFieldsInput({key: "email", value: text})}/>
          </FormControl>
          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input 
            onChangeText={text => setFieldsInput({key: "password", value: text})} 
             type={showPassword ? "text" : "password"} InputRightElement={<Pressable onPress={() => setShowPassword(!showPassword)}>
                      <Icon as={<MaterialIcons name={showPassword ? "visibility" : "visibility-off"} />} size={5} mr="2" color="muted.400" />
                    </Pressable>} placeholder="Password" />
            <Link _text={{
              fontSize: "xs",
              fontWeight: "500",
              color: "indigo.500"
            }} alignSelf="flex-end" mt="1">
              Forget Password?
            </Link>
          </FormControl>
          <HStack mt="6" justifyContent="center">
            <Text fontSize="sm" color="coolGray.600" _dark={{
              color: "warmGray.200"
            }}>
              I'm a new user.{" "}
            </Text>
            <Link
            onPress={() => navigation.navigate('signup')}
            _text={{
              color: "indigo.500",
              fontWeight: "medium",
              fontSize: "sm"
            }}>
              Sign Up
            </Link>
          </HStack>
        </VStack>
        {showSpin && <Spinner accessibilityLabel="Loading" />}
        <Text>{status}</Text>
        <Button mt="2" colorScheme="indigo"  isDisabled={showSpin} onPress={submitLogin}>
            Sign in
          </Button>
      </Box>
    </Center>
  );
};

export default LoginForm;