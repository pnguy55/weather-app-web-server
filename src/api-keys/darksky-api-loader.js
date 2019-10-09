//imports
let request = require('request')
let chalk = require('chalk')
let api_key_getter = require('./api-key-getter')
//global variables
let loaded_api_keys = api_key_getter()
let darksky_key = loaded_api_keys[0].darksky
//function that requests data from the darksky API
let darksky_api_loader = (lat_and_long, formatted_location, callback) => {
    //url variable
    let darksky_api_url = 'https://api.darksky.net/forecast/'+ darksky_key + lat_and_long

    request({url:darksky_api_url, json: true}, (error, {body:darksky_response}) => { 
        if (error) {
            callback('Unable to connect to weather service', undefined, undefined)
        } else if (darksky_response.error) { 
            callback('Unable to show location', undefined, undefined)
        } else {
            callback(undefined, darksky_response, formatted_location)
        }
    })
    
}
//exports
module.exports = darksky_api_loader