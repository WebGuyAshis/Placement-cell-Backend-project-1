const mongoose = require('mongoose');

const Employee = require('../models/employee')

module.exports.createEmployee = (req,res)=>{
    // console.log("Req.Body:", req.body);
    Employee.create({
        EmployeeName: req.body.EmployeeName,
        Email: req.body.Email,
        Password: req.body.Password
    })
    .then((newEmployee)=>{
        console.log('Successfully Created Account', newEmployee);
        res.redirect('/');
    })
    .catch((err)=>{
        console.log("Error creating Account!!", err);
        res.redirect('/authorization');
    })
};

// Creating Session
module.exports.createSession = (req,res)=>{
    console.log("Logged in Successfully");
    return res.redirect('/employee/dashboard')
}

module.exports.destroySession = (req,res)=>{
    req.logout((err)=>{
        if(err){
            console.log("Error in Log Out!");
            return;
        }
        console.log('Successfully logged out!');
        return res.redirect('/');
    })
}

module.exports.studentsPage= (req,res)=>{
    res.render('student',{
        title: 'Students Page',
        name: req.user.EmployeeName,
    })
}
module.exports.companyPage= (req,res)=>{
    res.render('company',{
        title: 'Students Page',
        name: req.user.EmployeeName,
    })
}