
import React, { useEffect } from "react";
import { AccordionList } from 'react-native-accordion-list-view';
import {
    SafeAreaView,
    UIManager,
    View,
} from 'react-native';
import {
    VStack, Box, Divider, Text
} from 'native-base';
import Card from "../../components/Cards";
import WebView from "react-native-webview"

const Remedies = () => {
    const data = [
        {
            id: 0,
            title: 'How to get rid of cough at home',
            body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        },
    ];

    useEffect(() => {
        if (Platform.OS === 'android') {
            if (UIManager.setLayoutAnimationEnabledExperimental) {
                UIManager.setLayoutAnimationEnabledExperimental(true);
            }
        }
    }, []);

    const Item = () => (
        <View>
            <Text>
            Home remedies for dry cough/ Treatment for dry cough includes:
            1. Honey
            Honey has antibacterial and wound healing properties. It can also help to coat the throat, which reduces irritation, pain and inflammation.
            2. Salt water gargle
            Gargling with warm salt water is one of the simplest and most effective home remedies.
            The salt here pulls out the mucus from your swollen and inflamed tissue. 
            Salt water gargling helps to relieve the discomfort and scratchy throat.

            3.Humidifier:
            Turn on the cool mist humidifier to increase the moisture in your room.
            Steam from a warm shower looses the mucus and can moisturize and soothe your sore throat. You can also take a steam from hot water in any container. 

            4. Ginger:
            Ginger is very beneficial for dry cough. It can suppress the cough reflex by relaxing the smooth muscles of the airways. 
            It also has antibacterial and anti-inflammatory properties which relieve pain and discomfort.
            </Text>
            <WebView 
            originWhitelist={['*']}
             source={{
                uri: 'https://www.youtube.com/embed/KBCtrjhnLF4',
              }}
              style={{height:300, width:"100%"}}
            />
        </View>
    )
    return (<SafeAreaView>
        <Card
            subHeading="remedies module provide some
            natural remedies to the most basic health problems that can be treated
            without the use of any medicines. below list are some of the natural remedies"
            ItemContent={() => <AccordionList
                data={data}
                customTitle={item => <Text fontWeight="700" fontSize="16">{item.title}</Text>}
                customBody={item => <Item />}
                animationDuration={400}
                expandMultiple={true}
            />}

        />
    </SafeAreaView>)
};

export default Remedies;