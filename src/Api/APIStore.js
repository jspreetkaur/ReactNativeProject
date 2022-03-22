/*
Class to manage APIStore Instance
*/

import axios from 'axios';
let key = '3cmQ7xCYQ08tcjvOI4r9y3lkemOpBG-hlIXc1S_gSuJBPXWfe_M7neX72ynmwwrMLetYP24qYVsDTkT0N61djfCxhjwHidsCqAQocs4FOfsWb7MVyxEQiS2nyfaUXnYx'

const APIStore = axios.create({
    baseURL: 'https://api.yelp.com/v3/',
    headers: { 'Authorization': 'Bearer ' + key }

});
export { APIStore };