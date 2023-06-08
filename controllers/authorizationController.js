const mongoose = require('mongoose');
const passport = require('passport');

const Employee = require('../models/employee')

module.exports.home = (req,res)=>{
    if(req.isAuthenticated()){
        return res.redirect('/')
    }
    res.render('authorization',{
        title: 'Authorization'
    })
}

module.exports.createEmployee = (req,res)=>{
    // console.log("Req.Body:", req.body);
    Employee.create({
        EmployeeName: req.body.EmployeeName,
        Email: req.body.Email,
        Password: req.body.Password
    })
    .then((newEmployee)=>{
        console.log('Successfully Created Account', newEmployee);
        res.redirect('/authorization');
    })
    .catch((err)=>{
        console.log("Error creating Account!!", err);
        res.redirect('/authorization');
    })
};