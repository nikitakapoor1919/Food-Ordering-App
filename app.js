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

var AdminRoutes=require('./routes/admin')
var UserRoutes=require('./routes/user')
var routes = require('./routes/index');
var app=express()
var uri="mongodb+srv://nikita:1998Nikita@1998@cluster0.4zyob.mongodb.net/FoodOrder?retryWrites=true&w=majority"
// mongoose.connect('mongodb://localhost:27017/FoodOrder', {useNewUrlParser: true});
mongoose.connect(uri,{useNewUrlParser: true, useCreateIndex: true });
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

app.listen(2222,()=>{
    console.log('Server Running on http://localhost:2222')
})