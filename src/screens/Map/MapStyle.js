/*
Style for Map screen
*/

import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    mainConatiner: {
        flex: 1,
    },
    map: {
        zIndex: 0,
        ...StyleSheet.absoluteFillObject,
    }
})