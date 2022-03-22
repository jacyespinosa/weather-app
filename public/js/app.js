const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const locationInfo = document.querySelector('#location-information')
const temperature = document.querySelector('#temperature')
const description = document.querySelector('#description')
const feelsLike = document.querySelector('#feels-like')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const location = search.value

    temperature.textContent = ''
    description.textContent = ''
    feelsLike.textContent = ''

    fetch('/weather?address=' + location).then((response) => {
        response.json().then( (data) => {
            if (data.error){
                locationInfo.textContent = data.error
            }else{
                locationInfo.textContent = data.location
                temperature.textContent = data.forecastData.currentTemp + '°F'
                description.textContent = data.forecastData.weatherDescription
                feelsLike.textContent = 'Feels like ' + data.forecastData.feelsLike + '°F'
            }
        })
    })


})