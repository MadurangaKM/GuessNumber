import { StyleSheet, View, Text, Image } from "react-native";
import Colors from "../constants/Color";
import PrimaryButton from "../common-components/PrimaryButton";
import { GlobalStyle } from "../constants/GlobleStyle";
import { useSelector } from "react-redux";
const GameOverScreen = (props) => {
  const mode = useSelector((state) => state.DarkLightModeChangerData.darkMode);
  const styles = StyleSheet.create({
    screen: {
      padding: 30,
      paddingTop: 0,
      flex: 1,
      alignItems: "center",
      backgroundColor: mode
        ? Colors.backgroundColorDark
        : Colors.backgroundColor,
    },
    image: {
      marginTop: "20%",
      width: "80%",
      height: 200,
    },
  });
  return (
    <View style={styles.screen}>
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
  );
};
export default GameOverScreen;
