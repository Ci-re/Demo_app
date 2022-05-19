import { View, StyleSheet, TextInput } from "react-native";
import React, { useState } from "react";
import Text from "@kaloraat/react-native-text";

export default function UserInput({
  name,
  value,
  setValue,
  autoCapitalize = "none",
  autoCorrect = false,
  keyboardType = "default",
  secureTextEntry = false,
}) {
  return (
    <View style={styles.input_comp}>
      <Text semi>{name}</Text>
      <TextInput
        style={styles.textInputStyle}
        onChangeText={(text) => setValue(text)}
        value={value}
        autoCapitalize={autoCapitalize}
        autoCorrect={autoCorrect}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input_comp: {
    marginHorizontal: 24,
  },
  textInputStyle: {
    borderBottomWidth: 0.5,
    height: 48,
    borderBottomColor: "#8e9381",
    marginBottom: 30,
  },
});
