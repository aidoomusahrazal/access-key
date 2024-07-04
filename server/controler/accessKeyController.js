const AccessKey = require('./../models/accessKeyModel');
const crypto = require("crypto");
const User = require('./../models/userModel');

const accessKeyController = {
    // Function to generate a new access key
generateAccessKey : async (req, res) => {
    try {
      const { email } = req.body;
      const key = crypto.randomBytes(18).toString('hex');
      const expiresAt = new Date();
      expiresAt.setMonth(expiresAt.getMonth() + 1);

      const userAvailable = await User.findOne({ email});   
      const userHasKey = await AccessKey.findOne({ email, keyStatus: "active" });

      console.log(userHasKey)


      if( !userAvailable) {
        return res.status(404).json({error: "User does not exist"})
      }

      if ( userHasKey ) {
            return res.status(400).json({ message: 'User already has an active access key' });
      }
  
      const newAccessKey = new AccessKey({
        key,
        email,
        expiresAt
      });
  
      await newAccessKey.save();
      res.status(201).json({ message: 'Access key generated successfully', accessKey: newAccessKey });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  
  // Function to revoke an access key
 revokeAccessKey : async (req, res) => {
    try {
      const { id } = req.params;
      const _id = id
      const accessKey = await AccessKey.findById({_id});
      if (!accessKey) {
        return res.status(404).json({ message: 'Access key not found' });
      }
      if (accessKey.keyStatus === 'revoked') {
        return res.status(400).json({ message: 'Access key is already revoked' });
        
      }
      accessKey.keyStatus = 'revoked';
      await accessKey.save();
      res.status(200).json({ message: 'Access key revoked', accessKey });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  getAllAccessKeys : async (req, res) => {
      
    try {
      const accessKeys = await AccessKey.find();
      res.status(200).json({ accessKeys: accessKeys });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  checkActiveKey : async (req, res) => {
    try {
      const { email } = req.params;
      const accessKey = await AccessKey.findOne({ email, keyStatus: 'active' });
      console.log(accessKey)
      if (!accessKey) {
        return res.status(404).json({ message: 'No Active Access Key Found' });
      }
      res.status(200).json({ accessKey: accessKey });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
,  
  checkKeyExpiry: async (req, res) => {
    // Scheduler to update keyStatus to 'expired' every 24 hours
    res.send("running too")
    try {
      const now = new Date();
      const expiredKeys = await AccessKey.updateMany(
        { expiresAt: { $eq: now }, keyStatus: 'active' },
        { $set: { keyStatus: 'expired' } }
      );
      console.log(`Updated ${expiredKeys.nModified} keys to expired status.`);
    
    } catch (error) {
      console.error('Error updating keys:', error);
    }
  }

  
}

module.exports = accessKeyController
