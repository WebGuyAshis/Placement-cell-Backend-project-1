const mongoose = require("mongoose");

const Employee = require("../models/employee");
const Student = require("../models/student");

const Company = require("../models/company");

module.exports.createEmployee = (req, res) => {
  // console.log("Req.Body:", req.body);
  Employee.create({
    EmployeeName: req.body.EmployeeName,
    Email: req.body.Email,
    Password: req.body.Password,
  })
    .then((newEmployee) => {
      console.log("Successfully Created Account", newEmployee);
      res.redirect("/authorization");
    })
    .catch((err) => {
      console.log("Error creating Account!!", err);
      res.redirect("/authorization");
    });
};

// Creating Session
module.exports.createSession = (req, res) => {
  console.log("Logged in Successfully");
  return res.redirect("/employee/dashboard");
};

module.exports.destroySession = (req, res) => {
  req.logout((err) => {
    if (err) {
      console.log("Error in Log Out!");
      return;
    }
    console.log("Successfully logged out!");
    return res.redirect("/");
  });
};

module.exports.studentsPage = (req, res) => {
  Student.find().then((students) => {
    res.render("student", {
      title: "Students Page",
      name: req.user.EmployeeName,
      students,
    });
  });
};
module.exports.companyPage = (req, res) => {
  Company.find().then((companies) => {
    res.render("company", {
      title: "Students Page",
      name: req.user.EmployeeName,
      companies
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

module.exports.createCompany = (req, res) => {
  Company.create({
    name: req.body.name,
    description: req.body.description,
  })
    .then((createdCompany) => {
      console.log("Successfully Created Company!", createdCompany);
      res.redirect('/employee/companies-page')
    })
    .catch((err) => {
      console.log("Error Creating Company!", err);
      res.redirect('/employee/companies-page')
    });
};
