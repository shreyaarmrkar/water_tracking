
import * as React from "react";
import { Text, Box, Heading, Spinner } from "native-base";
import { AccordionList } from 'react-native-accordion-list-view';
import WebView from "react-native-webview"
import {
    SafeAreaView,
    Image
} from 'react-native';
import {useExerciseHook} from "./hooks"
import { Video, ResizeMode } from 'expo-av';
const Exercise = () => {
    const {resp} = useExerciseHook()
    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});
    const Items = ({data}) => (
        <Box>
            <Heading size="sm" color="gray.400" my="3" >{data.title}</Heading>
            <Text color="gray.500" my="1">{data.text}</Text>
            
        </Box>
    )
    return <SafeAreaView>
       { resp ? <AccordionList
            data={resp}
            customIcon={() => <></> }
            customTitle={item => 
                <Image 
                source={{uri: `${item.url}`}}  
                style={{ width: "100%", height: 170, resizeMode: 'stretch'}} 
            />
            }
            customBody={item => <Items data={item}/> }
            animationDuration={400}
            expandMultiple={true}
        />: <Spinner accessibilityLabel="Loading posts" />}
    </SafeAreaView>
};

export default Exercise;