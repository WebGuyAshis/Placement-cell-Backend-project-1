const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const crypto = require("crypto");
const Employee = require("../models/employee");

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "754168346850-iob065kiqoupms72fed9g0v1udil7qqi.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:8080/new/auth/google/callback",
      scope: ['profile', 'email'],
    },
    function (accessToken, refreshToken, profile, done) {
      Employee.findOne({ email: profile.emails[0].value })
        .then((employee) => {
          if (employee) {
            return done(null, employee);
          } else {
            Employee.create({
                EmployeeName: profile.displayName,
                Email: profile.emails[0].value,
                Password: crypto.randomBytes(20).toString("hex"),
            })
              .then((employee) => {
                if (employee) {
                  return done(null, employee);
                }
              })
              .catch((err) => {
                console.log("Error Creating User, ", err);
                return;
              });
          }
        })
        .catch((err) => {
          console.log("Error in Google Strategy Passport", err);
          return;
        });
    }
  )
);

module.exports = passport;
