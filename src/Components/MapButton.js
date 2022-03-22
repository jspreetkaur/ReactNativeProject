/*
This class for Map Button
*/

import React from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Images} from '../theme/'

const MapButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={[styles.buttonStyle]} onPress={onPress}>
      <Image source={Images.directions} style={styles.directionImage}></Image>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  directionImage: {
    alignSelf: 'center'
  }
});

export { MapButton };