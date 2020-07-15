const router = require('express').Router();
const User = require('../models/user.models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer')

process.env.JWT_KEY = 'secret'

router.get('/', (req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err))
});

//Register
router.post('/register', (req,res) => {
  User.find({ email : req.body.email })
  // let errors = []
    .then(user => {
      if(user.length >= 1) {
        return res.status(409).json({
          message: "username exist"
        })
      } else if(!req.body.username || !req.body.email || !req.body.password || !req.body.phone){
          return res.status(404).json({
            message: "Please fill the form"
          })
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if(err) {
            return res.status(201).json({error : err})
          } else {
            // console.log('NewUser===', newUser)
            const user = new User ({
              _id : new mongoose.Types.ObjectId(),
              username: req.body.username,
              email: req.body.email,
              password: hash,
              phone: 0 + req.body.phone,
            });
            user.save()
            .then(result => {
              return res.status(200).json({ message: 'User created'})
            })
            .catch(err => {
              console.log(err);
              return res.status(500).json({
                error : err
              })
            })
          }
        })    
      }
    })
    
      
  })

  // Login
  router.post('/login', (req, res) => {
    User.findOne({ email: req.body.email })
    .then(user => {
      console.log('USER======>>', user)
      const { username, email, phone, _id, cart } = user;
 
      if(user.length < 1) {
        return res.status(400).json({
          message: 'Mail not found'
        })
      }

      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: 'Auth'
          })
        }
        if (result){
          const token = jwt.sign({
            email: user.email,
            userId: user._id,
          }, process.env.JWT_KEY,
          {
              expiresIn: '30 days'
          }
          );
            return res.status(200).json({
              message: 'Auth Successfull',
              data: {
                username,
                email,
                phone,
                id: _id,
                token: token,
              }

            })
        }
        res.status(404).json({
          message: 'Auth failed'
        })
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error : err
      })
    })
  })

  router.post('/changepass', (req, res) => {
    User.findOne({email : req.body.email})
    .then(user => {
      let newPassword = req.body
      console.log('USER====', user)
      if(!user){
        console.log('Error')
        return res.status(404).json({
          message : 'Not found user'
        })
      } else {
        if(req.body.email){
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            if(user.password === req.body.password){
              return res.status(400).json({
                error : err
              })
            } else {
              if(newPassword){
                newPassword.email = req.body.email
                newPassword.password = hash
              }
              console.log(newPassword)
              return user.updateOne({ password : newPassword.password})
              .then(result => res.status(201).json({
                message : result
              }))
            }
          })
        }
      }
      // else {
      //   console.log('USER', user)
      //   bcrypt.hash(req.body.password, 10, (err, hash) => {
      //     if(err) {
      //       return res.status(401).json({error : err})
      //     } else {
      //       // console.log('NewUser===', user)
      //       // const user = new User ({
      //       //   userId : ,
      //       //   email: req.body.email,
      //       //   password: hash,
      //       // });
      //       if(user) {

      //       }
      //       // .catch(err => {
      //       //   console.log(err);
      //       //   return res.status(500).json({
      //       //     error : err
      //       //   })
      //       // })
      //     }
      //   })
      //   // bcrypt.hash(req.body.password, 10, (err, result) => {
      //   //   if(err){
      //   //     console.log('ERR')
      //   //   } else {
      //   //     const user = new User({
      //   //       password : hash
      //   //     })
      //   //     return user.updateOne()
      //   //   }
      //   // })
      //   // .then(result => {
      //   //   return res.status(200).json({
      //   //     message : 'Save'
      //   //   })
      //   // })
      // }
    })
  })

  router.get('/:id', (req, res) => {
    User.findById(req.params.id)
    .then((users) => {
      res.status(200).json({
        id : users.id,
        username : users.username,  
        email: users.email,
        password : users.password,
        phone: users.phone,
        cart : users.cart
      })
    })
    .catch((err) => {
      res.status(400).json({
        message : err
      })
    })
  })


  //Nodemailer
  router.post('/message', (req, res) => {
    User.find({email : req.body.email})
    .then(user => {
      if(!user){
        return res.status(404).json({
          message : 'Not found'
        })
      } else if(!req.body.email || !req.body.message) {
        return res.status(400).json({
          message : 'Please fill your suggest'
        })       
      } else {
        return res.status(200).json({
          message : 'Nodemail SUccess'
        })
      }
    })
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'fakhrulmrijal7599@gmail.com',
        pass: 'Abcd070599'
    },
      tls:{
        rejectUnauthorized:false
      }
    });

    const output =  `
    You have a Suggestion
    Contact Details
    Email : ${req.body.email}
    Message : ${req.body.message}
  `

    let mailOptions = {
      // from: '"Nodemailer Contact" <fakhrulmrijal7599@gmail.com>', // sender address
      from: `"Nodemailer" <${req.body.email}>`,
      to: 'fakhrulmrijal7599@gmail.com', // list of receivers
      subject: 'Critics and suggestions', // Subject line
      text: output, // plain text body
      email: `${req.body.email}`,
      message: `${req.body.message}`
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);   
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      console.log('Message ==', mailOptions)    

    });
  })


  

module.exports = router;