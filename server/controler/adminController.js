const bcrypt = require('bcrypt');
const Admin = require('./../models/adminModel');
const jwt = require('jsonwebtoken')
require('dotenv').config()

const userController = {
    
   
adminLogin:  async (req, res) => {
  try {
      const { email, password } = req.body;

      const user = await Admin.findOne({ email });

      if (!user) {
          return res.status(400).json({ error: 'User not found' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      
      if (!isMatch) {
          return res.status(400).json({ error: 'Invalid credentials' });
      }

      const token = jwt.sign({id : user._id, email: user.email}, process.env.JSON_SECRET_KEY, {expiresIn: "1h"} )
      
      res.status(200).json({user: user, token})
      } catch (error) {
          res.status(400).json({ error: error.message, message: "Error, was not able to login" });
      }

     
}
}

module.exports = userController;