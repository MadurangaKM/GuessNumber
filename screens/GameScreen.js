import { useState, useRef, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import Colors from "../constants/Color";
import PrimaryButton from "../common-components/PrimaryButton";
import Card from "../common-components/Card";
import { showMessage } from "react-native-flash-message";
import { GlobalStyle } from "../constants/GlobleStyle";
const GameScreen = (props) => {
  const [playRounded, setPlayRounded] = useState(0);
  const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rumNum = Math.floor(Math.random() * (max - min)) + min;
    if (rumNum === exclude) {
      return generateRandomBetween(min, max, exclude);
    } else {
      return rumNum;
    }
  };
  const [currentGuess, setCurrentGuess] = useState(
    generateRandomBetween(1, 100, props.userChoice)
  );
  const currentHigh = useRef(100);
  const currentLow = useRef(1);

  const nextGuessHandler = (direction) => {
    if (
      (direction === "lower" && currentGuess < props.userChoice) ||
      (direction === "greater" && currentGuess > props.userChoice)
    ) {
      showMessage({
        message: "Don't lie. You know that is wrong...",
        type: "danger",
      });
      return;
    }
    if (direction === "lower") {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess;
    }
    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    console.log("Current min", currentLow.current);
    console.log("Current max", currentHigh.current);
    console.log("Current Guess", currentGuess);
    setCurrentGuess(nextNumber);
    setPlayRounded(playRounded + 1);
  };

  useEffect(() => {
    if (currentGuess == props.userChoice) {
      props.onGameOver(playRounded, currentGuess);
    }
  }, [currentGuess]);
  return (
    <View style={styles.screen}>
      <Card style={styles.cardEnterted}>
        <Text style={GlobalStyle.BodyOne}>Our Guess</Text>
        <Text style={{ ...styles.numberStyle, ...GlobalStyle.Display }}>
          {currentGuess}
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <PrimaryButton
            title="Lower"
            style={{ marginRight: 5 }}
            onPress={nextGuessHandler.bind(this, "lower")}
          />
          <PrimaryButton
            title="Greater"
            style={{ marginLeft: 5 }}
            onPress={nextGuessHandler.bind(this, "greater")}
          />
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    padding: 30,
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.backgroundColor,
  },
  cardEnterted: {
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  numberStyle: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
    color: Colors.primary,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 10,
    paddingHorizontal: 8,
    marginTop: 10,
    marginBottom: 15,
    paddingTop: Platform.OS === "android" ? 15 : 0,
  },
});
export default GameScreen;
