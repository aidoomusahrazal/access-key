const mongoose = require('mongoose');

const accessKeySchema = new mongoose.Schema({
  key: { type: String, required: true },
  email: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, required: true },
  keyStatus: { type: String, enum: ['active', 'expired', 'revoked'], default: 'active' }
});


accessKeySchema.pre('save', function (next) {
  if (!this.expiresAt) {
    const now = new Date();
    this.expiresAt = new Date(now.setMonth(now.getMonth() + 1));
  }
  next();
});

const AccessKey = mongoose.model('AccessKey', accessKeySchema);

module.exports = AccessKey;
