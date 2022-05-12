import { StyleSheet, View, Text, Image } from "react-native";
import Colors from "../constants/Color";
import PrimaryButton from "../common-components/PrimaryButton";
import { GlobalStyle } from "../constants/GlobleStyle";

const GameOverScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Image
        source={require("../assets/GAME_OVER.png")}
        resizeMode="contain"
        style={styles.image}
      />
      <Text style={{ ...GlobalStyle.Heading, marginTop: 10 }}>
        Winning Guess: {props.winningGuess}
      </Text>
      <Text style={GlobalStyle.BodyOne}>Play Rounded: {props.playRounded}</Text>
      <PrimaryButton
        title={"New Game"}
        style={{ marginTop: 20 }}
        onPress={props.newGameHandler}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    padding: 30,
    paddingTop: 0,
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.backgroundColor,
    justifyContent: "center",
  },
  image: {
    width: "80%",
    height: 200,
  },
});
export default GameOverScreen;
