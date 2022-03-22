/*
Style for Signup screen
*/

import { StyleSheet } from 'react-native'
import { Fonts, Colors } from '../../theme'

export default StyleSheet.create({
    safeTop: {
        flex: 0,
        backgroundColor: Colors.theme_color
    },
    mainView: {
        flex: 1,
    },
    mainContainer: {
        flex: 1,
        flexDirection: 'column',
    },
    topContainer: {
        backgroundColor: Colors.theme_color,
    },
    navContainer: {
        top: '10%',
        height: 50
    },
    bottomContainer: {
        height: 400
    },
    title: {
        position: 'absolute',
        fontFamily: Fonts.font_bold,
        fontSize: 30,
        alignSelf: "center",
        color: Colors.white
    },

    accountTitle: {
        fontFamily: Fonts.font_regular,
        marginVertical: '15%',
        fontSize: 22,
        alignSelf: "center",
        color: Colors.white,
    },
    bottomColor: {
        marginVertical: 0,
        height: 150,
        width: '100%',
        backgroundColor: Colors.theme_color,
        zIndex: 0
    },
    bottomView: {
        position: 'absolute',
        alignSelf: 'center',
        height: 357,
        marginVertical: 0,
        width: '90%',
        backgroundColor: Colors.white,
        borderRadius: 10,
        shadowColor: Colors.black,
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
        elevation: 16,
        zIndex: 1
    },
    backButton: {
        alignSelf: "flex-start",
        top: '15%',
        left: 20,
        width: 50,
        height: 50
    },

})