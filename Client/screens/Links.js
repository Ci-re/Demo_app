import { View, Text, StyleSheet, StatusBar } from "react-native";
import React from "react";
import FooterTabs from "../nav/FooterTabs";

export default function Links() {
  return (
    <View style={styles.container}>
      <Text>Links</Text>
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <FooterTabs />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingTop: StatusBar.currentHeight + 20,
  },
});
