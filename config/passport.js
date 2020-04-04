var passport=require('passport')
var User=require('../models/user')
var  LocalStrategy=require('passport-local').Strategy
var bcrypt = require('bcrypt-nodejs');

passport.serializeUser(function(user,done){
    done(null,user.id)
})

passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        done(err,user)
    })
})

passport.use('local.signup',new LocalStrategy ({
    usernameField:'email',
    passwordField:'password',
    passReqToCallback:true
},function(req,email,password,done){
    req.checkBody('email','Invalid Email').notEmpty()
    req.checkBody('password','Invalid Password').notEmpty().isLength({min:4})
    var errors=req.validationErrors()
    if(errors)
    {
        var message=[]
        errors.forEach(function(error){
            message.push(error.msg)
        })
        return done(null,false,req.flash('error',message))
    }
    User.findOne({'email':email},function(err,user){
        if(err)
        return done(err)
        if(user)
        return done(null,false,{message:'Email already in use.'})

        var newUser=new User()
        newUser.email=email
        newUser.password=newUser.encryptPassword(password)
        newUser.save(function(err,result){
            if(err)
            return done(err)
            return done(null,newUser)
        })
    })
}))
passport.use('local.signin',new LocalStrategy ({
    usernameField:'email',
    passwordField:'password',
    passReqToCallback:true
},function(req,email,password,done){
    req.checkBody('email','Invalid Email').notEmpty().isEmail()
    req.checkBody('password','Invalid Password').notEmpty().isLength({min:4})
    var errors=req.validationErrors()
    if(errors)
    {
        var message=[]
        errors.forEach(function(error){
            message.push(error.msg)
        })
        return done(null,false,req.flash('error',message))
    }
    User.findOne({'email':email},function(err,user){
        if(err)
        return done(err)
        if(!user)
        return done(null,false,{message:'No User Found.'})
       
        if(!bcrypt.compareSync(password, user.password)){
            return done(null, false, { message: 'Password is wrong. Please, try with correct credentials.'});
          }
        return done(null,user)
    })
}))