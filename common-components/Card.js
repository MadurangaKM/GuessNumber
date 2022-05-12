import { View, StyleSheet } from "react-native";
import Colors from "../constants/Color";
const Card = (props) => {
  return (
    <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
  );
};
const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surfaceColor,
    height: "auto",
    width: "100%",
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: Colors.shadowColor,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
});

export default Card;
