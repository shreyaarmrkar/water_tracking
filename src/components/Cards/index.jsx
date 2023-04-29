
import React from "react";
import { Box, Heading, AspectRatio, Image, Text, Center, HStack, Stack, NativeBaseProvider } from "native-base";
import {ImageBackground} from "react-native";

const Card = ({img=false, my=4,key="tes", Headings=false, subHeading=false, hStack=false, ItemContent}) => {
    return (
    <Box alignItems="center" mx="1" key={key}>
      <Box  my={my} rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
    }} _web={{
      shadow: 2,
      borderWidth: 0
    }} _light={{
      backgroundColor: "#e4f0f8"
    }}>
        {img && <Box>
          <AspectRatio w="100%" ratio={16 / 9}>
            <Image source={{
            uri: img
          }} alt="image" />
          </AspectRatio>
          <Center bg="violet.500" _dark={{
          bg: "violet.400"
        }} _text={{
          color: "warmGray.50",
          fontWeight: "700",
          fontSize: "xs"
        }} position="absolute" bottom="0" px="3" py="1.5">
            PHOTOS
          </Center>
        </Box>}
        <Stack p="4" space={3}>
          <Stack space={2}>
            {Headings && <Heading size="md" ml="1">
            {Headings}
            </Heading>}
           {subHeading && <Text fontSize="16"  _light={{
            color: "violet.500"
          }} _dark={{
            color: "violet.400"
          }} fontWeight="500" ml="-0.5"  >
              {subHeading}.
            </Text>}
          </Stack>
         <ItemContent />
         {hStack && <HStack alignItems="center" space={4} justifyContent="space-between">
            <HStack alignItems="center">
              <Text color="coolGray.600" _dark={{
              color: "warmGray.200"
            }} fontWeight="400">
                6 mins ago
              </Text>
            </HStack>
          </HStack>}
        </Stack>
      </Box>
    </Box>
    )
};

export default Card;