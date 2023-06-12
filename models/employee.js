const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    EmployeeName:{
        type: String,
        required: true
    },
    Email:{
        type: String,
        required: true,
    },
    Password:{
        type: String,
        required: true
    }
},
{
    timestamps: true
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;