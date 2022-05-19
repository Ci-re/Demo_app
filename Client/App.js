import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RootNavigation from "./navigation";

export default function App() {
  const Stack = createNativeStackNavigator();
  return <RootNavigation />;
}
