/*
Search screen
*/

import React, { Component } from 'react'
import {
  View,
  SafeAreaView,
  ActivityIndicator,
  StatusBar,
  Platform
} from 'react-native'
import styles from './SearchStyle'
import { TitleView, RestaurantList } from '../../components'
import { SearchBar } from 'react-native-elements';
import { APIStore } from '../../api'
import { Colors } from '../../theme'
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';
import { isRestaurantExist } from '../../database/allSchemas'
import * as Constants from '../../Constants'
import { EventRegister } from 'react-native-event-listeners'

class Search extends Component {

  // constructor
  constructor(props) {
    super(props);
    this.offset = 0
    this.limit = 20
    this.navigate = this.props.navigation.navigate;
  }

  // State
  state = {
    loading: false, // list loading
    data: [],
    search: '',
    error: '',
    isPagesAvailable: false,
    latitude: 0.0,
    longitude: 0.0
  }

  // Life cycle
  componentDidMount = () => {
    this.requestPermission()
    this.listener = EventRegister.addEventListener(Constants.REFRESH_SEARCH, () => {
      this.setState({ data: [] })
      this.requestRestaurants()
    })
  }

  componentWillUnmount() {
    EventRegister.removeEventListener(this.listener)
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
        this.requestRestaurants()
      }
    })
  }

  // Request Restaurants acc to location
  requestRestaurants() {
    Geolocation.getCurrentPosition(
      position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        })
        this.offset = 0
        this.fetchList('', this.offset)
      }
    )
  }

  // Fetch restaurants
  fetchList = (location, offset) => {
    const isSearch = location.trim().length > 0
    // if we have lat, lng
    let params = {
      'latitude': this.state.latitude,
      'longitude': this.state.longitude,
      'offset': offset
    }
    // if we have search query
    let paramsSearch = {
      'location': location,
      'offset': this.offset
    }
    this.setState({ loading: true })
    APIStore.get('businesses/search', { params: isSearch ? paramsSearch : params })
      .then(response => {
        this.setDataToState(response.data)
      }).catch(error => {
        this.setState({ loading: false, error: error })
      });
  }

  // setting data to state
  setDataToState(data) {
    let listData = this.state.data;
    let items = data.businesses
    items.forEach(item => {
      isRestaurantExist(item.id).then((isExist) => {
        item['isFav'] = isExist
      })
    })
    let allData = listData.concat(items) //concate list with response
    this.setState({ loading: false, data: allData })
    this.setState({ isPagesAvailable: data.total > this.state.data.length })
  }

  // For search
  updateSearch = (text) => {
    this.setState({ search: text });
  };

  searchButtonClicked = () => {
    this.fetchItems()
  }

  onClearButtonClicked = () => {
    this.setState({ search: '' })
    setTimeout(() => {
      this.fetchItems()
    }, 500);
  }

  fetchItems = () => {
    this.offset = 0
    this.setState({ data: [] })
    this.fetchList(this.state.search, this.offset)
  }

  // For pagination
  renderFooter = () => {
    //it will show indicator at the bottom of the list when data is loading otherwise it returns null
    if (!this.state.loading) return null;
    return (
      <ActivityIndicator
        style={{ color: Colors.theme_color }}
      />
    );
  };

  handleLoadMore = () => {
    if (!this.state.loading && this.state.isPagesAvailable) {
      this.offset += this.limit; // increase page
      this.fetchList(this.state.search, this.offset) // method for API call 
    }
  };

  // Render UI objects 
  render() {
    return (
      <>
        <StatusBar barStyle='dark-content' />
        <SafeAreaView></SafeAreaView>
        <View style={styles.mainConatiner}>
          <TitleView title={'Search'}></TitleView>
          <SearchBar
            keyboardType="default"
            returnKeyType="done"
            autoCorrect={false}
            containerStyle={styles.searchBarContainer}
            inputContainerStyle={styles.inputContainerStyle}
            placeholder={'Search'}
            onChangeText={this.updateSearch}
            value={this.state.search}
            onSubmitEditing={this.searchButtonClicked}
            onClear={this.onClearButtonClicked}
          />
          <View style={styles.listContainer}>
            <RestaurantList
              // passing type
              type={Constants.SEARCH_LIST}
              // passing items
              data={this.state.data}
              // did select row
              didSelectRow={(item) => {
                this.navigate('Detail', {
                  item: item
                });
              }}
              // Footer
              listFooter={
                this.renderFooter
              }
              // On end reach
              onEndReached={
                this.handleLoadMore
              }
            />
          </View>
        </View>
      </>
    )
  }
}


export default Search;