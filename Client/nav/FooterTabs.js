import { View, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import Text from "@kaloraat/react-native-text";
import { FontAwesome5 } from "@expo/vector-icons";
import { Divider } from "react-native-elements";
import { useNavigation, useRoute } from "@react-navigation/native";

export const Tab = ({ text, name, handlePress, screenName, routeName }) => {
  const activeScreenColor = screenName === routeName && "orange";
  return (
    <TouchableOpacity onPress={handlePress}>
      <>
        <FontAwesome5
          name={name}
          size={25}
          style={{
            marginBottom: 3,
            alignSelf: "center",
          }}
          color={activeScreenColor}
        />
        <Text>{text}</Text>
      </>
    </TouchableOpacity>
  );
};
export default function FooterTabs() {
  const navigation = useNavigation();
  const route = useRoute();

  console.log("Route => ", route);
  const handlePress = () => {
    alert("pressed");
  };
  return (
    <>
      <Divider width={1} />
      <View style={styles.tabsContainer}>
        <Tab
          text={"Home"}
          name={"home"}
          handlePress={() => navigation.navigate("Home")}
          screenName="Home"
          routeName={route.name}
        />
        <Tab
          text={"Post"}
          name={"plus-square"}
          handlePress={() => navigation.navigate("Post")}
          screenName="Post"
          routeName={route.name}
        />
        <Tab
          text={"Links"}
          name={"list-ol"}
          handlePress={() => navigation.navigate("Links")}
          screenName="Links"
          routeName={route.name}
        />
        <Tab
          text={"Account"}
          name={"user"}
          handlePress={() => navigation.navigate("Account")}
          screenName="Account"
          routeName={route.name}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  tabsContainer: {
    flexDirection: "row",
    marginHorizontal: 30,
    margin: 10,
    justifyContent: "space-between",
  },
});
