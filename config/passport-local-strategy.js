const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const Employee = require('../models/employee');

passport.use(new LocalStrategy({
    usernameField: 'email'
},
    function(email, password, done){
        Employee.findOne({Email:email})
        .then((employee)=>{
            console.log("employee: **",employee);
            if(!employee || employee.Password !== password){
                console.log("Invalid Username/Password");
                return done(null,false);
            }
            return done(null, employee)
        })
        .catch((err)=>{
            console.log("Error finding User!!");
            return done(err);
        });
    }
));

// Serialize user

passport.serializeUser((employee,done)=>{
    done(null, employee.id);
})

// Deserialize user

passport.deserializeUser((id,done)=>{
    Employee.findById(id)
        .then((employee)=>{
            if(!employee){
                return done(null,false);
            }
            return done(null,employee);
        })
        .catch((err)=>{
            console.log("Error finding User!!");
            return done(err);
        })
});


// check user authentication

passport.checkAuthentication = (req,res,next)=>{
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/authorization');
}

passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.employee = req.employee; 
    }
    next();
}

module.exports = passport