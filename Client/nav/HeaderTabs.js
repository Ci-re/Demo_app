import { View, TouchableOpacity, SafeAreaView, StatusBar } from "react-native";
import Text from "@kaloraat/react-native-text";
import React, { useContext } from "react";
import { AuthContext } from "../context/auth";
import { FontAwesome5 } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HeaderTabs() {
  const [state, setState] = useContext(AuthContext);

  const signout = async () => {
    setState({ token: "", user: null });
    await AsyncStorage.removeItem("@auth");
  };
  return (
    <SafeAreaView>
      <TouchableOpacity onPress={signout}>
        <FontAwesome5 name="sign-out-alt" size={24} color="#ff9900" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
