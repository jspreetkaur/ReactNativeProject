/*
This class for showing message when no items 
*/

import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Colors, Fonts } from '../theme'

const NoItemsView = props => {
    return (
        <View style={styles.container}>
            <Text style={styles.titleStyle}>No Restaurant found...</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleStyle: {
        fontFamily: Fonts.font_bold,
        fontSize: 20,
        color: Colors.black,
    },
});

export { NoItemsView };