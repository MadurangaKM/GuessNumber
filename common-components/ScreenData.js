import { useState, useEffect } from "react";
import { Dimensions } from "react-native";
const window = Dimensions.get("window");
const screen = Dimensions.get("screen");
const ScreenData = () => {
  const [screenData, setScreenData] = useState({ screen, window });
  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", ({ screen }) => {
      setScreenData({ screen, window });
    });
    return () => subscription?.remove();
  }, [screen, window]);
  return {
    ...screenData,
    isLandscape: screenData.screen.width > screenData.screen.height,
  };
};
export default ScreenData;
