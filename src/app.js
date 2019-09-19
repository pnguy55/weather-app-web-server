const path = require('path')
const express = require('express')

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

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Phi Nguyen'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'Purpose of the Weather App',
        name: 'Phi Nguyen'
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        title: 'FAQ'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})