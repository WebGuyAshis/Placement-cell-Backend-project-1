const mongoose = require("mongoose");
const Interview = require("../models/interview");
const Company = require("../models/company");
const Student = require('../models/student')

module.exports.companyPage = async (req, res) => {
  try {
    const companies = await Company.find();

    for (let company of companies) {
      const interviews = await Interview.find({ companyId: company._id });
      company.interviewList = interviews.map((interview) => interview.toObject());
      await company.save();
    }

    res.render("company", {
      title: "Company Page",
      name: req.user.EmployeeName,
      companies,
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports.showDetail =  (req, res) => {
  console.log("Show Detail!");
  const companyId = req.params.companyId.slice(1);
  console.log("company Id",companyId);
  Company.findById(companyId)
    .then(company=>{
      console.log("Company Ajax", company);
      res.json(company);
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while fetching company details' });
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

// module.exports.createInterview = (req,res)=>{
//   console.log('inside controller');
//   console.log(req.body);
//   Result.create({
//     companyId: req.body.companyId,
//     student: req.body. student,
//     interviewDate: req.body.interviewDate,
//     interviewSlot: req.body.interviewSlot,
//     status: req.body.status
//   })
//   .then((createdInterview)=>{
//       console.log("Successfully Alloted Interview", createdInterview);
//       res.redirect('back');
//   })
//   .catch((err)=>{
//       console.log("Error Alotting Interview to Student!", err);

//   })
// }
