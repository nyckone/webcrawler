const mongoose = require('mongoose')
const HTMLPage = require('./models/html_page')

mongoose.connect('mongodb://127.0.0.1:27017/webcrawler', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})

const defaultConnectionURL = 'mongodb://127.0.0.1:27017'
const defaultDatabaseName = 'webcrawler'