const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

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
let author = 'Created by Phi Nguyen'


app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather App',
        name: author
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'Purpose of the Weather App',
        name: author
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'FAQ',
        name: author,
        helpText: 'This is some helpful text'
    })
})

app.get('/weather', (req, res) => {
    res.send({
        forecast: 'It is snowing',
        location: 'Philidelphia'
    })
})
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help 404',
        bodyOf404: 'Help article not found',
        name: author
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        bodyOf404: 'This is my 404 page',
        name: author
    })
})


app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})