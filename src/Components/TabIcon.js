/*
Class to manage tab icon 
*/

import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import { Fonts, Colors } from '../theme';

const TabIcon = (props) => {
    return (
        <View style={styles.viewMainContainer}>
            <Image source={props.focused ? props.activeImg : props.defaultImg} style={props.ImgSize} />
            <Text style={[styles.titleText, { color: props.focused ? Colors.theme_color : '#282828' }]}>{props.title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    viewMainContainer: { marginTop: 8, alignSelf: 'stretch', justifyContent: 'flex-start', height: 40, alignItems: 'center', },
    titleText: { marginTop: 8, marginBottom: 0, textAlign: 'center', fontSize: 12, textTransform: "uppercase", fontFamily: Fonts.font_bold }
});

export { TabIcon };