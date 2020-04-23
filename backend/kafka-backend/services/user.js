

let mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const { secret } = require('../../database/db');
let User = require('./../../models/User');

// const studentSchema = mongoose.model('Student', Student);



// studentAuth();

const BCRYPT_SALT_ROUNDS = 12;


// function createStudent(msg, callback){
function handle_request(msg, callback) {
  if (msg.path === 'new-user') {
  }
//    else if (msg.path === 'login') {
//     studentSchema.findOne({ email: msg.email }, (error, user) => {
//       if (error) {
//         console.log(error);
//         callback(null, error);
//       } else if (user == null) {
//         callback(null, 'No user with that email');
//       } else {
//         bcrypt.compare(msg.password, user.password)
//           .then((samePassword) => {
//             if (!samePassword) {
//               callback(null, 'Password invalid');
//             } else {
//               const payload = { _id: user._id };
//               const token = jwt.sign(payload, secret, {
//                 expiresIn: 1008000,
//               });

//               const data = {
//                 // user: user,
//                 // isCompany: session.isCompany,
//                 token: `JWT ${token}`,
//               };
//               callback(null, data);
//             }
//           });
//         // callback(null,user);
//       }
//     });
//   } 
}
// }

exports.handle_request = handle_request;
