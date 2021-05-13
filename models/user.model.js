const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({

    first_name: {
        type: String,
        required: true
    },

    last_name:{
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    mobile: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
        minlength: [8, 'password must be atleast 8 character long']
    },

    saltSecret: String
})

//custom validation for email
userSchema.path('email').validate((val) => {
    var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailRegex.test(val); // Assuming email has a text attribute
 }, 'Invalid Email')

//Events
userSchema.pre('save', function (next){
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            this.password = hash
            this.saltSecret = salt
            next()
        })
    })
})

//methods
userSchema.methods.verifyPassword = function (password){
    return bcrypt.compareSync(password, this.password)
}

userSchema.methods.generateJwt = function (){
    return jwt.sign({ _id: this._id},
        process.env.JWT_SECRET,
    {   
        expiresIn: process.env.JWT_EXP

    })
}

mongoose.model('User', userSchema)