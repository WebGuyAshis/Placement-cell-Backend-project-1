const mongoose = require("mongoose");

const Result = require('../models/interview');
const Student = require("../models/student");
const Company = require("../models/company");


module.exports.studentsPage = (req, res) => {
  Student.find()
  .then((students) => {
    for(let student of students){
      Result.find({ studentId: student._id })
        .then((results)=>{
          student.interviewList = results;
          student.save();
        })
        .catch((error)=>{
          console.error(error);
        })
    }

    res.render("student", {
      title: "Students Page",
      name: req.user.EmployeeName,
      students,
    });
  });
};

module.exports.createStudent = (req, res) => {
  Student.create({
    name: req.body.name,
    gender: req.body.gender,
    dob: req.body.dob,
    age: req.body.age,
    college: req.body.college,
    batch: req.body.batch,
    dsaScore: req.body.dsaScore,
    webDScore: req.body.webDScore,
    reactScore: req.body.reactScore,
  })
    .then((createdStudent) => {
      console.log("Student Created Successfully!", createdStudent);
      res.redirect("/employee/students-page");
    })
    .catch((err) => {
      console.log("Error Creating Student!", err);
    });
};