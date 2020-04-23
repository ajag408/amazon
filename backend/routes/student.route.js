//sample, for reference


// const express = require('express');

// const router = express.Router();

// const session = require('express-session');
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');
// const { studentAuth, checkStudentAuth } = require('../Utils/studentPassport');

// const UPLOAD_PATH = path.resolve(__dirname, 'path/to/uploadedFiles');
// const upload = multer({
//   dest: UPLOAD_PATH,
//   limits: { files: 5 },
// });
// const kafka = require('../kafka/client');


// studentAuth();

// // CREATE Student
// router.route('/create-student').post((req, res) => {
//   req.body.path = 'create-student';
//   kafka.make_request('student', req.body, (err, results) => {
//     console.log('in result');
//     console.log(results);
//     if (err) {
//       console.log('Inside err');
//       res.json({
//         status: 'error',
//         msg: 'System Error, Try Again.',
//       });
//     } else {
//       console.log('Inside else');
//       res.json(results);
//     }
//   });
// });

// router.route('/user').get((req, res) => {
//   const { user } = session;
//   // console.log(session.user);
//   const data = {
//     user,
//     isStudent: session.isStudent,
//   };
//   res.json(data);
// });

// router.route('/logout').get((req, res) => {
//   console.log('route hit');
//   session.user = undefined;
//   session.isStudent = false;
//   res.json('done');
// });


// router.route('/login').post((req, res) => {
//   req.body.path = 'login';

//   kafka.make_request('student', req.body, (err, results) => {
//     if (err) {
//       console.log('Inside err');
//       res.json({
//         status: 'error',
//         msg: 'System Error, Try Again.',
//       });
//     } else {
//       console.log('Inside else');
//       res.json(results);
//     }
//   });
// });

// router.route('/getStudent/:id').get((req, res) => {
//   req.body.path = 'get-studentById';
//   req.body.paramID = req.params.id;
//   kafka.make_request('student', req.body, (err, results) => {
//     if (err) {
//       console.log('Inside err');
//       res.json({
//         status: 'error',
//         msg: 'System Error, Try Again.',
//       });
//     } else {
//       console.log('Inside else');
//       res.end(results);
//     }
//   });
// });


// //auth after testing
// router.route('/get-all-students').get(checkStudentAuth,(req, res) => {
//   req.body.path = 'get-all-students';
//   kafka.make_request('student', req.body, (err, results) => {
//     if (err) {
//       console.log('Inside err');
//       res.json({
//         status: 'error',
//         msg: 'System Error, Try Again.',
//       });
//     } else {
//       console.log('Inside else');
//       res.end(results);
//     }
//   });
// });


// router.route('/search').post((req, res) => {
//   req.body.path = 'search';
//   console.log(req.body);
//   kafka.make_request('student', req.body, (err, results) => {
//     if (err) {
//       console.log('Inside err');
//       res.send(err);
//     } else {
//       console.log('Inside else');
//       res.end(results);
//     }
//   });
// });


// router.route('/filterMajor').post(checkStudentAuth, (req, res) => {
//   req.body.path = 'filterMajor';

//   kafka.make_request('student', req.body, (err, results) => {
//     if (err) {
//       console.log('Inside err');
//       console.log(err);
//     } else {
//       res.end(results);
//     }
//   });
// });


// router.route('/education/:id').get(checkStudentAuth, (req, res) => {
//   req.body.path = 'education-byId';
//   req.body.paramId = req.params.id;
//   kafka.make_request('student', req.body, (err, results) => {
//     if (err) {
//       console.log('Inside err');
//       res.json(err);
//     } else {
//       res.end(results);
//     }
//   });
// });

// router.route('/experience/:id').get((req, res) => {
//   req.body.path = 'experience-byId';
//   req.body.paramId = req.params.id;
//   kafka.make_request('student', req.body, (err, results) => {
//     if (err) {
//       console.log('Inside err');
//       res.json(err);
//     } else {
//       res.end(results);
//     }
//   });
// });

// router.route('/profPic/:id').get((req, res) => {
//   req.body.path = 'profPic-byId';
//   req.body.paramId = req.params.id;
//   kafka.make_request('student', req.body, (err, results) => {
//     if (err) {
//       console.log('Inside err');
//     } else {
//       if(results.profPicFile == null){
//         return;
//       } else {

//         try{
//           if(fs.existsSync(path.resolve(UPLOAD_PATH, results.profPicFile))){
//            fs.createReadStream(path.resolve(UPLOAD_PATH, results.profPicFile)).pipe(res);
//           }
//         }
//         catch(err){
//           console.log("uploaded on another server");
//         }
//       }
//     }
//   });
// });

// router.route('/update-student-basic/:id').put(checkStudentAuth, (req, res, next) => {
//   req.body.path = 'update-student-basic';
//   req.body.paramId = req.params.id;
//   kafka.make_request('student', req.body, (err, results) => {
//     if (err) {
//       console.log('Inside err');
//       return next(err);
//     }

//     res.json(results);
//     return 0;
//   });
// });


// router.route('/profPic/:id').post(checkStudentAuth, upload.array('image', 5), (req, res, next) => {
//   const images = req.files.map((file) => ({
//     profPicFile: file.filename,
//     profPicOG: file.originalname,
//   }));
//   console.log(images);
//   if (!images[0].profPicOG.match(/\.(gif|jpg|jpeg|tiff|png)$/i)) {
//     res.json('Not an image');
//   } else {
//     images[0].path = 'postProfPic';
//     images[0].paramId = req.params.id;
//     // console.log(session.user.email);
//     kafka.make_request('student', images[0], (err, results) => {
//       if (err) {
//         console.log('Inside err');
//         return next(err);
//       }

//       res.json(results);
//       return 0;
//     });
//   }
// });


// router.route('/update-education').put(checkStudentAuth, (req, res) => {
//   req.body.path = 'update-ed';
//   kafka.make_request('student', req.body, (err, results) => {
//     if (err) {
//       console.log('Inside err');
//       res.json(err);
//     } else {
//       res.json(results);
//       return 0;
//     }
//   });
// });


// router.route('/delete-education').post(checkStudentAuth, (req, res) => {
//   req.body.path = 'delete-ed';
//   kafka.make_request('student', req.body, (err, results) => {
//     if (err) {
//       console.log('Inside err');
//       res.json(err);
//     } else {
//       res.json(results);
//       return 0;
//     }
//   });
// });


// router.route('/add-education/:id').post(checkStudentAuth, (req, res) => {
//   req.body.student = req.params.id;
//   req.body.path = 'add-ed';
//   console.log(req.body);
//   kafka.make_request('student', req.body, (err) => {
//     if (err) {
//       console.log('Inside err');
//       res.json(err);
//     } else {
//       res.json('Added education');
//     }
//   });
// });

// router.route('/educationBlind/:id').get((req, res) => {
//   req.body.paramId = req.params.id;
//   req.body.path = 'ed-blind';
//   kafka.make_request('student', req.body, (err, results) => {
//     if (err) {
//       console.log('Inside err');
//       res.json(err);
//     } else {
//       res.end(results);
//     }
//   });
// });

// router.route('/experienceBlind/:id').get((req, res) => {
//   req.body.paramId = req.params.id;
//   req.body.path = 'ex-blind';
//   kafka.make_request('student', req.body, (err, results) => {
//     if (err) {
//       console.log('Inside err');
//       res.json(err);
//     } else {
//       res.end(results);
//     }
//   });
// });

// router.route('/profPicBlind/:id').get((req, res) => {
//   req.body.paramId = req.params.id;
//   req.body.path = 'profPic-blind';
//   kafka.make_request('student', req.body, (err, results) => {
//     if (err) {
//       console.log('Inside err');
//     } else if (results.profPicFile) {
//       fs.createReadStream(path.resolve(UPLOAD_PATH, results.profPicFile)).pipe(res);
//     } else {
//       console.log('we good');
//     }
//   });
// });


// router.route('/update-experience').put(checkStudentAuth, (req, res) => {
//   req.body.path = 'up-ex';
//   kafka.make_request('student', req.body, (err, results) => {
//     if (err) {
//       console.log('Inside err');
//       // res.json(err);
//     } else {
//       res.json(results);
//       return 0;
//     }
//   });
// });


// router.route('/delete-experience').post(checkStudentAuth, (req, res) => {
//   req.body.path = 'del-ex';
//   kafka.make_request('student', req.body, (err, results) => {
//     if (err) {
//       console.log('Inside err');
//       // res.json(err);
//     } else {
//       res.json(results);
//       return 0;
//     }
//   });
// });


// router.route('/add-experience/:id').post(checkStudentAuth, (req, res) => {
//   req.body.path = 'add-ex';
//   req.body.student = req.params.id;

//   kafka.make_request('student', req.body, (err, results) => {
//     if (err) {
//       console.log('Inside err');
//       // res.json(err);
//     } else {
//       res.json(results);
//     }
//   });
// });


// router.route('/update-skillset/:id').put((req, res) => {
//   req.body.path = 'up-skillz';
//   req.body.paramId = req.params.id;
//   kafka.make_request('student', req.body, (err, results) => {
//     if (err) {
//       console.log('Inside err');
//       // res.json(err);
//     } else {
//       res.json(results);
//       return 0;
//     }
//   });
// });


// router.route('/create-convo').post(checkStudentAuth, (req, res) => {
//   req.body.path = 'create-convo';
//   kafka.make_request('student', req.body, (err, results) => {
//     if (err) {
//       console.log('Inside err');
//       // res.json(err);
//     } else {
//       res.json(results);
//     }
//   });
// });

// router.route('/get-company-convos/:id').get(checkStudentAuth, (req, res) => {
//   req.body.path = 'get-company-convos';
//   req.body.paramId = req.params.id;
//   kafka.make_request('student', req.body, (err, results) => {
//     if (err) {
//       console.log('Inside err');
//       // res.json(err);
//     } else {
//       res.end(results);
//     }
//   });
// });

// router.route('/get-student-convos/:id').get(checkStudentAuth, (req, res) => {
//   req.body.path = 'get-student-convos';
//   req.body.paramId = req.params.id;
//   kafka.make_request('student', req.body, (err, results) => {
//     if (err) {
//       console.log('Inside err');
//       // res.json(err);
//     } else {
//       res.end(results);
//     }
//   });
// });

// router.route('/reply').post(checkStudentAuth, (req, res) => {
//   req.body.path = 'reply';
//   kafka.make_request('student', req.body, (err, results) => {
//     if (err) {
//       console.log('Inside err');
//       // res.json(err);
//     } else {
//       res.json(results);
//     }
//   });
// });
// module.exports = router;
