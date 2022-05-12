import { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
  Platform,
} from "react-native";
import TextInputField from "../common-components/TextInput";
import PrimaryButton from "../common-components/PrimaryButton";
import SecondaryButton from "../common-components/SecondaryButton";
import Card from "../common-components/Card";
import Colors from "../constants/Color";
import { useFormik } from "formik";
import * as Yup from "yup";
import { GlobalStyle } from "../constants/GlobleStyle";

const StartGameScreen = (props) => {
  const [submitPress, setSubmitPress] = useState(false);
  const [enteredValue, setEnteredValue] = useState("");
  const formik = useFormik({
    initialValues: {
      guessNumber: "",
    },

    validationSchema: Yup.object({
      guessNumber: Yup.number()
        .max(100, "Maximum value is 100")
        .required("Number is requried")
        .positive("Must be positive number"),
    }),

    onSubmit: (values) => {
      setSubmitPress(true);
      setEnteredValue(values.guessNumber);
      formik.handleReset();
      Keyboard.dismiss();
    },
  });
  const handleInputChange = (input) => {
    let event = {
      target: {
        name: "guessNumber",
        value: input,
      },
    };
    formik.handleChange(event);
  };
  const handleReset = () => {
    formik.handleReset();
    setSubmitPress(false);
    Keyboard.dismiss();
  };
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.screen}>
        <Card style={styles.card}>
          <TextInputField
            id="guessNumber"
            name="guessNumber"
            placeHolder="Type Your Number"
            keyboardType="number-pad"
            value={formik.values.guessNumber}
            onChangeText={handleInputChange}
            error={Boolean(formik.errors.guessNumber)}
            errorMessage={formik.errors.guessNumber}
          />
          <View style={styles.buttonContainer}>
            <SecondaryButton title="Reset" onPress={handleReset} />
            <PrimaryButton title="Submit" onPress={formik.handleSubmit} />
          </View>
        </Card>
        {submitPress && (
          <Card style={styles.cardEnterted}>
            <Text style={GlobalStyle.BodyOne}>Your Entered</Text>
            <Text style={{ ...styles.numberStyle, ...GlobalStyle.Display }}>
              {enteredValue}
            </Text>
            <PrimaryButton
              title="Start Game"
              onPress={() => props.onSubmitClick(enteredValue)}
            />
          </Card>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    padding: 30,
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.backgroundColor,
  },
  buttonContainer: {
    justifyContent: "flex-end",
    flexDirection: "row",
    marginTop: 4,
  },
  card: {
    padding: 20,
  },
  cardEnterted: {
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  numberStyle: {
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
export default StartGameScreen;
