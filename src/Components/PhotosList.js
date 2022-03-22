/*
Class to manage Photos List
*/

import React, { Component } from 'react'
import { FlatList } from 'react-native';
import { ItemPhoto } from './ItemPhoto';

class PhotosList extends Component {
    render() {
        var photos = new Array()
        this.props.data.map((item, index) => {
            let items = {
                image: [],
                key: 0
            };
            items.image = item
            items.key = index.toString()
            photos.push(items)
        })

        return (
            <FlatList
                pagingEnabled
                horizontal
                data={photos}
                keyExtractor={item => item.key}
                renderItem={({ item }) => (
                    <ItemPhoto item={item.image} />
                )}
            />
        )
    }
}

export { PhotosList };
