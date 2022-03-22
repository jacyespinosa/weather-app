const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('../src/utils/geocode')
const forecast = require('../src/utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectory = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebar engines and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectory))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Jacy'
    })
})

app.get('/weather', (req, res) => {
    //Save the query string inside the address variable
    //If user did not enter an address, return an error message
    const address = req.query.address
    if (!address){
        return res.send({
            error: 'You must provide an address.'
        })
    }

    geoCode(address, (error, {latitude, longitude, location} = {}) => {
        //If there is an error, forecast will NOT run
        if (error){
            return res.send({ error })
        }

        // If data is returned, forecast will run.
        forecast(latitude, longitude, (error, forecastData) => {
            if (error){
                return res.send({ error })
            }
            //If both geocode and forecast returns data -> code below will run
            res.send({
                forecastData: forecastData,
                location,
                address: address
            })
        })
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Jacy',
        errorMessage: 'My 404 Page'
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}.`)
})