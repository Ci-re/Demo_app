import Signup from "../screens/Signup";
import Signin from "../screens/Signin";
import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import { AuthContext } from "../context/auth";
import HeaderTabs from "./HeaderTabs";
import Account from "../screens/Account";
import Post from "../screens/Post";
import Links from "../screens/Links";
export default function ScreensNav() {
  const [state, setState] = useContext(AuthContext);

  const authenticated = state && state.token !== "" && state.user.user !== null;
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="Signin"
      //   screenOptions={{ headerShown: false }}
    >
      {authenticated ? (
        <>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              title: "Cirec",
              headerRight: () => <HeaderTabs />,
            }}
          />
          <Stack.Screen
            name="Account"
            component={Account}
            options={{
              headerStyle: {
                backgroundColor: "white",
                alignItems: "center",
              },
              headerBackTitleVisible: true,
              headerBackTitle: "Back",
            }}
          />
          <Stack.Screen
            name="Post"
            component={Post}
            options={{
              headerStyle: {
                backgroundColor: "white",
                alignItems: "center",
              },
              headerBackTitleVisible: true,
              headerBackTitle: "Back",
            }}
          />
          <Stack.Screen
            name="Links"
            component={Links}
            options={{
              headerStyle: {
                backgroundColor: "white",
                alignItems: "center",
              },
              headerBackTitleVisible: true,
              headerBackTitle: "Back",
            }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Signin"
            component={Signin}
            options={{
              headerShown: false,
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
