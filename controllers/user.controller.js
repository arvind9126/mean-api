const mongoose = require('mongoose');
const passport = require('passport');
const User = mongoose.model('User')
const _ = require('lodash')

module.exports.register = (req, res, next) => {
    const user = new User();
        user.first_name = req.body.first_name;
        user.last_name = req.body.last_name;
        user.email = req.body.email;
        user.mobile = req.body.mobile;
        user.password = req.body.password;
        user.save((err, doc) => {
            if (!err)
            res.send(doc)
            else
            {
                if (err.code == 11000)
                res.status(422).send(['Duplicate email address'])
                else
                return next(err)
            }
        })

}


module.exports.authenticate = (req, res, next) => {
    //call for passport authentication
    passport.authenticate('local', (err, user, info) => {
        //error from passport middleware
        if (err) return res.status(400).json(err)
        //registered user
        else if (user) return res.status(200).json({"token": user.generateJwt()})
        //unkown user or wrong password
        else return res.status(404).json(info)
    })(req, res)
}


module.exports.userprofile = (req, res, next) => {
    User.findOne({_id: req._id},
        (err, user) => {
            if (!user)
            return res.status(404).json({status: false, message:'User Record not found'})
            else
            return res.status(200).json({status: true, user: _.pick(user,['first_name', 'last_name', 'email', 'mobile'])})
        })
}