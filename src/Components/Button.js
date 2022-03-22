/*
This class for Button
*/

import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Colors, Fonts } from '../theme/'
import LinearGradient from 'react-native-linear-gradient';

const Button = ({ onPress, title }) => {
  return (
    <TouchableOpacity style={[styles.buttonStyle]} onPress={onPress}>
      <LinearGradient
        colors={[Colors.theme_color, Colors.theme_dark_color]}
        style={styles.linearGradient}
      >
        <Text style={[styles.buttonText]}>{title}</Text>
      </LinearGradient>

    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    position: 'relative',
    height: 45,
    backgroundColor: Colors.theme_color,
    justifyContent: 'center',
    alignSelf: 'center',
    width: '90%',
    borderRadius: 21,
    top: 30
  },
  buttonText: {
    fontSize: 18,
    fontFamily: Fonts.font_bold,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  linearGradient: {
    flex: 1,
    borderRadius: 21
  }
});

export { Button };