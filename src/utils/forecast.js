const request = require("request");
require('dotenv').config();
const key = process.env.FORECAST_API;

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=${key}&query=${latitude},${longitude}&units=f`

    request({ url, json: true}, (error, { body }) => {
        if (error){
            callback('Unable to connect to the weather service.', undefined)
        }else if (body.error){
            callback('Unable to find location', undefined)
        }else{
            const data = body.current

            const currentTemp = data.temperature
            const weatherDescription = data.weather_descriptions[0]
            const feelsLike = data.feelslike
            const weatherIcon = data.weather_icons[0]
            callback(undefined, {
                currentTemp,
                weatherDescription,
                feelsLike,
                weatherIcon
            })
        }

    })
}

module.exports = forecast