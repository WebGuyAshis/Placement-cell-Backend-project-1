const express               = require('express');
const app                   = express();



// setting up view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Linking assets
app.use(express.static('assets'));

// Routes
app.use('/', require('./routes'));

app.listen(8080, (err)=>{
    if(err){
        console.log("Error Starting Server");
        return;
    }
    console.log("Server started at port 8080");
})