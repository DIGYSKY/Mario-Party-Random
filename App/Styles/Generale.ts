import { StyleSheet, TextStyle } from "react-native";

interface TextStyles {
  textHeight: TextStyle;
  textLow: TextStyle;
  h1: TextStyle;
  h2: TextStyle;
  h3: TextStyle;
  h4: TextStyle;
  h5: TextStyle;
  h6: TextStyle;
  center: TextStyle;
}

const container = StyleSheet.create({
  flex: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
});

const text: TextStyles = {
  textHeight: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  textLow: {
    fontSize: 16,
    fontWeight: 'normal',
    color: 'white',
  },
  h1: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 8,
  },
  h2: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  h3: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  h4: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  h5: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  h6: {
    fontSize: 10,
  },
  center: {
    textAlign: 'center',
  },
};

export const Generale = {
  container,
  text,
};