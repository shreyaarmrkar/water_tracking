import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginForm from "../src/screens/loginForm";
import SignupForm from "../src/screens/signUpForm";
import { MaterialIcons } from "@expo/vector-icons";
import Home from "../src/screens/homeScreen";
import SleepLoggerScreen from "../src/screens/sleepLoggerScreen";
import Remedies from "../src/screens/remedies";
import Exercise from "../src/screens/exercise";
import Reminder from "../src/screens/reminder";

const Stack = createNativeStackNavigator();

export default RootNavigator = () => {
    return (
        <Stack.Navigator initialRouteName={"login"}>
            <Stack.Screen name="login" component={LoginForm} />
            <Stack.Screen name="signup" component={SignupForm} />
            <Stack.Screen
              name="root" component={BottomTabNavigator}
              options={{ headerShown: false }}
            />
      </Stack.Navigator>
     
    );
  }
  const BottomTab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <BottomTab.Navigator
      initialRouteName="home"
    >
      <BottomTab.Screen
        name="home"
        component={Home}
        options={({ navigation }) => ({
          title: "Stay Lealthy",
          tabBarIcon: ({ color }) => <TabBarIcon name="home" />,
        })}
      />
      <BottomTab.Screen
        name="SleepLog"
        component={SleepLoggerScreen}
        options={({ navigation }) => ({
          title: "Sleep Log",
          tabBarIcon: ({ color }) => <TabBarIcon name="bedtime" />,
        })}
      />
      <BottomTab.Screen
        name="Exercise"
        component={Exercise}
        options={({ navigation }) => ({
          title: "Exercise",
          tabBarIcon: ({ color }) => <TabBarIcon name="self-improvement" />,
        })}
      />
      <BottomTab.Screen
        name="Remedies"
        component={Remedies}
        options={({ navigation }) => ({
          title: "Remedies",
          tabBarIcon: ({ color }) => <TabBarIcon name="ramen-dining" />,
        })}
      />
      <BottomTab.Screen
        name="Reminder"
        component={Reminder}
        options={{
          title: "Reminder",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="lock-clock" />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props) {
  return <MaterialIcons size={30} style={{ marginBottom: -3 }} {...props} />;
}