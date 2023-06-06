const mongoose = require('mongoose');

const Employee = require('../models/employee')

module.exports.home = (req,res)=>{
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
        res.redirect('/');
    })
    .catch((err)=>{
        console.log("Error creating Account!!", err);
        res.redirect('/authorization');
    })
};