import { TextInput, StyleSheet, View, Text } from "react-native";
import Colors from "../constants/Color";
import { GlobalStyle } from "../constants/GlobleStyle";
import { useSelector } from "react-redux";
const TextInputField = (props) => {
  const mode = useSelector((state) => state.DarkLightModeChangerData.darkMode);
  const styles = StyleSheet.create({
    textInput: {
      borderColor: props.error ? Colors.errorColor : Colors.borderColor,
      borderWidth: 1,
      padding: 3,
      paddingLeft: 10,
      height: 34,
      marginRight: 6,
      borderRadius: 10,
      width: "100%",
    },
  });
  return (
    <View>
      <TextInput
        placeholder={props.placeHolder}
        style={{ ...styles.textInput, ...GlobalStyle.BodyOne }}
        onChangeText={props.onChangeText}
        value={props.value}
        onSubmitEditing={props.onSubmitEditing}
        {...props}
        placeholderTextColor={
          mode ? Colors.drakNormalTextColor : Colors.normalTextColor
        }
        color={mode ? Colors.drakNormalTextColor : Colors.normalTextColor}
      />
      <Text
        style={{
          marginTop: props.error ? 5 : 0,
          color: Colors.errorColor,
          ...GlobalStyle.BodyTwo,
        }}
      >
        {props.errorMessage}
      </Text>
    </View>
  );
};

export default TextInputField;
