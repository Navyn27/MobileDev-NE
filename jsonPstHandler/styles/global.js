import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  titleText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  paragraph: {
    marginVertical: 8,
    lineHeight: 20,
  },
  container: {
    flex: 1,
    paddingTop: 40,
    paddingLeft: 25,
    paddingRight: 25,
  },
  button: {
    backgroundColor: "grey",
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    borderRadius: 10,
  },
  bigTitle: {
    fontWeight: "bold",
    fontSize: 25,
  },
});
