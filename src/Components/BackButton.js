/*
This class for Back Button
*/

import React from 'react';
import { StyleSheet, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { Images, Colors } from '../theme/'

const BackButton = ({ topMargin, onPress }) => {
  return (
    <TouchableOpacity style={[styles.buttonStyle, { top: topMargin }]} onPress={onPress}>
      <Image source={Images.back} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    position: 'absolute',
    zIndex: 1,
    alignItems: 'center',
    alignSelf: "flex-start",
    justifyContent: 'center',
    marginHorizontal: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.theme_color,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.44,
    shadowRadius: 2,
    elevation: 2,
  }
});

export { BackButton };