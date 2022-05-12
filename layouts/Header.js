import React from "react";
import { StyleSheet, Text, Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "../constants/Color";
import { GlobalStyle } from "../constants/GlobleStyle";

const Header = (props) => {
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={[
        Colors.primaryGradientColorOne,
        Colors.primaryGradientColorTwo,
        Colors.primaryGradientColorTwo,
      ]}
      style={styles.header}
    >
      <Text style={{ ...styles.title, ...GlobalStyle.Heading }}>
        {props.title}
      </Text>
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: Platform.OS === "ios" ? 100 : 80,
    paddingTop: Platform.OS === "ios" ? 30 : 0,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: Colors.drakNormalTextColor,
  },
});
export default Header;
