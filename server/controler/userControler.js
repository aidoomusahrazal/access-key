const bcrypt = require('bcrypt');
const crypto = require('crypto')
const User = require('./../models/userModel');
const passwordReset = require('./../middlewear/passwordreset.js')
const verifyEmail = require('../middlewear/sendVerificationEmail.js');
const jwt = require('jsonwebtoken')
require('dotenv').config()

const userController = {
    userSignup: async (req, res) => {
        try {
            const { name, email, password } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            const token = crypto.randomBytes(16).toString('hex');
        
            const user = await User.findOne({ email });
        
            if (user) {
              return res.status(400).json({ message: 'User already exists' }); // Return immediately to prevent further execution
            }
        
            const newUser = new User({
              name,
              email,
              password: hashedPassword,
              verifyToken: token,
              verifyTokenExpire: Date.now() + 3500000   
            });
        
            await newUser.save();
            res.status(200).json({ message: 'Check your email for verification' });
            verifyEmail(email,token)
            
          } catch (error) {
            res.status(500).json({ error: error.message });
          }
    },
    
    verify : async (req, res) => {
        try {
          console.log(req.params);
          // Find the user by the verification token and token expiration date
          const user = await User.findOne({
            verifyToken: req.params.token,
            verifyTokenExpire: { $gt: Date.now() }
          });
      
          if (!user) {
            return res.status(400).send('Verification link has expired or incorrect');
          }
      
          // Update user fields
          user.isVarified = true;
          user.verifyToken = undefined;
          user.verifyTokenExpire = undefined;
      
          // Save the updated user document
          await user.save();
      
          res.status(200).json({message:'Email verified successfully'});
        //   res.redirect('http://localhost:5173');
          
        } catch (err) {
          res.status(500).json({ error: err.message });
        }
      }    
,    
userLogin:  async (req, res) => {
  try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
          return res.status(400).json({ error: 'User not found' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      
      if (!isMatch) {
          return res.status(400).json({ error: 'Invalid credentials' });
      }

      console.log(user)

      const token = jwt.sign({id : user._id, email: user.email}, process.env.JSON_SECRET_KEY, {expiresIn: "1h"} )

      console.log(token)
      
      res.status(200).json({user: user, token})
      } catch (error) {
          res.status(400).json({ error: error.message, message: "Error, was not able to login" });
      }

     
},
    forgetPaword: async (req, res)=>{
        try{
            const email =req.body.email
            const token = crypto.randomBytes(8).toString('hex')
            const user = await User.findOne({email})
            if(!user){
                res.status(400).json({message:"User does not exist in the database, sign up now"})
            }
    
            user.forgetPasswordToken = token;
            user.forgetPasswordTokenExpire = Date.now() + 3600000 
            
            await user.save()
            passwordReset(email,token)
            res.status(200).json({message:"Please check your email for the reset link"})
    
        }catch(err){
            res.status(400).json({message:"Something went wrong"})
        }
    },
    resetPassword : async (req, res) => {
        const { token } = req.params;
        const { password } = req.body; 

        console.log(token)

        
          try {
            const user = await User.find({
              forgetPasswordToken: token,
              forgetPasswordTokenExpire: {$gt: Date.now()}, 
            });
        
            if (!user) {
              return res.status(400).send('Password reset token is invalid or has expired.');
            }

            console.log(user)
            
            const hashedpassword = await bcrypt.hash(password, 10);
            const newpassword = await User.findOneAndUpdate(
              { forgetPasswordToken: token },
              { $set: { password: hashedpassword, forgetPasswordToken: undefined, forgetPasswordTokenExpire: undefined } },
              { new: true }
            );

            if(newpassword){
              res.status(200).json({message:'Password resetted'})
            }
            
           
          } catch (error) {
            res.status(500).send('Internal server error');
          }
    }
}

module.exports = userController;