const mongoose = require('mongoose');
const userSchema = require('../Schema/user');

const User = mongoose.model('user',userSchema);

module.exports = User;