import { StyleSheet, Text, TouchableOpacity, Platform } from "react-native";
import Colors from "../constants/Color";
import { GlobalStyle } from "../constants/GlobleStyle";

const Button = (props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{ ...styles.button, ...props.style }}
    >
      <Text
        style={{
          color: Colors.drakNormalTextColor,
          paddingTop: Platform.OS === "android" ? 3 : 0,
          ...GlobalStyle.ButtonText,
        }}
      >
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    height: 38,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
});

export default Button;
