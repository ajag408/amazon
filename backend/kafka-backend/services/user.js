

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const { secret } = require('../../database/db');
// const Student = require('../../models/Student');

// const studentSchema = mongoose.model('Student', Student);



// studentAuth();

const BCRYPT_SALT_ROUNDS = 12;


// function createStudent(msg, callback){
function handle_request(msg, callback) {
  if (msg.path === 'new-user') {
    bcrypt.hash(msg.password, BCRYPT_SALT_ROUNDS)
      .then((hashedPass) => {
        msg.password = hashedPass;

        //Mongoose query
        // studentSchema.create(msg, (err, data) => {
        //   console.log(msg);
        //   console.log('hello insdie mongoose');
        //   if (err) {
        //     console.log('hello form err');
        //     callback(null, err);
        //   } else {
        //     console.log('hello');
        //     console.log(data);
        //     callback(null, data);
        //   }
        // });
        callback(null, 'ok');
      })
      .catch((error) => {
        console.log('Error saving user: ');
        console.log(error);
        // next();
      });
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
