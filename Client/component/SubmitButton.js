import { View, TouchableOpacity, StyleSheet } from "react-native";
import Text from "@kaloraat/react-native-text";
import React from "react";

export default function SubmitButton({ title, handleSubmit, loading }) {
  return (
    <TouchableOpacity
      style={styles.button_style}
      onPress={handleSubmit}
      loading={loading}
    >
      <Text bold medium center>
        {loading === true ? "Please wait..." : title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button_style: {
    backgroundColor: "orange",
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    marginHorizontal: 15,
    borderRadius: 24,
  },
});
