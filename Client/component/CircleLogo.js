import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";

export default function CircleLogo({ children }) {
  return (
    <View style={styles.ImageContainer}>
      {children ? children : <Image source={require("../assets/citi.png")} />}
    </View>
  );
}

const styles = StyleSheet.create({
  ImageContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});
