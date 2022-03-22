/*
SignUp screen
*/

import React, { Component, Fragment } from 'react'
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image
} from 'react-native'
import styles from './SignupStyle'
import { Input, Button } from '../../components'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { password_regex, user_name_regex, name_regex } from '../../Utilis'
import * as Constants from '../../Constants'
import { Images } from '../../theme'
import { Actions } from 'react-native-router-flux'
import { saveUser, isUserExist } from '../../database/allSchemas'
import { saveToAsyncStorage } from '../../Utilis';

class Signup extends Component {

  // Constructor
  constructor(props) {
    super(props)
    this.state = {
      userName: '',
      fullName: '',
      password: '',
      confirmPassword: ''
    }
  }

  // Actions
  signupButtonClicked() {
    if (!user_name_regex.test(this.state.userName)) {
      alert(Constants.ERROR_INVALID_USER_NAME)
    } else if (!name_regex.test(this.state.fullName)) {
      alert(Constants.ERROR_INVALID_NAME)
    }
    // else if (!password_regex.test(this.state.password)) {
    //   alert(Constants.VALID_PASSWORD)
    // } 
    else if (this.state.password != this.state.confirmPassword) {
      alert(Constants.VALID_MISMATCH_PASSWORD)
    } else {
      let userName = this.state.userName.trim()
      let password = this.state.password.trim()
      // check user name is already taken or not
      isUserExist(userName).then((user) => {
        if (user !== null) {
          alert(Constants.ERROR_USERNAME)
          return
        } else {
          // create instance of user
          const user = {
            id: Math.floor(Date.now() / 1000),
            userName: userName,
            fullName: this.state.fullName,
            password: password
          }
          // save user details in the database
          saveUser(user).then(() => {
            // save login session in local storage
            saveToAsyncStorage(Constants.USER_NAME, userName).then(() => { })
            saveToAsyncStorage(Constants.IS_LOGIN, JSON.stringify(true)).then(() => { })
            Actions.tab()
          }).catch((error) => {
            alert(`Insert user error ${error}`)
          })
        }
      }).catch(() => {
        alert(Constants.ERROR_LOG)
      })
    }
  }

  backButtonClicked() {
    Actions.pop()
  }

  // Render UI objects
  render() {
    return (
      <>
        <StatusBar barStyle="light-content" />
        <SafeAreaView style={styles.safeTop}></SafeAreaView>
        <SafeAreaView style={styles.mainView}>
          <KeyboardAwareScrollView bounces={false}>
            <View style={styles.mainContainer}>
              <View style={styles.topContainer}>
                <View style={styles.navContainer}>
                  <TouchableOpacity style={styles.backButton} onPress={() => { this.backButtonClicked() }}>
                    <Image source={Images.back} />
                  </TouchableOpacity>
                  <Text style={styles.title}>Sign Up</Text>
                </View>
                <Text style={styles.accountTitle}>Create your account</Text>
              </View>
              <View style={styles.bottomContainer}>
                <View style={styles.bottomColor}></View>
                <View style={styles.bottomView}>
                  <Input
                    placeHolderText={'User name'}
                    value={this.state.userName}
                    onChangeText={(text) => this.setState({ userName: text })}
                  />
                  <Input
                    placeHolderText={'Full name'}
                    value={this.state.fullName}
                    onChangeText={(text) => this.setState({ fullName: text })}
                  />
                  <Input
                    placeHolderText={'Password'}
                    value={this.state.password}
                    isSecureEntry={true}
                    onChangeText={(text) => this.setState({ password: text })}
                  />
                  <Input
                    placeHolderText={'Confirm Password'}
                    value={this.state.confirmPassword}
                    isSecureEntry={true}
                    onChangeText={(text) => this.setState({ confirmPassword: text })}
                  />
                  <Button
                    title={'SIGN UP'}
                    onPress={() => { this.signupButtonClicked() }}
                  />
                </View>
              </View>
            </View>
          </KeyboardAwareScrollView>
        </SafeAreaView>
      </>
    )
  }
}

export default Signup;