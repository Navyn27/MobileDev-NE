import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  titleText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#00417D",
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
    backgroundColor: "#00417D",
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    borderRadius: 10,
    flexDirection: "row",
  },
  bigTitle: {
    fontWeight: "bold",
    fontSize: 25,
    color: "#00417D",
  },
});
