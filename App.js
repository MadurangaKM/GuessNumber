import { useState } from "react";
import { StyleSheet, View } from "react-native";
import Header from "./layouts/Header";
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import FlashMessage from "react-native-flash-message";
import GameOverScreen from "./screens/GameOverScreen";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { showMessage } from "react-native-flash-message";
import { Provider } from "react-redux";
import Store from "./store/Main";
import DarkLightModeChanger from "./screens/DarkLightModeChanger";

const fetchFonts = () => {
  return Font.loadAsync({
    "poppins-bold": require("./assets/fonts/Poppins-Bold.otf"),
    "poppins-light": require("./assets/fonts/Poppins-Light.otf"),
    "poppins-medium": require("./assets/fonts/Poppins-Medium.otf"),
    "poppins-semiBold": require("./assets/fonts/Poppins-SemiBold.otf"),
    "poppins-thin": require("./assets/fonts/Poppins-Thin.otf"),
    "poppins-regular": require("./assets/fonts/Poppins-Regular.otf"),
  });
};
export default function App() {
  const [enteredValue, setEnteredValue] = useState();
  const [playRounded, setPlayRounded] = useState();
  const [isGameOver, setIsGameOver] = useState(false);
  const [winningGuess, setWinningGuess] = useState();
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  if (!isDataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setIsDataLoaded(true)}
        onError={(error) => {
          showMessage({
            message: error,
            type: "danger",
          });
        }}
      />
    );
  }

  const handleSubmit = (number) => {
    setEnteredValue(number);
  };
  const gameOverHandler = (count, winingGuess) => {
    setPlayRounded(count);
    setIsGameOver(true);
    setWinningGuess(winingGuess);
  };
  const newGameHandler = () => {
    setIsGameOver(false);
    setEnteredValue();
    setPlayRounded(0);
    setWinningGuess();
  };
  return (
    <Provider store={Store}>
      <View style={styles.screen}>
        <Header title={"Guess A Number"} />
        <DarkLightModeChanger />
        {enteredValue ? (
          isGameOver ? (
            <GameOverScreen
              playRounded={playRounded}
              winningGuess={winningGuess}
              newGameHandler={newGameHandler}
            />
          ) : (
            <GameScreen
              userChoice={enteredValue}
              onGameOver={gameOverHandler}
            />
          )
        ) : (
          <StartGameScreen onSubmitClick={handleSubmit} />
        )}
        <FlashMessage position="top" statusBarHeight={50} icon={"auto"} />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
