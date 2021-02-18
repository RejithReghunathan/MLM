const mongoose = require("mongoose");
const crypto = require('crypto')
const uuidv1 = require('uuid/v1')

var userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true,
    },
    lastname: {
      type: String,
      maxlength: 32,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    secured_password: {
      type: String,
      required: true,
    },
    salt: String,
    role: {
      type: Number,
      default: 0,
    },
  },
  {timestamps:true}
);

userSchema.virtual("password").set(function(password){
  this._password=password
  this.salt=uuidv1();
  this.secured_password = this.securePassword(password)
})
.get(function(){
  return this._password
})

userSchema.methods ={
  securePassword: function(plainpassword){
    if(!plainpassword) return "";
    try{
      return crypto.createHmac('sha256',this.salt)
      .update(plainpassword)
      .digest('hex')
    }
    catch(err){
      return "";
    }
  },
  authenticate: function(plainpassword){
    return this.securePassword(plainpassword) === this.secured_password
  }
}

module.exports = mongoose.model('User', userSchema)