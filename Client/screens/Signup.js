import { View, StyleSheet, ScrollView, Image } from "react-native";
import React, { useState, useContext } from "react";
import Text from "@kaloraat/react-native-text";
import UserInput from "../component/UserInput";
import SubmitButton from "../component/SubmitButton";
import axios from "axios";
import CircleLogo from "../component/CircleLogo";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { API } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../context/auth";

export default function Signup({ navigation }) {
  const [name, setName] = useState("Cire");
  const [email, setEmail] = useState("cirecleen@gmail.com");
  const [password, setPassword] = useState("123445");
  const [loading, setLoading] = useState(false);
  const [state, setState] = useContext(AuthContext);

  // console.log("Navigation ->", navigation);

  const handleSubmit = async () => {
    setLoading(true);
    if (!name || !email || !password) {
      alert("All fields are required");
      setLoading(false);
      return;
    }
    try {
      const { data } = await axios.post(`/signup`, {
        name,
        email,
        password,
      });
      if (data.error) {
        alert(data.error);
        setLoading(false);
      } else {
        setState(data);
        console.log("sign up success => ", data);
        alert("Sign up successful");
        setLoading(false);
        navigation.navigate("Home");
      }
    } catch (err) {
      console.log(err);
      alert(err);
      setLoading(false);
    }
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <View style={{ marginVertical: 100 }}>
        <CircleLogo />
        <Text title center>
          Sign up
        </Text>
        <UserInput
          name="Name"
          value={name}
          setValue={setName}
          autoCapitalize="words"
          autoCorrect={false}
        />
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
          title="Submit"
          handleSubmit={handleSubmit}
          loading={loading}
        />

        <Text medium center>
          Have an account?{" "}
          <Text
            color="orange"
            onPress={() => {
              navigation.navigate("Signin");
            }}
          >
            Sign in
          </Text>
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
