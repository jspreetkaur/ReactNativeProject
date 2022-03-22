/*
Slpash screen
*/

import React, { Component } from 'react';
import { Images } from '../../theme';
import { ScreenBG } from '../../components';
import { View, Text } from 'react-native';
import styles from './SplashStyle';
import { Actions } from 'react-native-router-flux';
import { getAsyncStorage } from '../../Utilis';
import * as Constants from '../../Constants';

class Splash extends Component {

  // Life cycle
  componentDidMount() {
    setTimeout(() => {
      getAsyncStorage(Constants.IS_LOGIN).then(isLogin => {
        if (isLogin !== null && isLogin) {
          // if already login
          Actions.tab()
        } else {
          Actions.Login();
        }
      })
    }, 2000);
  }

  // rendering UI objects
  render() {
    return (
      <View style={styles.splashScreen}>
        <ScreenBG image={Images.splash} />
        <Text style={styles.splashLogo}>EF</Text>
        <Text style={styles.splashTitle}>EasyFind</Text>
      </View>
    );
  }
}

export default Splash;
