const mongoose = require('mongoose');
require('dotenv').config()
// const MongoUrl = process.env.MongoDBUrl;
const MongoUrl="MongoDBUrl = mongodb+srv://PrathameshB21:PrathameshB21@cluster0.pr9i2be.mongodb.net/Food-Del?retryWrites=true&w=majority&appName=Cluster0&tls=true"
try { mongoose.connect(MongoUrl) }
catch (error) {
    console.log(error);

}
const db = mongoose.connection;

db.on('connected', () => {
    console.log('Connection established')
})
db.on('error', () => {
    console.log('Failed to establish connection')

});
db.on('disconnected', () => {
    console.log('Connection stoped')
})
module.exports = db;

