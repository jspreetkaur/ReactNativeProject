/*
This class to manage row of restaurant
*/

import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { Colors, Fonts, Images } from '../theme'
import { Rating } from 'react-native-elements';
import RNSDWebImage from 'react-native-sdwebimage';

const ItemRestaurant = ({ item, onPress, onFavPress }) => {

    var categories = ''
    item.categories.forEach(element => {
        if (categories.length > 0) {
            categories = categories.concat(', ')
        }
        categories = categories.concat(element.title)
    })

    return (
        <TouchableOpacity
            onPress={() => onPress(item)}
        >
            <View style={styles.container}>
                <RNSDWebImage
                    style={styles.avatarStyle}
                    source={{
                        uri: item.image_url,
                        priority: RNSDWebImage.priority.high
                    }}
                    resizeMode="cover"
                />
                <View style={styles.infoRowStyle}>
                    <View style={styles.topContainer}>
                        <Text style={styles.nameStyle}>{item.name}</Text>
                    </View>
                    <View style={styles.ratingContainer}>
                        <Rating
                            readonly
                            type='star'
                            startingValue={item.rating}
                            ratingCount={5}
                            imageSize={20}
                            style={styles.ratingStyle}
                        />
                        <Text style={styles.reviewStyle}>{item.review_count} Reviews</Text>
                    </View>
                    <Text style={styles.mealsStyle}>{categories}</Text>
                    <Text style={styles.priceStyle}>{item.price}</Text>
                    <Text style={styles.addressStyle}>{item.location.address1}, {item.location.city}</Text>
                </View>
                <View style={styles.favStyle}>
                    <TouchableOpacity
                        onPress={() => {
                            onFavPress(item)
                        }}
                    >
                        <Image
                            source={item.isFav ? Images.fav : Images.un_fav}
                            style={{ height: 26, width: 26 }}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    )
};


const styles = StyleSheet.create({
    container: {
        width: '90%',
        alignSelf: 'center',
        borderBottomWidth: 0.5,
        borderBottomColor: "#ccc",
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: 'row',
    },
    avatarStyle: {
        width: '30%',
        overflow: 'hidden',
        backgroundColor: Colors.placeholder_color
    },
    favStyle: {
        right: 0,
    },
    infoRowStyle: {
        flex: 1,
        marginHorizontal: 8,
        justifyContent: 'center',
    },
    topContainer: {
        marginTop: 0,
        flexDirection: 'row',
    },
    nameStyle: {
        fontFamily: Fonts.font_bold,
        fontSize: 20,
        color: Colors.black,
    },
    ratingContainer: {
        marginVertical: 2,
        flexDirection: 'row',
    },
    ratingStyle: {
        marginVertical: 5
    },
    reviewStyle: {
        fontFamily: Fonts.font_light,
        fontSize: 15,
        marginHorizontal: 14,
        alignSelf: 'center',
        marginVertical: 7
    },
    mealsStyle: {
        fontFamily: Fonts.font_regular,
        fontSize: 16,
        color: Colors.black,
        marginVertical: 2
    },
    priceStyle: {
        fontFamily: Fonts.font_regular,
        fontSize: 16,
        color: Colors.black,
        marginVertical: 2
    },
    addressStyle: {
        fontFamily: Fonts.font_light,
        fontSize: 14,
        color: Colors.black,
        marginVertical: 2,
        marginBottom: 5
    }
});

export { ItemRestaurant };