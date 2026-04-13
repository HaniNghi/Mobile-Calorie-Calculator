import { View, Text, Image, StyleSheet } from "react-native";
import Constants from "expo-constants";
import { Dimensions } from "react-native";

const StatusBarHeight = Constants.statusBarHeight;
const { width } = Dimensions.get("window"); //get width of window

//colors

export const Colors = {
  darkLight: "#9CA3AF",
  black: "#000000",
  grey: "#2e2d2d",
  white: "#FFFFFF",
  muted: "#eeeaea",
  primaryBlue: "#1E6BFF",
  brightBlue: "#2D8CFF",
  lightBlue: "#368ae3",
  blueGradient: "#00C6FF",
  green: "#22C55E",
  yellow: "#FACC15",
  red: "#EF4444",
};

export const { darkLight, black, grey, white, muted, primaryBlue, brightBlue, lightBlue, blueGradient, green, yellow, red} =
  Colors;

export const styles = StyleSheet.create({
  styledContainer: {
    flex: 1,
    padding: 25,
    paddingTop: StatusBarHeight + 10,
    backgroundColor: black,
  },

  innerContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },

  pageLogo: {
    width: width * 0.7,
    height: width * 0.7,
    resizeMode: "contain",
    marginTop: 1,
  },

  pageTitle: {
    fontFamily: "Inter",
    fontWeight: "500",
    fontSize: 45,
    textAlign: "center",
    fontWeight: "bold",
    color: white,
  },

  pageSubTitle: {
    fontFamily: "Inter",
    fontSize: 15,
    textAlign: "center",
    color: brightBlue,
    padding: 20,
  },

  background: {
    height: 70,
    width: "100%",
    justifyContent: "flex-end",
    marginBottom: 16,
  },
  image: {
    borderRadius: 20,
  },

  cardContainer: {
    backgroundColor: black,
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flexDirection: "column",

    shadowColor: brightBlue,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 4,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardTitle: {
    color: white,
    fontSize: 14,
    fontWeight: "700",
  },

  leftIcon: {
    width: 30,
    height: 30,
    marginRight: 12,
    borderRadius: 5,
  },

  cardDescription: {
    fontSize: 10,
    color: muted,
    marginTop: 2,
  },

  getStartedButton: {
    width: 200,
    backgroundColor: brightBlue,
    borderRadius: 12,
    height: 52,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    shadowColor: brightBlue,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },

  getStartedText: {
    color: white,
    fontSize: 17,
    fontWeight: "600",
  },
});
