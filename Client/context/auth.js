import { View, Text } from "react-native";
import React, { useState, useEffect, createContext } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API } from "../config";
import { useNavigation } from "@react-navigation/native";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [state, setState] = useState({
    user: null,
    token: "",
  });

  //navigation

  const navigation = useNavigation();
  //configure axios
  const token = state && state.token ? state.token : "";
  axios.defaults.baseURL = API;
  axios.defaults.headers.common[`Authorization`] = `Bearer ${token}`;

  // Handle expired token
  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      let res = error.response;
      if (res.status === 401 && res.config && !res.config._isRetryRequest) {
        //
        await AsyncStorage.removeItem("@auth");
        setState({ user: null, token: "" });
        navigation.navigate("signin");
      }
    }
  );
  useEffect(() => {
    const loadFromAsyncStorage = async () => {
      let data = await AsyncStorage.getItem("@auth");
      const as = JSON.parse(data);
      setState({ ...state, user: as.user, token: as.token });
    };
    loadFromAsyncStorage();
  }, []);

  return (
    <AuthContext.Provider value={[state, setState]}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
