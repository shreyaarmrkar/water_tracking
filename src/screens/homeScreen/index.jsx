import * as React from "react";
import { Text, Box, Input, Center, Flex, Image, Spinner, Icon, ScrollView,Pressable } from "native-base";
import { useMainHook } from "./hooks";
import { ImageBackground } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import bg from '../../../assets/bg.jpg';
import Card from "../../components/Cards";

const Home = () => {
    const { res, weekday, setCity, callList } = useMainHook()
    return <ScrollView><ImageBackground source={bg} style={{
        flex: 1,
        alignSelf: 'stretch',
        width: null,
    }}>
        <Box p="4">
            <Box background="gray.50" pt="-1" mb="2" padding="0"> <Input mt="-6" mx="0" placeholder="Input" w="100%" onChangeText={(value) => setCity(value)}
                InputRightElement={<Pressable onPress={() => callList()}>
                    <Icon as={<MaterialIcons name="search" />} size={5} mr="2" color="muted.400" />
                </Pressable>} /></Box>
            {res ?
                <Center>
                    <Text my="2" fontSize="lg" fontWeight="bold" color="darkBlue.500">{res?.location?.name} {res?.location?.country}</Text>
                    <Text mb="1" fontSize="md" fontWeight="bold" color="blue.400">{new Date(res?.location?.localtime).toDateString()} {new Date(res?.location?.localtime).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}</Text>
                    <Image source={{
                        uri: `https://${res?.current?.condition?.icon}`
                    }} alt="Alternate Text" size="md" />
                    <Text fontSize="24" fontWeight="bold" color="darkBlue.500">{res.current.temp_c}˚C</Text>
                    <Text fontSize="16" fontWeight="bold" color="white">{res.current.condition?.text}</Text>
                    <Card
                        my="2"
                        ItemContent={() => (<Flex direction="row" wrap="wrap" justify="space-between">
                            <Text fontSize="14" w="30%" fontWeight="bold" style={{ textAlign: "center" }}>Feels</Text>
                            <Text fontSize="14" w="30%" fontWeight="bold" style={{ textAlign: "center" }}>Wind</Text>
                            <Text fontSize="14" w="30%" fontWeight="bold" style={{ textAlign: "center" }}>Humidity</Text>
                            <Text fontSize="14" w="30%" fontWeight="bold" style={{ textAlign: "center" }}>{res.current.feelslike_c}˚C</Text>
                            <Text fontSize="14" w="30%" fontWeight="bold" style={{ textAlign: "center" }}>{res.current.windchill_c} mph</Text>
                            <Text fontSize="14" w="30%" fontWeight="bold" style={{ textAlign: "center" }}>{res.current.humidity}</Text>
                            <Text mt="4"></Text>
                            <Text fontSize="14" w="30%" fontWeight="bold" style={{ textAlign: "center" }}>Rain</Text>
                            <Text fontSize="14" w="30%" fontWeight="bold" style={{ textAlign: "center" }}>Uv</Text>
                            <Text fontSize="14" w="30%" fontWeight="bold" style={{ textAlign: "center" }}>Cloud</Text>
                            <Text fontSize="14" w="30%" fontWeight="bold" style={{ textAlign: "center" }}>{res.current.precip_mm} mm</Text>
                            <Text fontSize="14" w="30%" fontWeight="bold" style={{ textAlign: "center" }}>{res.current.uv}</Text>
                            <Text fontSize="14" w="30%" fontWeight="bold" style={{ textAlign: "center" }}>{res.current.cloud}</Text>
                        </Flex>)}

                    />
                    {res.forecast.forecastday.map((data, ind) => (
                        <Card
                            my="1"
                            key={`tstt-${ind}`}
                            ItemContent={() => (
                                <Flex mt="-4" direction="row" justify="space-between">
                                    <Text fontSize="12" w="20%" fontWeight="bold" style={{ textAlign: "center" }}>{weekday[new Date(data.date).getUTCDay()]}</Text>
                                    <Box w="60%" flexDirection="row"><Image source={{
                                        uri: `https://${data.day.condition.icon}`
                                    }} size="xs" mt="-3" alt="h" /><Text fontSize="12">{data.day.condition.text}</Text></Box>
                                    <Box w="20%">
                                        <Text fontSize="12">{data.day.maxtemp_c}˚C</Text>
                                    </Box>
                                </Flex>)}
                        />
                    ))}
                </Center> :
                <Spinner accessibilityLabel="Loading posts" />}

        </Box>
    </ImageBackground>
    </ScrollView>
};

export default Home;