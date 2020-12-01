var express=require('express')
var path=require('path')
var expressHbs=require('express-handlebars')
var cookieParser=require('cookie-parser')
var bodyParser=require('body-parser')
var passport=require('passport')
var mongoose=require('mongoose')
var flash=require('connect-flash')
var validator=require('express-validator')
var session=require('express-session')
var MongoStore=require('connect-mongo')(session)

require('./config/passport')
require('dotenv').config({path:__dirname+'/.env'})
var AdminRoutes=require('./routes/admin')
var UserRoutes=require('./routes/user')
var routes = require('./routes/index');
var app=express()
var uri = process.env['URI'];

mongoose.connect(uri,{useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true  });
app.engine('.hbs', expressHbs({defaultLayout: 'layout', extname: '.hbs'}));
app.set('view engine', '.hbs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(validator())
app.use(cookieParser())
app.use(session({secret:'mylongsecret!!!12345',
resave:false,
saveUninitialized:false,
}))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())
app.use(express.static(path.join(__dirname, 'public')));
// app.use(favicon(path.join(__dirname, 'public','images', 'favicon.ico')));

app.use(function(req,res,next){
    res.locals.login=req.isAuthenticated()
    res.locals.session=req.session
    next()
})

app.use('/user',UserRoutes)
app.use('/admin',AdminRoutes)
app.use('/', routes);
app.use(function(req,res,next){
    res.locals.login=req.isAuthenticated()
   
    next()
  })
var port=process.env.PORT||2222

if(process.env.NODE_ENV==='production'){
    app.use(express.static('build'))
}

app.listen(port,()=>{
    console.log(`Server Running on ${port}`)
})