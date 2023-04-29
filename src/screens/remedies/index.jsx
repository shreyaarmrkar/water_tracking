
import React, { useEffect } from "react";
import { AccordionList } from 'react-native-accordion-list-view';
import {
    SafeAreaView,
    UIManager,
    View,
} from 'react-native';
import {
    VStack, Box, Divider, Text, Spinner
} from 'native-base';
import Card from "../../components/Cards";
import WebView from "react-native-webview"
import {useRemediesHook} from "./hooks";
const Remedies = () => {
    const {resp} = useRemediesHook()
    useEffect(() => {
        if (Platform.OS === 'android') {
            if (UIManager.setLayoutAnimationEnabledExperimental) {
                UIManager.setLayoutAnimationEnabledExperimental(true);
            }
        }
    }, []);

    const Item = ({data}) => (
        <View>
            <Text>{data.body}</Text>
            <WebView 
            originWhitelist={['*']}
             source={{
                uri: data.link,
              }}
              style={{height:300, width:"100%"}}
            />
        </View>
    )
    return (<SafeAreaView>
        {resp ? <Card
            subHeading="remedies module provide some
            natural remedies to the most basic health problems that can be treated
            without the use of any medicines. below list are some of the natural remedies"
            ItemContent={() => <AccordionList
                data={resp}
                customTitle={item => <Text fontWeight="700" fontSize="14">{item.title}</Text>}
                customBody={item => <Item data={item} />}
                animationDuration={400}
                expandMultiple={true}
            />}

        />:  <Spinner accessibilityLabel="Loading posts" />}
    </SafeAreaView>)
};

export default Remedies;