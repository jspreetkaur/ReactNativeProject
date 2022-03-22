/*
This class for top gradient view
*/

import React from 'react';
import { View } from 'react-native';
import { Colors } from '../theme/'
import LinearGradient from 'react-native-linear-gradient';

const TopView = () => {
  return (
    <View style={{height: '100%'}}>
      <LinearGradient
        style={{ flex: 1 }}
        colors={[Colors.theme_color, Colors.theme_dark_color]}
      >
    </LinearGradient>
    </View>
  )
};

export { TopView };