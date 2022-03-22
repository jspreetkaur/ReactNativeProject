/*
Style for Favourite screen
*/

import {StyleSheet} from 'react-native'
import {Fonts, Colors} from '../../theme'

export default StyleSheet.create({
    mainConatiner: {
        flex: 1,
        backgroundColor: Colors.white
    },
    topContainer: {
        marginTop: 10,
        height: 44,
    },
    listContainer: {
        flex: 1,
        marginVertical: 20,
        paddingBottom: 8
    }
})