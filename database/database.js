// Package
let mongoose = require('mongoose');
let bluebird = require('bluebird');

// Set mongoose Promise to Bluebird
mongoose.Promise = bluebird

class Database {
    constructor() {
      connect()
    }
} 

var dbUrl = 'mongodb+srv://testJL:admin@cluster0.sm61v.mongodb.net/testC?retryWrites=true&w=majority';
// var dbUrl = 'mongodb://localhost:27017/newAPI';

// Retry connection
const connectWithRetry = () => {
  console.log('MongoDB connection with retry')
  return mongoose.connect(
    dbUrl,
    { useNewUrlParser: true,
      useUnifiedTopology: true
    })
}

// Exit application on error
mongoose.connection.on('error', err => {
  console.log(`MongoDB connection error: ${err}`)
  setTimeout(connectWithRetry, 5000)
  // process.exit(-1)
})

mongoose.connection.on('connected', () => {
  console.log('MongoDB is connected')
})


const connect = () => {
  connectWithRetry()
}

module.exports = new Database()
