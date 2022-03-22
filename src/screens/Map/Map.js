/*
Map screen
*/

import React, { Component } from 'react'
import {
  View,
  Platform,
  StatusBar
} from 'react-native'
import styles from './MapStyle'
import { Actions } from 'react-native-router-flux';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { BackButton } from '../../components';
import Geolocation from '@react-native-community/geolocation';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { APIStore } from '../../api'

const Polyline = require('@mapbox/polyline');
const DEFAULT_PADDING = { top: 40, right: 40, bottom: 40, left: 40 };

class Map extends Component {

  constructor(props) {
    super(props);
    this.item = this.props.navigation.state.params.item;
  }

  // State
  state = {
    latitude: 0.0,
    longitude: 0.0,
    coord: []
  }

  componentDidMount() {
    this.requestPermission()
  }

  // requesting location permission
  requestPermission() {
    request(
      Platform.select({
        android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      })
    ).then(res => {
      if (res == RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          position => {
            this.setState({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            })
            this.fetchDirections()
          }
        )
      }
    })
  }

  fetchDirections() {
    let origin = `${this.state.latitude},${this.state.longitude}`
    let destination = `${this.item.coordinates.latitude},${this.item.coordinates.longitude}`
    let Google_Direction_API_Key = 'AIzaSyCGNZIaTG3Lj3gj5I6OrIvf9NZMQbz2oeU'
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&mode=driving&key=${Google_Direction_API_Key}`
    APIStore.get(url).then(response => {
      let result = response.data
      let array = Polyline.decode(result.routes[0].overview_polyline.points);
      //your base64 string is now an array of lat/lng objects
      let coordinates = array.map((point) => {
        return {
          latitude: point[0],
          longitude: point[1]
        }
      })
      this.setState({ coord: coordinates })
    }).catch(error => { });
  }

  backButtonClicked() {
    Actions.pop()
  }

  // Render UI objects 
  render() {
    return (
      <>
        <StatusBar barStyle='dark-content' />
        <View style={styles.mainConatiner}>
          <BackButton topMargin={'5%'} onPress={() => { this.backButtonClicked() }} />
          <MapView
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={styles.map}
            showsUserLocation={true}
            region={{
              latitude: this.state.latitude,
              longitude: this.state.longitude,
              latitudeDelta: 0.014,
              longitudeDelta: 0.0121,
            }}
          >
            <MapView.Marker
              coordinate={{
                latitude: this.item.coordinates.latitude,
                longitude: this.item.coordinates.longitude
              }}
              title={this.item.name}
            />

            <MapView.Polyline
              coordinates={this.state.coord}
              strokeWidth={4}
              strokeColor="red" />
          </MapView>
        </View>
      </>
    )
  }
}

export default Map;