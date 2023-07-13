const mongoose = require('mongoose');
require('dotenv').config()

mongoose.connect(process.env.mongoDBAtlas);

const db = mongoose.connection;

db.on('error',console.error.bind(console,"Error Connecting Database"));
db.once('open',function(){
    console.log("Successfully Connected to Database!!");
});
module.exports=db;
