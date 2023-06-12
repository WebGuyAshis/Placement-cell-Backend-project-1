const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const crypto = require("crypto");
const Employee = require("../models/employee");

const googleClientID= process.env.clientID;
const googleClientSecret= process.env.clientSecret;
const googleCallbackURL= process.env.callbackURL;

passport.use(
  new GoogleStrategy(
    {
      clientID: googleClientID,
      clientSecret: googleClientSecret,
      callbackURL: googleCallbackURL,
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
