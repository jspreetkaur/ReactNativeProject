/*
This class to manage row of Photo list
*/

import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import RNSDWebImage from 'react-native-sdwebimage';

const windowWidth = Dimensions.get('window').width;

const ItemPhoto = ({ item, onPress }) => {
    return (
        <View style={styles.container}>
            <RNSDWebImage
                style={styles.imageStyle}
                source={{
                    uri: item,
                    priority: RNSDWebImage.priority.high
                }}
                resizeMode="cover"
            />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: windowWidth,
        marginTop: 0,
        marginBottom: 0,
    },
    imageStyle: {
        flex: 1
    },
});

export { ItemPhoto };