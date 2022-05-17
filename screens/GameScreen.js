import { useState, useRef, useEffect } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import Colors from "../constants/Color";
import PrimaryButton from "../common-components/PrimaryButton";
import Card from "../common-components/Card";
import { showMessage } from "react-native-flash-message";
import { GlobalStyle } from "../constants/GlobleStyle";
import { useSelector } from "react-redux";
import ScreenData from "../common-components/ScreenData";
import VirtualizedView from "../common-components/VirtualizedView";

const GameScreen = (props) => {
  const [playRounded, setPlayRounded] = useState(0);
  const [previousGuesses, setPreviousGuess] = useState([]);
  const screenData = ScreenData();
  const mode = useSelector((state) => state.DarkLightModeChangerData.darkMode);

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
    setCurrentGuess(nextNumber);
    setPlayRounded(playRounded + 1);
    if (previousGuesses.length === 0) {
      setPreviousGuess([
        { playRounded: playRounded + 1, previousGuessIs: currentGuess },
      ]);
    } else {
      previousGuesses.push({
        playRounded: playRounded + 1,
        previousGuessIs: currentGuess,
      });
    }
  };

  useEffect(() => {
    if (currentGuess == props.userChoice) {
      props.onGameOver(playRounded, currentGuess);
    }
  }, [currentGuess]);
  const styles = StyleSheet.create({
    screen: {
      padding: 30,
      paddingTop: 0,
      paddingHorizontal:screenData.isLandscape?60:30,
      flex: 1,
      // alignItems: "center",
      backgroundColor: mode
        ? Colors.backgroundColorDark
        : Colors.backgroundColor,
    },
    cardEnterted: {
      paddingVertical:15,
      justifyContent: "center",
      alignItems: "center",

    },
    numberStyle: {
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 5,
      color: mode ? Colors.primaryDark : Colors.primary,
      borderWidth: 1,
      borderColor: mode ? Colors.primaryDark : Colors.primary,
      borderRadius: 10,
      paddingHorizontal: 8,
      marginTop: 10,
      marginBottom: 15,
      paddingTop: Platform.OS === "android" ? 15 : 0,
    },
    previousGuess: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      height: 48,
      justifyContent: "space-evenly",
    },
  });
  console.log("Check Screen Orientation Game Screen",screenData.isLandscape)
  return (
    <VirtualizedView style={styles.screen}>
      <Card style={styles.cardEnterted}>
        <Text
          style={{
            ...GlobalStyle.BodyOne,
            color: mode ? Colors.drakNormalTextColor : Colors.titleTextColor,
          }}
        >
          Our Guess
        </Text>
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
            // style={{ margin: 4,}}
            onPress={nextGuessHandler.bind(this, "lower")}
            isIcon={true}
            iconName="remove-circle-outline"
          />
          <PrimaryButton
            title="Greater"
            style={{ marginLeft: 10}}
            onPress={nextGuessHandler.bind(this, "greater")}
            isIcon={true}
            iconName="add-circle-outline"
          />
        </View>
      </Card>
      <FlatList
        data={previousGuesses.sort((a, b) => {
          return b.playRounded - a.playRounded;
        })}
        showsVerticalScrollIndicator={false}
        renderItem={(itemData) => (
          <Card style={styles.previousGuess}>
            <Text
              style={{
                ...GlobalStyle.BodyOne,
                color: mode
                  ? Colors.drakNormalTextColor
                  : Colors.titleTextColor,
              }}
            >
              Play Round:{" "}
              <Text
                style={{
                  ...GlobalStyle.BodyOneBold,
                  color: mode ? Colors.primaryDark : Colors.primary,
                }}
              >
                {" "}
                {itemData.item.playRounded}
              </Text>
            </Text>
            <Text
              style={{
                ...GlobalStyle.BodyOne,
                color: mode
                  ? Colors.drakNormalTextColor
                  : Colors.titleTextColor,
              }}
            >
              Guess:{" "}
              <Text
                style={{
                  ...GlobalStyle.BodyOneBold,
                  color: mode ? Colors.primaryDark : Colors.primary,
                }}
              >
                {" "}
                {itemData.item.previousGuessIs}
              </Text>
            </Text>
          </Card>
        )}
        keyExtractor={(item, index) => index}
      />
    </VirtualizedView>
  );
};
export default GameScreen;
