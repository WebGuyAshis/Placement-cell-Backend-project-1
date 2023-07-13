const mongoose = require('mongoose');
require('dotenv').config()

// mongoose.connect(process.env.mongoDBAtlas);
mongoose.connect("mongodb+srv://developerashis99:gSlbbzdGZMlhuLRb@cluster0.3m2ngtn.mongodb.net/Placement-Cell");

const db = mongoose.connection;

db.on('error',console.error.bind(console,"Error Connecting Database"));
db.once('open',function(){
    console.log("Successfully Connected to Database!!");
});
module.exports=db;
