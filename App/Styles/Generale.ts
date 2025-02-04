import { StyleSheet, TextStyle, Platform } from "react-native";

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

const button = StyleSheet.create({
  primary: {
    backgroundColor: '#ecbf2f',
    padding: 10,
    borderRadius: 10,
    borderWidth: 4,
    borderColor: '#ece9df',
    ...(Platform.OS === 'web'
      ? { boxShadow: '0px 2px 3.84px rgba(4, 0, 2, 0.25)' }
      : {
        shadowColor: '#040002',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }
    ),
  },
  primaryText: {
    color: '#040002',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

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
    ...(Platform.OS === 'web'
      ? { textShadow: '1px 1px 8px black' }
      : {
        textShadowColor: 'black',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 8,
      }
    ),
  },
  h2: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
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
  button,
};