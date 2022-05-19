import { View, StyleSheet, ScrollView } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import Text from "@kaloraat/react-native-text";
import UserInput from "../component/UserInput";
import SubmitButton from "../component/SubmitButton";
import axios from "axios";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CircleLogo from "../component/CircleLogo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../context/auth";

export default function Signin({ navigation }) {
  const [email, setEmail] = useState("cirecleen@gmail.com");
  const [password, setPassword] = useState("123445");
  const [loading, setLoading] = useState(false);
  // context
  const [state, setState] = useContext(AuthContext);

  const handleSubmit = async () => {
    setLoading(true);
    if (!email || !password) {
      alert("All fields are required");
      setLoading(false);
      return;
    }
    try {
      const { data } = await axios.post(`/signin`, {
        email,
        password,
      });
      console.log(data);
      if (data.error) {
        alert(data.error);
        setLoading(false);
      }
      setState(data);
      await AsyncStorage.setItem("@auth", JSON.stringify(data));
      console.log("sign in success => ", data);
      alert("Sign in successful");
      setLoading(false);
      navigation.navigate("Home");
    } catch (error) {
      alert(error);
      console.log(error);
      setLoading(false);
    }
  };

  const loadFromAsyncStorage = async () => {
    let data = await AsyncStorage.getItem("@auth");
    console.log("From async storage =>", data);
  };

  loadFromAsyncStorage();
  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <View style={{ marginVertical: 100 }}>
        <CircleLogo />
        <Text title center>
          Sign in
        </Text>
        <UserInput
          name="Email"
          value={email}
          setValue={setEmail}
          keyboardType="email-address"
          autoCompleteType="email"
        />
        <UserInput
          name="Password"
          value={password}
          setValue={setPassword}
          secureTextEntry={true}
          autoCompleteType="password"
        />
        <SubmitButton
          title="Login"
          handleSubmit={handleSubmit}
          loading={loading}
        />
        <Text
          medium
          center
          onPress={() => {
            navigation.navigate("Signup");
          }}
        >
          Have an account?
          <Text color="red">Sign in</Text>
        </Text>
        <Text medium center color="orange">
          Forgot password?
        </Text>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  button_style: {
    backgroundColor: "orange",
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    marginHorizontal: 15,
    borderRadius: 24,
  },
});
