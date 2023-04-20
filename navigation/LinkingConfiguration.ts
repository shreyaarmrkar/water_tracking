/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

const linking = {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      login: 'login',
      signup:'signup',
      root: {
        screens: {
          home: {
            screens: {
              TabOneScreen: 'home',
              TabTwoScreen: 'SleepLog',
              TabThreeScreen: 'Exercise'
            },
          },
        },
      },
      NotFound: '*',
    },
  },
};

export default linking;
