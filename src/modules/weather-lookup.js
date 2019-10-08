//the following from from the api-key js files
const geocode_api_loader = require('../api-keys/geocode-api-loader')
const darksky_api_loader = require('../api-keys/darksky-api-loader')
const express = require('express')
//imports
const chalk = require('chalk')


//darksky_api_loader()
let weather_lookup = (city,res) => {
    geocode_api_loader(city, (error, lat_and_long) => {
        if (error) {
            console.log(chalk.red('\n' + error + '\n'))
            res.send({ error })
        } else {
            darksky_api_loader(lat_and_long, (error, {daily, currently}) => {
                if (error) {
                    console.log(chalk.red('\n' + error + '\n'))
                    res.send({ error })
                } else {
                    console.log('\n' + chalk.green(daily.data[0].summary + " It is currently " + currently.temperature + ' degrees out. There is a ' + currently.precipProbability + '% chance of rain.\n'))
                    res.send({ 
                        daily: daily.data[0].summary,
                        currently: currently.temperature
                    })
                }
            })
        }
    })
}
module.exports = weather_lookup