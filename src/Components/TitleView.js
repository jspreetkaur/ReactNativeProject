
/*
This class for top title view
*/

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../theme/'

const TitleView = props => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{props.title}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        height: 44,
    },
    title: {
        color: Colors.black,
        fontSize: 34,
        fontWeight: 'bold',
        marginHorizontal: 20
    }
});

export { TitleView };