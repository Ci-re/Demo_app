import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import React, { useState, useContext, useEffect } from "react";
import Text from "@kaloraat/react-native-text";
import UserInput from "../component/UserInput";
import SubmitButton from "../component/SubmitButton";
import axios from "axios";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CircleLogo from "../component/CircleLogo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../context/auth";
import { FontAwesome5 } from "@expo/vector-icons";

export default function Account({ navigation }) {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [image, setImage] = useState({
    url: "",
    public_id: "",
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadImage, setUploadImage] = useState("");
  // context
  const [state, setState] = useContext(AuthContext);

  useEffect(() => {
    if (state) {
      const { name, email, image, role } = state.user;
      setName(name);
      setEmail(email);
      setRole(role);
      setImage(image);
    }
  }, []);

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
      console.log(data.error);
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

  const handleUpload = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    console.log(permissionResult);
    if (permissionResult.granted === false) {
      alert("Camera access is required");
      return;
    }
    //get image from the user

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
    });
    if (pickerResult.cancelled === true) {
      return;
    }

    // Save image data for preview
    let base64Image = `data:image/jpg;base64,${pickerResult.base64}`;
    setUploadImage(base64Image);

    // sent to backend for uploading to cloudinary
    const data = await axios.post("/upload-image", { image: base64Image });
    console.log(`Uploaded Response => ${data}`);
  };
  const loadFromAsyncStorage = async () => {
    let data = await AsyncStorage.getItem("@auth");
    console.log("From async storage =>", data);
  };

  loadFromAsyncStorage();
  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <View style={{ marginVertical: 100 }}>
        <CircleLogo>
          {image && image.url ? (
            <View style={styles.imageContainer}>
              <Image source={{ uri: uploadImage }} style={styles.imageStyle} />
            </View>
          ) : uploadImage ? (
            <View style={styles.imageContainer}>
              <Image source={{ uri: uploadImage }} style={styles.imageStyle} />
            </View>
          ) : (
            <View style={styles.imageContainer}>
              <TouchableOpacity onPress={handleUpload}>
                <FontAwesome5 name="camera" size={25} color={"orange"} />
              </TouchableOpacity>
            </View>
          )}
        </CircleLogo>

        {image && image.url ? (
          <TouchableOpacity onPress={() => handleUpload()}>
            <FontAwesome5
              name={"camera"}
              size={25}
              color={"orange"}
              style={{ marginTop: -5, marginBottom: 10, alignSelf: "center" }}
            ></FontAwesome5>
          </TouchableOpacity>
        ) : uploadImage ? (
          <TouchableOpacity onPress={() => handleUpload()}>
            <FontAwesome5
              name={"camera"}
              size={25}
              color={"orange"}
              style={{ marginTop: -5, marginBottom: 10, alignSelf: "center" }}
            ></FontAwesome5>
          </TouchableOpacity>
        ) : (
          <></>
        )}
        <Text title center>
          {name}
        </Text>
        <Text medium center style={{ paddingBottom: 10 }}>
          {email}
        </Text>
        <Text small center light style={{ paddingBottom: 10 }}>
          {role}
        </Text>

        <UserInput
          name="Password"
          value={password}
          setValue={setPassword}
          secureTextEntry={true}
          autoCompleteType="password"
        />
        <SubmitButton
          title="Update Password"
          handleSubmit={handleSubmit}
          loading={loading}
        />
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
  imageContainer: {
    height: 170,
    width: 170,
    paddingTop: 10,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },
  imageStyle: {
    height: 170,
    width: 170,
    borderRadius: 100,
  },
});
