import React from "react";
import { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "../views/Home";
import Profile from "../views/Profile";
import Single from "../views/Single";
import Login from "../views/Login";
import Upload from "../views/Upload";
import { MainContext } from "../contexts/MainContext";
import { Icon } from "react-native-elements";
import ModifyUser from "../views/ModifyUser";
import MyFiles from "../views/MyFiles";
import Modify from "../views/Modify";

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

const TabScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          switch (route.name) {
            case "Home":
              iconName = "home";
              break;
            case "Upload":
              iconName = "cloud-upload";
              break;
            case "Profile":
              iconName = "account-box";
              break;
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Upload" component={Upload} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

const StackScreen = () => {
  const { isLoggedIn } = useContext(MainContext);
  return (
    <Stack.Navigator>
      {isLoggedIn ? (
        <>
          <Stack.Screen
            name="Tabs"
            component={TabScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Single" component={Single} />
          <Stack.Screen
            name="Modify user"
            component={ModifyUser}
          ></Stack.Screen>
          <Stack.Screen name="My Files" component={MyFiles}></Stack.Screen>
          <Stack.Screen name="Modify" component={Modify}></Stack.Screen>
        </>
      ) : (
        <Stack.Screen name="MyApp" component={Login} />
      )}
    </Stack.Navigator>
  );
};

const Navigator = () => {
  return (
    <NavigationContainer>
      <StackScreen />
    </NavigationContainer>
  );
};

export default Navigator;
