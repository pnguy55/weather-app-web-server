const path = require('path')
const express = require('express')
const hbs = require('hbs')
const weather_lookup = require('./modules/weather-lookup')

const app = express()

const port = process.env.PORT || 3000

// This is how to programmatically find the path to other files
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engines and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

//Some variables
let logo_text = 'Weather App'
let author = 'Created by Phi Nguyen'



app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather App',
        logo_text: logo_text,
        name: author
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About',
        logo_text: logo_text,
        name: author
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'FAQ',
        logo_text: logo_text,
        helpText: 'This is some helpful text',
        name: author
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.location){
        res.send({
            error: 'You must provide a location'
        })
    }
    else {
        weather_lookup(req.query.location,res)
    }
})


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help 404',
        logo_text: logo_text,
        bodyOf404: 'Help article not found',
        name: author
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        logo_text: logo_text,
        bodyOf404: 'This is my 404 page',
        name: author
    })
})


app.listen(port, () => {
    console.log('Server is up on port ' + port)
})