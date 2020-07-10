const cors = require('cors')
const express = require('express')
const morgan = require('morgan')
const path = require('path')
const compression = require('compression')

// Defining new Express application
const app = express()

// Adding The 'body-parser' middleware only handles JSON and urlencoded data
app.use(express.json())

// cors middleware for orign and Headers
app.use(cors())

// Use Morgan middleware for logging every request status on console
app.use(morgan('dev'))

// Allow any method from any host and log requests
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE')
    if ('OPTIONS' === req.method) {
        res.sendStatus(200)
    } else {
        console.log(`${req.ip} ${req.method} ${req.url}`)
        next()
    }
})

// static assets folder
app.use(express.static(path.join(__dirname, './dist/tezos-blockchain-explorer')))

// Routes which should handle request
app.all('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, './dist/tezos-blockchain-explorer/index.html'))
})

// Invalid routes handling middleware
app.use((req, res, next) => {
    const error = new Error('404 not found')
    next(error)
})

// Error handling middleware
app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})

// Compressing the Application
app.use(compression())

module.exports = app
