const mongoose = require('mongoose');
const Company = require("../models/company");
const Student = require('../models/student');

const Result = require("../models/results")

// module.exports.companyPage = (req, res) => {
//     Company.find().then((companies) => {
//         Student.find().then((students)=>{
//             res.render("company", {
//               title: "Students Page",
//               name: req.user.EmployeeName,
//               companies,
//               students
//             });
//         })
//     });
//   };
  module.exports.companyPage = async(req, res) => {
    const [companies, students] = await Promise.all([
        Company.find(),
        Student.find(),
    ])
    // console.log(companies);
    res.render("company", {
        title: "Students Page",
        name: req.user.EmployeeName,
        companies,
        students,
      });
  };
  module.exports.createCompany = (req, res) => {
    Company.create({
      name: req.body.name,
      description: req.body.description,
    })
      .then((createdCompany) => {
        console.log("Successfully Created Company!", createdCompany);
        res.redirect("/employee/companies-page");
      })
      .catch((err) => {
        console.log("Error Creating Company!", err);
        res.redirect("/employee/companies-page");
      });
  };

  module.exports.createInterview = (req,res)=>{
    console.log('inside controller');
    console.log(req.body);
    Result.create({
      companyId: req.body.companyId,
      student: req.body. student,
      interviewDate: req.body.interviewDate,
      interviewSlot: req.body.interviewSlot,
      status: req.body.status
    })
    .then((createdInterview)=>{
        console.log("Successfully Alloted Interview", createdInterview);
        res.redirect('back');
    })
    .catch((err)=>{
        console.log("Error Alotting Interview to Student!", err);

    })
  }