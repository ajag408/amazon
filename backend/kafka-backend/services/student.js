//sample, for reference

// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

// const jwt = require('jsonwebtoken');

// const { secret } = require('../../database/db');
// const Student = require('../../models/Student');

// const studentSchema = mongoose.model('Student', Student);
// const Education = require('../../models/Education');

// const educationSchema = mongoose.model('Education', Education);
// const Experience = require('../../models/Experience');

// const experienceSchema = mongoose.model('Experience', Experience);
// const StudentConvo = require('../../models/StudentConvo');

// const studentConvoSchema = mongoose.model('StudentConvo', StudentConvo);
// const CompanyConvo = require('../../models/CompanyConvo');

// const companyConvoSchema = mongoose.model('CompanyConvo', CompanyConvo);
// const Company = require('../../models/Company');

// const companySchema = mongoose.model('Company', Company);


// // studentAuth();

// const BCRYPT_SALT_ROUNDS = 12;


// // function createStudent(msg, callback){
// function handle_request(msg, callback) {
//   if (msg.path === 'create-student') {
//     bcrypt.hash(msg.password, BCRYPT_SALT_ROUNDS)
//       .then((hashedPass) => {
//         msg.password = hashedPass;

//         // studentSchema.find({}, (students)=>{
//         //     console.log(students);
//         // });
//         delete msg.path;

//         studentSchema.create(msg, (err, data) => {
//           console.log(msg);
//           console.log('hello insdie mongoose');
//           if (err) {
//             console.log('hello form err');
//             callback(null, err);
//           } else {
//             console.log('hello');
//             console.log(data);
//             callback(null, data);
//           }
//         });
//       })
//       .catch((error) => {
//         console.log('Error saving student: ');
//         console.log(error);
//         // next();
//       });
//   } else if (msg.path === 'login') {
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
//   } else if (msg.path === 'get-studentById') {
//     studentSchema.find({ _id: msg.paramID }, (err, student) => {
//       if (err) {
//         console.log(err);
//       } else {
//         console.log('before:', student);
//         console.log('Student: ', JSON.stringify(student));
//         callback(null, JSON.stringify(student));
//       }
//     });
//   } else if (msg.path === 'get-all-students') {
//     studentSchema.find({}, (error, students) => {
//       if (error) {
//         console.log(error);
//         callback(null, error);
//       } else {
//         console.log('All Students : ', JSON.stringify(students));
//         callback(null, JSON.stringify(students));
//       }
//     });
//   } else if (msg.path === 'search') {
//     studentSchema.find({
//       // $match: {
//       $or: [
//         {
//           name: {
//             $regex: msg.search,
//             $options: 'i',
//           },
//         },
//         {
//           collegeName: {
//             $regex: msg.search,
//             $options: 'i',
//           },
//         },
//         {
//           skillset: {
//             $regex: msg.search,
//             $options: 'i',
//           },
//         },
//       ],
//     },
//     //  }
//     (err, students) => {
//       if (err) {
//         callback(null, err);
//       }
//       console.log('Students : ', JSON.stringify(students));
//       callback(null, JSON.stringify(students));
//     });
//   } else if (msg.path === 'filterMajor') {
//     studentSchema.find({
//       // $match: {
//       $or: [
//         {
//           name: {
//             $regex: msg.search,
//             $options: 'i',
//           },
//         },
//         {
//           collegeName: {
//             $regex: msg.search,
//             $options: 'i',
//           },
//         },
//         {
//           skillset: {
//             $regex: msg.search,
//             $options: 'i',
//           },
//         },
//       ],
//     },
//     (err, students) => {
//       if (err) {
//         console.log(err);
//       } else {
//         console.log('before splice');
//         console.log(students);
//         (async () => {
//           let i;
//           for (i = 0; i < students.length; i += 1) {
//             await console.log('This student');
//             await console.log(students[i].name);

//             await educationSchema.find({
//               student: students[i]._id,
//               major: {
//                 $regex: msg.major,
//                 $options: 'i',
//               },
//             },

//             (error, educations) => {
//               // async (error, student) => {

//               if (error) {
//                 console.log(error);
//               } else {
//                 console.log(educations);

//                 if (educations.length === 0) {
//                   students.splice(i, 1);
//                   i -= 1;
//                 }
//                 console.log(students);
//               }
//             });

//             console.log('done');

//             // console.log("after:", jobs[i]);
//           }
//           console.log('after splice');
//           console.log(students);

//           i = 0;
//           console.log('students : ', JSON.stringify(students));
//           callback(null, JSON.stringify(students));
//         })();

//         // res.end("success");
//       }
//     });
//   } else if (msg.path === 'education-byId') {
//     educationSchema.find({ student: msg.paramId }, (error, education) => {
//       if (error) {
//         console.log(error);
//         callback(null, error);
//       } else {
//         console.log('Education : ', JSON.stringify(education));
//         callback(null, JSON.stringify(education));
//       }
//     });
//   } else if (msg.path === 'experience-byId') {
//     experienceSchema.find({ student: msg.paramId }, (error, experience) => {
//       if (error) {
//         console.log(error);
//         callback(null, error);
//       } else {
//         console.log('Experience : ', JSON.stringify(experience));
//         callback(null, JSON.stringify(experience));
//       }
//     });
//   } else if (msg.path === 'profPic-byId') {
//     studentSchema.find({ _id: msg.paramId }, (err, student) => {
//       if (err) {
//         console.log(err);
//       } else {
//         console.log('in prof pic');
//         console.log(student[0]);
//         callback(null, student[0]);
//       }
//     });
//   } else if (msg.path === 'update-student-basic') {
//     studentSchema.findOneAndUpdate({ _id: msg.paramId }, {
//       // overwrite: true
//       $set: msg,
//     }, { new: true }, (error, data) => {
//       if (error) {
//         //   return next(error);
//         console.log(error);
//       } else {
//         callback(null, data);
//       }
//     });
//   } else if (msg.path === 'postProfPic') {
//     studentSchema.findOneAndUpdate({ _id: msg.paramId }, {
//       // overwrite: true
//       $set: msg,
//     }, { new: true }, (error, data) => {
//       if (error) {
//         console.log(error);
//       } else {
//         callback(null, data);
//       }
//     });
//   } else if (msg.path === 'update-ed') {
//     educationSchema.findOneAndUpdate({ _id: msg.id }, {
//       // overwrite: true
//       $set: msg,
//     }, { new: true }, (error, data) => {
//       if (error) {
//         console.log(error);
//       } else {
//         callback(null, data);
//       }
//     });
//   } else if (msg.path === 'delete-ed') {
//     educationSchema.findByIdAndRemove(msg.id, (error, data) => {
//       if (error) {
//         console.log(error);
//       } else {
//         callback(null, data);
//       }
//     });
//   } else if (msg.path === 'add-ed') {
//     educationSchema.create(msg, (error, data) => {
//       console.log('hello');
//       if (error) {
//         console.log(error);
//         callback(null, error);
//       } else {
//         console.log('created');
//         console.log(data);
//         callback(null, 'Added education');
//       }
//     });
//   } else if (msg.path === 'ed-blind') {
//     educationSchema.find({ student: msg.paramId }, (error, education) => {
//       if (error) {
//         console.log('hello from ed blink eroor');
//         console.log(error);
//         callback(null, error);
//       } else {
//         console.log('Education : ', JSON.stringify(education));
//         if (JSON.stringify(education) == null) {
//           callback(null, {});
//         } else {
//           callback(null, JSON.stringify(education));
//         }
//       }
//     });
//   } else if (msg.path === 'ex-blind') {
//     experienceSchema.find({ student: msg.paramId }, (error, experience) => {
//       if (error) {
//         console.log('hello from ex blind error');
//         console.log(error);
//         callback(null, error);
//       } else {
//         console.log('Experience : ', JSON.stringify(experience));
//         if (JSON.stringify(experience) == null) {
//           callback(null, {});
//         } else {
//           callback(null, JSON.stringify(experience));
//         }
//       }
//     });
//   } else if (msg.path === 'profPic-blind') {
//     studentSchema.find({ _id: msg.paramId }, (err, student) => {
//       if (err) {
//         console.log(err);
//       } else if (student[0].profPicFile) {
//         callback(null, student[0]);
//       } else {
//         console.log('we good');
//       }
//     });
//   } else if (msg.path === 'up-ex') {
//     experienceSchema.findOneAndUpdate({ _id: msg.id }, {
//       // overwrite: true
//       $set: msg,
//     }, { new: true }, (error, data) => {
//       if (error) {
//         console.log(error);
//       } else {
//         callback(null, data);
//       }
//     });
//   } else if (msg.path === 'del-ex') {
//     experienceSchema.findByIdAndRemove(msg.id, (error, data) => {
//       if (error) {
//         console.log(error);
//       } else {
//         callback(null, data);
//       }
//     });
//   } else if (msg.path === 'add-ex') {
//     experienceSchema.create(msg, (error, data) => {
//       if (error) {
//         console.log(error);
//         callback(null, error);
//       } else {
//         console.log('created');
//         console.log(data);
//         callback(null, 'Added experience');
//       }
//     });
//   } else if (msg.path === 'up-skillz') {
//     studentSchema.findOneAndUpdate({ _id: msg.paramId }, {
//       // overwrite: true
//       $set: msg,
//     }, { new: true }, (error, data) => {
//       if (error) {
//         console.log(error);
//       } else {
//         callback(null, data);
//       }
//     });
//   } else if (msg.path === 'create-convo') {
//     studentSchema.findOne({ _id: msg.student1 }, (err, student) => {
//       if (err) {
//         console.log(err);
//       } else {
//         console.log(student.name);

//         msg.messages[0].sender = student.name;
//         console.log(msg.messages[0]);
//         studentConvoSchema.create(msg, (error, data) => {
//           if (error) {
//             console.log(error);
//             callback(null, error);
//           } else {
//             console.log('created');
//             console.log(data);
//             callback(null, 'Sent message');
//           }
//         });
//       }
//       // console.log(msg);
//     });
//   } else if (msg.path === 'get-company-convos') {
//     companyConvoSchema.find({ student: msg.paramId }, (error, convos) => {
//       if (error) {
//         console.log(error);
//       } else {
//         (async () => {
//           let i = 0;
//           for (i = 0; i < convos.length; i += 1) {
//             console.log(convos[i].company);
//             try {
//               await companySchema.findOne({ _id: convos[i].company })

//                 .then((company) => {
//                   convos[i]._doc.companyName = company.name;

//                   console.log('DONE WITH 1 CALLBACK');
//                 });

//               await studentSchema.findOne({ _id: convos[i].student })

//                 .then((student) => {
//                   // if(err){
//                   //   console.log(err);
//                   // } else {
//                   console.log('inside second await,', student);
//                   // console.log(i);
//                   convos[i]._doc.studentName = student.name;
//                   // }
//                 });
//             } catch (err) {
//               console.log(err);
//             }


//             console.log('done after BOTH');
//           }

//           i = 0;
//           console.log('companyConvos : ', JSON.stringify(convos));
//           callback(null, JSON.stringify(convos));
//         })();
//       }
//     });
//   } else if (msg.path === 'get-student-convos') {
//     studentConvoSchema.find({
//       // $match: {
//       $or: [
//         { student1: msg.paramId },
//         { student2: msg.paramId },
//       ],
//     }, (error, convos) => {
//       if (error) {
//         console.log(error);
//       } else {
//         (async () => {
//           let i = 0;
//           for (i = 0; i < convos.length; i += 1) {
//             // console.log(convos[i].company);
//             try {
//               await studentSchema.findOne({ _id: convos[i].student1 })

//                 .then((student) => {
//                   convos[i]._doc.student1Name = student.name;

//                   console.log('DONE WITH 1 CALLBACK');
//                 });

//               await studentSchema.findOne({ _id: convos[i].student2 })

//                 .then((student) => {
//                   // if(err){
//                   //   console.log(err);
//                   // } else {
//                   console.log('inside second await,', student);
//                   // console.log(i);
//                   convos[i]._doc.student2Name = student.name;
//                   // }
//                 });
//             } catch (err) {
//               console.log(err);
//             }


//             console.log('done after BOTH');
//           }

//           i = 0;
//           console.log('studentConvos : ', JSON.stringify(convos));
//           callback(null, JSON.stringify(convos));
//         })();
//       }
//     });
//   } else if (msg.path === 'reply') {
//     studentSchema.findOne({ _id: msg.student }, (err, student) => {
//       if (err) {
//         console.log(err);
//       } else {
//         // console.log(company.student);

//         msg.messages.sender = student.name;
//         console.log('in reply');
//         console.log(msg.messages);
//         if (msg.convoType === 'studentConvo') {
//           studentConvoSchema.findByIdAndUpdate(msg.convo,

//             { $push: { messages: msg.messages } },
//             { safe: true, upsert: true },
//             (error, data) => {
//               if (error) {
//                 console.log(error);
//               } else {
//                 console.log('created');
//                 console.log(data);
//                 callback(null, 'Sent Reply');
//               }
//             });
//         } else {
//           companyConvoSchema.findByIdAndUpdate(msg.convo,

//             { $push: { messages: msg.messages } },
//             { safe: true, upsert: true },
//             (error, data) => {
//               if (error) {
//                 console.log(error);
//                 callback(null, error);
//               } else {
//                 console.log('created');
//                 console.log(data);
//                 callback(null, 'Sent Reply');
//               }
//             });
//         }
//       }
//       // console.log(msg);
//     });
//   }
// }
// // }

// exports.handle_request = handle_request;
