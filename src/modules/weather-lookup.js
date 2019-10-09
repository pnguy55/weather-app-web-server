//the following from from the api-key js files
const geocode_api_loader = require('../api-keys/geocode-api-loader')
const darksky_api_loader = require('../api-keys/darksky-api-loader')
const express = require('express')
//imports
const chalk = require('chalk')


//darksky_api_loader()
let weather_lookup = (city,res) => {
    geocode_api_loader(city, (error, lat_and_long, formatted_location) => {
        if (error) {
            console.log(chalk.red('\n' + error + '\n'))
            res.send({ error })
        } else {
            darksky_api_loader(lat_and_long, formatted_location, (error, {daily, currently}) => {
                if (error) {
                    console.log(chalk.red('\n' + error + '\n'))
                    res.send({ error })
                } else {
                    console.log('\n' + chalk.green('In ' + formatted_location + '. ' + daily.data[0].summary + " It is currently " + currently.temperature + ' degrees out. There is a ' + currently.precipProbability + '% chance of rain.\n'))
                    res.send({ 
                        location: formatted_location,
                        daily: daily.data[0].summary,
                        currently: currently
                    })
                }
            })
        }
    })
}
module.exports = weather_lookup