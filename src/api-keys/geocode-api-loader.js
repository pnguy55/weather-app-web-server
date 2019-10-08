//imports
let request = require('request')
let chalk = require('chalk')
let api_key_getter = require('./api-key-getter')

//global variables
let loaded_api_keys = api_key_getter()
let google_geocode_key = loaded_api_keys[0].google_geocode

//function that makes the request from the Google API
let geocode_api_loader = (cityName, callback) => {
    let formattedCityName = cityName.replace(' ','+')
    let geocode_url = 'https://maps.googleapis.com/maps/api/geocode/json?address='+ formattedCityName+'&key='+google_geocode_key

    request({url:geocode_url, json: true}, (error, {body:geocode_response}) => { 
        if (error){
            callback('Unable to connect to location services!', undefined)
        } else if (geocode_response.status === 'ZERO_RESULTS') {
            callback('Location not valid', undefined)
        } else {
            let coordinates = geocode_response.results[0].geometry.location
            
            let lat_and_long = '/' + coordinates.lat.toFixed(4) + ',' + coordinates.lng.toFixed(4)
            
            callback(undefined, lat_and_long)
        }
        
    })
}
//exports
module.exports = geocode_api_loader