
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const { Passport } = require('passport');
const mongoose = require('mongoose');
const { secret } = require('../database/db');
const User = require('../models/User');

// const studentSchema = mongoose.model('Student', Student);

const passport = new Passport();
// Setup work and export for the JWT passport strategy
function auth() {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
    secretOrKey: secret,
  };
  passport.use(
    new JwtStrategy(opts, (jwt_payload, callback) => {
      const user_id = jwt_payload._id;
      const role = jwt_payload.role
      console.log(user_id)
      User.findById(user_id, (err, results) => {
        if (err) {
          return callback(err, false);
        }
        if (results) {
          callback(null, results);
        } else {
          callback(null, false);
        }
      });
    }),
  );
}

exports.userAuth = auth;
// exports.checkStudentAuth = passport.authenticate("jwt", (error, user, info) =>{
//     console.log(error);
//     console.log(user);
//     console.log(info);
// },
//  { session: false });

exports.checkUserAuth = passport.authenticate('jwt', { session: false });