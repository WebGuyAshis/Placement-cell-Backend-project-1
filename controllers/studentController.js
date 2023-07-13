const mongoose = require("mongoose");

const Interview = require('../models/interview');
const Student = require("../models/student");
const Company = require("../models/company");

module.exports.studentsPage = async (req, res) => {
  try {
    const students = await Student.find();
    for (let student of students) {
      const interviews = await Interview.find({ studentId: student._id });
      student.interviewList = interviews.map((interview) => interview._id);
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

  const {name,gender,dob,age,college,batch,dsaScore,webDScore,reactScore} = req.body;
  Student.create({
    name: name,
    gender: gender,
    dob: dob,
    age: age,
    college: college,
    batch: batch,
    dsaScore: dsaScore,
    webDScore: webDScore,
    reactScore: reactScore,
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
  Student.findById(studentId).populate("interviewList")
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
    .then((deletedStudent)=>{
      console.log("Successfully Deleted Student!", deletedStudent);
      
      deletedStudent.interviewList.forEach(interviewId=>{
        Interview.findByIdAndDelete(interviewId)
        .then(deletedInterview=>{
          console.log("and Interview related to", deletedStudent.name);
        })
        .catch(err=>{
          console.log("Error deleting",err);
        })
      })
      res.redirect('/employee/students-page');
    })
    .catch((err)=>{
      console.log("Error Deleting Student!!",err);
      res.redirect('back');
    })
}