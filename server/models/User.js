// const mongoose = require('mongoose')
import mongoose from "mongoose"
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 3,
    max: 20

  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    max: 50,
    unique: true
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 20
  },
  phone: {
    type: Number,
    required: true,
    min: 10
  }
},
{ timestamps: true }
)

const User = mongoose.model('User', UserSchema)

// module.exports = mongoose.model('User', UserSchema)
export default User
