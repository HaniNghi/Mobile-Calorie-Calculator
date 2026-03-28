import { View, Text, Image, StyleSheet } from "react-native";
import Constants from "expo-constants";
import { Dimensions } from "react-native";

const StatusBarHeight = Constants.statusBarHeight;
const { width } = Dimensions.get("window"); //get width of window

//colors

export const Colors = {
  primary: "#ffffff",
  secondary: "#E5E7EB",
  tertiary: "#1F2937",
  darkLight: "#9CA3AF",
  black: "#000000",
  green: "#10B981",
  red: "#EF4444",
  orange: "#FF7A00",
  primaryBlue: "#2F80ED",
  secondaryBlue: "#56A0F5",
  darkBlue: "#1C5DB6",
};

const { primary, secondary, tertiary, darkLight, black, green, red, orange, primaryBlue, secondaryBlue, darkBlue } =
  Colors;

export const styles = StyleSheet.create({
  styledContainer: {
    flex: 1,
    padding: 25,
    paddingTop: StatusBarHeight + 10,
    backgroundColor: primary,
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
    fontSize: 30,
    textAlign: "center",
    fontWeight: "bold",
    color: black,
    paddingTop: 5,
    paddingBottom: 1,
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
    backgroundColor: "white",
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flexDirection: "column",

    shadowColor: "#000",
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
    color: "black",
    fontSize: 16,
    fontWeight: "700",
  },

  leftIcon: {
    width: 40,
    height: 40,
    marginRight: 12,
  },

  cardDescription: {
    fontSize: 13,
    color: "#666",
    marginTop: 2,
  },

  getStartedButton: {
    width: 200,
    backgroundColor: "#FF7A00",
    borderRadius: 12,
    height: 52,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    shadowColor: "#FF7A00",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },

  getStartedText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "600",
  },
});
