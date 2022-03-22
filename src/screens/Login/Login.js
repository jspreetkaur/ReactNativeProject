/*
Login screen
*/

import React, { Component, Fragment } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import styles from './LoginStyle';
import { Input, Button } from '../../components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Constants from '../../Constants';
import { Actions } from 'react-native-router-flux';
import { checkUserAuth } from '../../database/allSchemas'
import { saveToAsyncStorage } from '../../Utilis';


class Login extends Component {
  // Constructor
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
    };
  }

  // Actions
  loginButtonClicked() {
    if (this.state.userName.trim().length == 0) {
      alert(Constants.ERROR_INVALID_USER_NAME);
    } else if (this.state.password.trim().length == 0) {
      alert(Constants.ERROR_PASSWORD);
    } else {
      let userName = this.state.userName.trim()
      let password = this.state.password.trim()
      // create instance of user
      const user = {
        userName: userName,
        password: password
      }
      // check login auth here
      checkUserAuth(user).then((fetchUser) => {
        if (fetchUser) {
          // save login session in local storage
          saveToAsyncStorage(Constants.USER_NAME, fetchUser.userName).then(() => { })
          saveToAsyncStorage(Constants.IS_LOGIN, JSON.stringify(true)).then(() => { })
          Actions.tab()
        } else {
          alert(Constants.ERROR_LOGIN)
        }
      }).catch((error) => {
        alert(Constants.ERROR_LOG)
      })
    }
  }

  // Render UI objects
  render() {
    return (
      <>
        <StatusBar barStyle="light-content" />
        <SafeAreaView style={styles.safeTop} />
        <SafeAreaView style={styles.mainView}>
          <KeyboardAwareScrollView
            bounces={false}
            style={{ backgroundColor: 'transparent' }}>
            <View style={styles.mainContainer}>
              <View style={styles.topContainer}>
                <Text style={styles.title}>Sign In</Text>
                <Text style={styles.accountTitle}>Login to your account</Text>
              </View>
              <View style={styles.bottomContainer}>
                <View style={styles.bottomColor} />
                <View style={styles.bottomView}>
                  <Input
                    placeHolderText={'User name'}
                    value={this.state.userName}
                    onChangeText={text => this.setState({ userName: text })}
                  />
                  <Input
                    placeHolderText={'Password'}
                    isSecureEntry={true}
                    onChangeText={text => this.setState({ password: text })}
                  />
                  <Button
                    title={'SIGN IN'}
                    onPress={() => {
                      this.loginButtonClicked();
                    }}
                  />
                </View>
              </View>
              <View style={styles.signupContainer}>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('Signup');
                  }}>
                  <Text style={styles.signupText}>
                    <Text style={styles.signupStyle}>
                      Don't have an account?
                    </Text>
                    <Text style={styles.signup}> Sign up </Text>
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAwareScrollView>
        </SafeAreaView>
      </>
    );
  }
}

export default Login;
