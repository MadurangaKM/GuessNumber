import React from "react";
import { View } from "react-native";
import ScreenData from "./ScreenData";
import { useSelector } from "react-redux";
import Colors from "../constants/Color";
export default function PaddingView(props) {
  const screenData = ScreenData();
  const mode = useSelector((state) => state.DarkLightModeChangerData.darkMode);
  return (
    <View
      style={{
        paddingHorizontal: screenData.isLandscape ? 30 : 0,
        flex: 1,
        backgroundColor: mode
          ? Colors.backgroundColorDark
          : Colors.backgroundColor,
      }}
    >
      {props.children}
    </View>
  );
}
