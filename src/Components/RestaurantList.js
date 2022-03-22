/*
Class to manage Restaurant List
*/

import React, { Component } from 'react'
import { FlatList } from 'react-native';
import { ItemRestaurant } from '../components'
import { saveRestaurant, isRestaurantExist, deleteRestaurant } from '../database/allSchemas'
import * as Constants from '../Constants'
import { EventRegister } from 'react-native-event-listeners'

class RestaurantList extends Component {

    // state
    state = {
        data: [],
        type: ''
    }

    // Life-cycle
    componentDidMount() {
        this.setState({ data: this.props.data })
    }

    componentDidUpdate(prevProps) {
        if (this.props.data !== prevProps.data) {
            this.setState({ data: this.props.data, type: this.props.type })
        }
    }

    // Fav button action
    favButtonClicked = (index, item) => {
        // checking restaurant already exist or not
        isRestaurantExist(item.id).then((isExist) => {
            if (!isExist) { // saving..
                // creating instance
                let json = {
                    id: item.id,
                    jsonValue: JSON.stringify(item)
                }
                saveRestaurant(json).then(() => {
                    EventRegister.emit(Constants.REFRESH_RESTAURANT)
                    if (this.state.type == Constants.SEARCH_LIST) {
                        this.updateFavStatus(index, item)
                    } else {
                        EventRegister.emit(Constants.REFRESH_SEARCH)
                    }
                    alert(Constants.SAVED_RESTA)
                }).catch((error) => { alert(Constants.ERROR_LOG) })
            } else { // deleting..
                deleteRestaurant(item.id).then(() => {
                    EventRegister.emit(Constants.REFRESH_RESTAURANT)
                    if (this.state.type == Constants.SEARCH_LIST) {
                        this.updateFavStatus(index, item)
                    } else {
                        EventRegister.emit(Constants.REFRESH_SEARCH)
                    }
                    alert(Constants.REMOVED_RESTA)
                }).catch(() => { alert(Constants.ERROR_LOG) })
            }
        }).catch(() => { })
    }

    // update fav status
    updateFavStatus = (index, item) => {
        let newData = [...this.state.data]
        newData[index].isFav = !item.isFav
        this.setState({ data: newData })
    }

    // rendering UI elements
    render() {
        return (
            <FlatList
                data={this.state.data}
                keyExtractor={item => item.id}
                renderItem={({ item, index }) => (
                    <ItemRestaurant
                        item={item}
                        onPress={() => this.props.didSelectRow(item)}
                        onFavPress={() => this.favButtonClicked(index, item)}
                    />
                )}
                ListFooterComponent={this.props.listFooter}
                onEndReachedThreshold={0.1}
                onEndReached={this.props.onEndReached}
            />
        )
    }
}

export { RestaurantList };
