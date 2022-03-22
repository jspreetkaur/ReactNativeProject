/*
Settings screen
*/

import React, { Component, Fragment } from 'react'
import {
  View,
  Text,
  SafeAreaView,
  StatusBar
} from 'react-native'
import styles from './SettingsStyle'
import { Button } from '../../components'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { isUserExist } from '../../database/allSchemas'
import { getAsyncStorage, saveToAsyncStorage } from '../../Utilis';
import * as Constants from '../../Constants';
import { Actions } from 'react-native-router-flux'
import { onLogout } from '../../database/allSchemas'

class Settings extends Component {

  // Life cycle
  componentDidMount() {
    getAsyncStorage(Constants.USER_NAME).then(userName => {
      if (userName !== null) {
        isUserExist(userName).then((user) => {
          if (user !== null) {
            this.setState({ userName: user.userName, fullName: user.fullName })
          }
        }).catch(() => {
          alert(Constants.ERROR_LOG)
        })
      }
    })
  }

  // State
  state = {
    userName: '',
    fullName: ''
  }

  // Actions
  logoutButtonClicked() {
    // removing saved data for this user
    onLogout().then(() => { }).catch(() => { })
    // saving login status
    saveToAsyncStorage(Constants.IS_LOGIN, JSON.stringify(false)).then(() => { })
    Actions.Login()
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
                <Text style={styles.title}>Settings</Text>
                <Text style={styles.accountTitle}>Personal Info</Text>
              </View>
              <View style={styles.bottomContainer}>
                <View style={styles.bottomColor} />
                <View style={styles.bottomView}>
                  <Text style={styles.infoTitle}>User Name</Text>
                  <Text style={styles.infoStyle}>{this.state.userName}</Text>
                  <Text style={styles.infoTitle}>Full Name</Text>
                  <Text style={styles.infoStyle}>{this.state.fullName}</Text>
                  <Button
                    title={'Logout'}
                    onPress={() => {
                      this.logoutButtonClicked()
                    }}
                  />
                </View>
              </View>
            </View>
          </KeyboardAwareScrollView>
        </SafeAreaView>
      </>
    );
  }
}

export default Settings;