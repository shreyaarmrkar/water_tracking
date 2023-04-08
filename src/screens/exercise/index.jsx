
import * as React from "react";
import { Text, Box, Heading, FlatList } from "native-base";
import { AccordionList } from 'react-native-accordion-list-view';
import WebView from "react-native-webview"
import {
    SafeAreaView,
} from 'react-native';
const Exercise = () => {
    let data = [{
        title: "hello",
        body: "hello world"
    }]
    let content = [
        {key:1,step: "Start by standing with your feet shoulder-width apart and arms down at your sides."},{
            key:2,
        step: "Take a step forward with your right leg and bend your right knee as you do so, stopping when your thigh is parallel to the ground. Ensure that your right knee doesn’t extend past your right foot."},
        {key:3,step: "Push up off your right foot and return to the starting position. Repeat with your left leg. This is one rep."},
        {key:4,step: "Complete 3 sets of 10 reps."}
    ]
    const Items = () => (
        <Box>
            <Heading size="sm" color="gray.400" my="3" >Lunges Excercise</Heading>
            <FlatList data={content} renderItem={({
                item
                }) => <Text color="gray.500" my="1"> {item.key}. {item.step}</Text>} />
        </Box>
    )
    return <SafeAreaView>
        <AccordionList
            data={data}
            customIcon={() => <></> }
            customTitle={item =>  <WebView 
                originWhitelist={['*']}
                 source={{
                    uri: 'https://gfycat.com/ifr/RequiredThinAbalone',
                  }}
                  style={{height:200, width:"100%"}}
                />}
            customBody={item => <Items /> }
            animationDuration={400}
            expandMultiple={true}
        />
    </SafeAreaView>
};

export default Exercise;