const mongoose = require("mongoose");
const Company = require("../models/company");
const Student = require("../models/student");
const Interview = require('../models/interview');

// const moment = require('moment');

module.exports.interviewPage = async (req, res) => {
  const [companies, students, interviews ] = await Promise.all([
    Company.find(),
    Student.find(),
    Interview.find(),
  ]);
  // console.log(companies);
  res.render("interview", {
    title: "Students Page",
    name: req.user.EmployeeName,
    companies,
    students,
    interviews
  });
};

module.exports.createInterview = (req, res) => {
  console.log("inside Create controller");
  console.log(req.body);

  const {student, company, interviewDate, status } = req.body;
  const[studentId, studentName] = student.split(',');
  const[companyId, companyName] = company.split(',');

  // const dateString = interviewDate;
  // const date = moment(dateString);
  // const formattedDate = date.format('Do MMMM YYYY');
  
  Interview.create({
    studentId: studentId,
    studentName: studentName,
    companyId: companyId,
    companyName: companyName,
    interviewDate: interviewDate,
    status: status,
  })
    .then((createdInterview) => {
      console.log("Successfully Alloted Interview", createdInterview);
      res.redirect("/employee/interviews-page");
    })
    .catch((err) => {
      console.log("Error Alotting Interview to Student!", err);
    });
};

module.exports.showUpdateDetail = (req, res) => {
  console.log("Update Page");
  const interviewId = req.params.interviewId;

  Interview.findById(interviewId)
    .then(interview => {
      if (!interview) {
        return res.status(404).json({ error: 'Interview not found' });
      }
      res.json(interview);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while fetching interview details' });
    });
};


module.exports.updateInterview = (req, res) => {
  console.log("Inside Update");
  const interviewId = req.params.interviewId;
  console.log(interviewId);
  console.log(req.body);
  Interview.findByIdAndUpdate(interviewId, { interviewDate: req.body.interviewDate, status: req.body.status })
    .then(interview => {
      console.log("Successfully Update", interview);
      res.redirect('/employee/interviews-page');
    })
    .catch(err => {
      console.log("Error updating interview:", err);
      res.redirect('/employee/interviews-page');
    });
};

module.exports.deleteInterview = async (req, res) => {
  try {
    const interviewId = req.params.interviewId;

    const deletedInterview = await Interview.findByIdAndDelete(interviewId);
    console.log("Successfully Deleted Interview!", deletedInterview);
    res.redirect('/employee/interviews-page');

    const studentId = deletedInterview.studentId;
    const companyId = deletedInterview.companyId;

    const student = await Student.findById(studentId);
    if (student) {
      console.log("Successfully deleted Interview from Students");
      student.interviewList = student.interviewList.filter(interview => interview.toString() !== interviewId);
      await student.save();
    }

    const company = await Company.findById(companyId);
    if (company) {
      console.log("Successfully deleted Interview from Companies");
      company.interviewList = company.interviewList.filter(interview => interview.toString() !== interviewId);
      await company.save();
    }
  } catch (err) {
    console.log("Error Deleting Interview!", err);
    res.redirect('/employee/interviews-page');
  }
};

