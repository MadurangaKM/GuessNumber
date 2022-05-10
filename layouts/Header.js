import React from "react";
import { StyleSheet, View, Text,Platform } from "react-native";
import {LinearGradient} from 'expo-linear-gradient';

const Header = (props) => {
  return (
    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#4e54c8', '#8f94fb', '#8f94fb']} style={styles.header}>
      <Text style={styles.title}>
        {props.title}
      </Text>
      </LinearGradient>
  );
};
const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: Platform.OS==="ios"?100:80,
    paddingTop: Platform.OS==="ios"?30:0,
    backgroundColor: "red",
    justifyContent:"center",
    alignItems:"center"
  },
  title: {
      color:"#ffff",
      fontSize:20,
  },
});
export default Header;
