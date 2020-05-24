const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()
const port = porcess.env.PORT || 3000

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views') 
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup Handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Divyansh Joshi'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Divyansh Joshi'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        title: 'Help',
        message: 'This is a message for help section',
        name: 'Divyansh Joshi'
    })
})

// app.get('/about', (req, res)=>{
//     res.send('<h2>About Section</h2>')
// })

app.get('/weather', (req, res)=>{
    if(!req.query.address) // No address
    {
        return res.send({
            error: "Address not provided"
        })
    }
    // Function Calling for geocode and forecast.
    geocode(req.query.address, (error, {latitude, longitude, location} = {})=>
    {
        if(error)
        {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData)=>{
            if(error)
            {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res)=>{
    if (!req.query.search)
    {
        return res.send({
            error: 'You must provide a search term'
        }) // Function stops here if the if condition is satisfied.
    }     // Or we could just write else and wrap below code in it.
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res)=>{
    res.render('404', {
        title: '404 (Help)',
        error_message: 'Help article not found!',
        name: 'Divyansh Joshi'
    })
})

// * means match anything which has not yet matched anywhere
// This is for 404 Error Page
app.get('*', (req, res)=>{
    res.render('404', {
        title: '404',
        error_message: 'Page not Found!',
        name: 'Divyansh Joshi'
    })
}) 

app.listen(port, ()=>{
    console.log("Server is up on port " + port)
})