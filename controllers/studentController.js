const mongoose = require("mongoose");

const Interview = require('../models/interview');
const Student = require("../models/student");
const Company = require("../models/company");


module.exports.studentsPage = async (req, res) => {
  try {
    const students = await Student.find();
    for (let student of students) {
      const interviews = await Interview.find({ studentId: student._id });
      // console.log(student);
      student.interviewList = interviews.map((interview) => interview.toObject());
      await student.save();
    }

    res.render("student", {
      title: "Student Page",
      name: req.user.EmployeeName,
      students,
    });
  } catch (error) {
    console.error(error);
  }
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

module.exports.showDetail = (req,res)=>{
  const studentId = req.params.studentId.slice(1);
  Student.findById(studentId)
    .then(student=>{
      res.json(student);
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while fetching student details' });
    });
}


module.exports.deleteStudent = (req,res) =>{
  const studentId = req.params.studentId;

  Student.findByIdAndRemove(studentId)
    .then((deleteStudent)=>{
      console.log("Successfully Deleted Student!", deleteStudent);
      res.redirect('/employee/students-page');
    })
    .catch((err)=>{
      console.log("Error Deleting Student!!",err);
      res.redirect('back');
    })
}