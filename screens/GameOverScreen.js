import { StyleSheet, View, Text, Image, ScrollView } from "react-native";
import Colors from "../constants/Color";
import PrimaryButton from "../common-components/PrimaryButton";
import { GlobalStyle } from "../constants/GlobleStyle";
import { useSelector } from "react-redux";
import ScreenData from "../common-components/ScreenData";

const GameOverScreen = (props) => {
  const mode = useSelector((state) => state.DarkLightModeChangerData.darkMode);
  const screenData = ScreenData();
  const styles = StyleSheet.create({
    screen: {
      padding: 30,
      paddingTop: 0,
      flex: 1,
      backgroundColor: mode
        ? Colors.backgroundColorDark
        : Colors.backgroundColor,
    },
    image: {
      marginTop: screenData.isLandscape
        ? screenData.screen.height / 10
        : screenData.screen.height / 20,
      width: "80%",
      height: screenData.isLandscape
        ? screenData.screen.height / 2
        : screenData.screen.height / 4,
    },
  });
  return (
    <ScrollView style={styles.screen}>
      <View style={{ alignItems: "center", marginBottom: 30 }}>
        <Image
          source={require("../assets/GAME_OVER.png")}
          resizeMode="contain"
          style={styles.image}
        />
        <Text
          style={{
            ...GlobalStyle.Heading,
            marginTop: 10,
            color: mode ? Colors.darkTitleTextColor : Colors.titleTextColor,
          }}
        >
          Winning Guess: {props.winningGuess}
        </Text>
        <Text
          style={{
            ...GlobalStyle.BodyOne,
            color: mode ? Colors.drakNormalTextColor : Colors.titleTextColor,
          }}
        >
          Play Rounded: {props.playRounded}
        </Text>
        <PrimaryButton
          title={"New Game"}
          style={{ marginTop: 20 }}
          onPress={props.newGameHandler}
        />
      </View>
    </ScrollView>
  );
};
export default GameOverScreen;
