const Employee = require('../models/employee')

module.exports.home = (req,res)=>{
    res.render('dashboard', {
        name: req.user.EmployeeName,
        title: 'Dashboard'
    })
}