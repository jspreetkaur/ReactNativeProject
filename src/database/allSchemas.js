/*
 Class to manage database 
*/

import Realm from 'realm'

// All SCHEMAS
export const USER_SCHEMA = 'User'
export const RESTAURANT_SCHEMA = 'Restaurant'

// SCHEMA for user
export const UserSchema = {
    name: USER_SCHEMA,
    primarykey: 'id',
    properties: {
        id: 'int', // primary key
        userName: { type: 'string', indexed: true },
        fullName: { type: 'string', indexed: true },
        password: { type: 'string', indexed: true }
    }
}

// SCHEMA for Restaurant
export const RestaurantSchema = {
    name: RESTAURANT_SCHEMA,
    primarykey: 'id',
    properties: {
        id: 'string', // primary key
        jsonValue: { type: 'string', optional: true },
    }
}


// Database options
const databaseOptions = {
    path: 'EasyFind.realm',
    schema: [UserSchema, RestaurantSchema],
    schemaVersion: 0
}

// For Saving User
export const saveUser = user => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            realm.create(USER_SCHEMA, user)
            resolve()
        })
    }).catch((error) => reject(error))
})

// Create method to check user name is exist or not (Tupple)
export const isUserExist = userName => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        let allUsers = realm.objects(USER_SCHEMA)
        let filterUser = allUsers.filtered('userName == $0', userName)
        if (filterUser !== null && filterUser.length > 0) {
            resolve(filterUser[0])
        } else {
            resolve(null)
        }
    }).catch((error) => reject(error))
})

// Check user auth for login
export const checkUserAuth = user => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        let allUsers = realm.objects(USER_SCHEMA)
        let filterUser = allUsers.filtered('userName == $0', user.userName).filtered('password == $0', user.password)
        resolve(filterUser[0]) // we know only one index of array exists 
    }).catch((error) => reject(error))
})

// For Saving Restaurant
export const saveRestaurant = json => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            realm.create(RESTAURANT_SCHEMA, json)
            resolve()
        })
    }).catch((error) => reject(error))
})

// Create method to check Restaurant is exist or not
export const isRestaurantExist = id => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        let restaurants = realm.objects(RESTAURANT_SCHEMA)
        let filterRestaurant = restaurants.filtered('id == $0', id)
        if (filterRestaurant !== null && filterRestaurant.length > 0) {
            resolve(true)
        } else {
            resolve(false)
        }
    }).catch((error) => reject(error))
})

// Delete Restaurant
export const deleteRestaurant = id => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            let restaurants = realm.objects(RESTAURANT_SCHEMA)
            let filterRestaurant = restaurants.filtered('id == $0', id)
            realm.delete(filterRestaurant)
            resolve()
        })
    }).catch((error) => reject(error))
})

// Fetch Restaurant
export const fetchRestaurants = () => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        let restaurants = realm.objects(RESTAURANT_SCHEMA)
        resolve(restaurants)
    }).catch((error) => reject(error))
})

// Delete All Restaurant
export const onLogout = () => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            let restaurants = realm.objects(RESTAURANT_SCHEMA)
            realm.delete(restaurants);
        })
    }).catch((error) => reject(error))
})

export default new Realm(databaseOptions)