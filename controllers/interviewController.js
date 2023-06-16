const mongoose = require("mongoose");
const Company = require("../models/company");
const Student = require("../models/student");
const Interview = require('../models/interview');

const moment = require('moment');

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

  const dateString = interviewDate;
  const date = moment(dateString);
  const formattedDate = date.format('Do MMMM YYYY');
  
  Interview.create({
    studentId: studentId,
    studentName: studentName,
    companyId: companyId,
    companyName: companyName,
    interviewDate: formattedDate,
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
