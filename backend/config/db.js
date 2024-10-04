const mongoose = require('mongoose');
require('dotenv').config()
const MongoUrl=process.env.MongoDBUrl;

try{mongoose.connect(MongoUrl,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})}catch(error){
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

