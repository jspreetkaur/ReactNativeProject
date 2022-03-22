/*
Class to manage common utilities
*/

import AsyncStorage from '@react-native-community/async-storage';

/************************************** Regex ****************************************************/
export const user_name_regex = /^[a-zA-Z0-9]+$/;
export const password_regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-.]).{8,}$/;
export const name_regex = /^[a-zA-Z\-]+$/;

/************************************** Asyncstorage methods ************************************/

export const saveToAsyncStorage = (key, value) => {
    console.log(`save data key ######## ==> ${key}`)
    console.log(`save data value ######## ==> ${value}`)
    return new Promise((resolve, reject) => {
        AsyncStorage.setItem(key, value).then(() => {
            resolve(value)
        }).catch((error) => {
            reject(error)
        })
    })
}

export const getAsyncStorage = (key) => {
    console.log(`Get data key ######## ==> ${key}`)
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem(key).then((response) => {
            resolve(response)
        }).catch((error) => {
            reject(error)
        })
    })
}