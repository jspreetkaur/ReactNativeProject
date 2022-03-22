/*
This class for setting image as background image of screen
*/

import React from 'react';
import {StyleSheet, ImageBackground } from 'react-native';

const ScreenBG = props => {
  const { screenBgStyle } = styles;
  return (
    <ImageBackground style={screenBgStyle} source={props.image}>
    </ImageBackground>
  )
};

const styles = StyleSheet.create({
  screenBgStyle: {       
      position:'absolute',
      width:'100%',
      height:'100%'
    }
});

export {ScreenBG};