import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NativeBaseProvider, } from "native-base";
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from "./navigation"
import { SafeAreaProvider } from 'react-native-safe-area-context';
import linking from "./navigation/LinkingConfiguration"
export default function App() {
  return (
    <SafeAreaProvider>
    <NativeBaseProvider>
      <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
        <RootNavigator />
      </NavigationContainer>
    </NativeBaseProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
