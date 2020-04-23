

const mongoose = require('mongoose');

const jwt = require('jsonwebtoken');

const { secret } = require('../../database/db');
const User = require('../../models/user');
const UserSchema = mongoose.model('User', User);
// let User = require('./../../models/user');

// const CustomerSchema = require('../../models/customer');




// studentAuth();



// function createStudent(msg, callback){
function handle_request(msg, callback) {
  if (msg.path === 'new-user') {
    console.log("in service");
    console.log(UserSchema);
    msg.emailId = msg.email;
    UserSchema.create(msg, (err, data) => {
        console.log("in mongoose callback")
        if (err) {
          
          callback(null, err);
        } else {
          // if(msg.role === "Customer"){
          //   CustomerSchema
          // }
          console.log('hello');
          console.log(data);
          callback(null, data);
        }
      });
    // bcrypt.hash(msg.password, BCRYPT_SALT_ROUNDS)
    //   .then((hashedPass) => {
    //     msg.password = hashedPass;

    //     Mongoose query

    //     // callback(null, 'ok');
    //   })
    //   .catch((error) => {
    //     console.log('Error saving user: ');
    //     console.log(error);
    //     // next();
    //   });
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
