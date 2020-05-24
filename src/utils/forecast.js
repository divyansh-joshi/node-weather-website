const request = require('request')

const forecast = (latitude, longitude, callback) => 
{
    const concat =  latitude + ',' + longitude
    const url = 'http://api.weatherstack.com/current?access_key=1d345e33cf108562b2cf26446b07028b' +
    '&query=' + concat + '&units=m'
    request({url, json: true}, (error, { body }) =>
    {
        if (error)
        {
            callback('Network Error in Forecast',undefined)
        }
        else if (body.error)
        {
            callback('Invalid Input in Forecast', undefined)
        }
        else
        {
            const string1 = body.current.weather_descriptions[0] + 
            '. Current temperature is ' + body.current.temperature +
            ' degree celcius. And it feels like ' + body.current.feelslike
            callback(undefined, string1)
        }
    })
}


module.exports = forecast