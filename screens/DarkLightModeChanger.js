import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Switch,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Colors from "../constants/Color";
import { GlobalStyle } from "../constants/GlobleStyle";
import Card from "../common-components/Card";
import { useSelector, useDispatch } from "react-redux";
import ScreenData from "../common-components/ScreenData";

const DarkLightModeChanger = (props) => {
  const mode = useSelector((state) => state.DarkLightModeChangerData.darkMode);
  const screenData = ScreenData();
  const dispatch = useDispatch();
  const handleModeChange = () => {
    dispatch({
      type: "CHANGE_DARK_MODE",
      payload: !mode,
    });
  };
  const styles = StyleSheet.create({
    screen: {
      padding: 30,
      paddingHorizontal: screenData.isLandscape ? 60 : 30,
      paddingBottom: 0,
      alignItems: "center",
      backgroundColor: mode
        ? Colors.backgroundColorDark
        : Colors.backgroundColor,
    },
    card: {
      padding: 15,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      height: 60,
    },
  });
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.screen}>
        <Card style={styles.card}>
          <Text
            style={{
              ...GlobalStyle.BodyOne,
              color: mode ? Colors.drakNormalTextColor : Colors.normalTextColor,
            }}
          >
            App Theme Mode:{" "}
            <Text
              style={{
                ...GlobalStyle.BodyOneBold,
                color: mode ? Colors.darkTitleTextColor : Colors.titleTextColor,
              }}
            >
              {mode ? " DARK" : " LIGHT"}
            </Text>
          </Text>
          <Switch
            value={mode}
            onValueChange={handleModeChange}
            thumbColor={
              mode
                ? mode
                  ? Colors.primaryDark
                  : Colors.primary
                : Colors.drakNormalTextColor
            }
            ios_backgroundColor={Colors.drakNormalTextColor}
            trackColor={{ false: Colors.borderColor, true: Colors.primary }}
          />
        </Card>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default DarkLightModeChanger;
