import { StyleSheet, Text, TouchableOpacity, Platform } from "react-native";
import Colors from "../constants/Color";
import { GlobalStyle } from "../constants/GlobleStyle";
import { useSelector } from "react-redux";
const Button = (props) => {
  const mode = useSelector((state) => state.DarkLightModeChangerData.darkMode);
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.button}>
      <Text
        style={{
          color: mode ? Colors.primaryDark : Colors.primary,
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
    height: 34,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
});

export default Button;
