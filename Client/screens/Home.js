import { View, StyleSheet, StatusBar, SafeAreaView } from "react-native";
import React, { useContext } from "react";
import Text from "@kaloraat/react-native-text";
import { AuthContext } from "../context/auth";
import FooterTabs from "../nav/FooterTabs";

export default function Home() {
  const [state, setState] = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <Text>{JSON.stringify(state, null, 4)}</Text>
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
