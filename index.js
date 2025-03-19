const express = require('express')
const app = express();

const session = require('express-session');
const passport = require('passport')
const localStrategy = require('passport-local').Strategy

const path = require('path');
const server = require('http').Server(app); 
const fs = require('fs');

const { socketConnection,sendMessage } = require('./utility/io');

const cors = require('cors'); 
const flash = require('req-flash');
const bodyParser = require('body-parser');
const port = 4000;
const constanta = require('./utility/const')

const workflowsController = require('./controller/workflowsController')

// setup my socket server

app.use(cors({
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}))

//allowed request data format
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Configurasi middleware
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 't@1k0ch3ng',
  name: 'secretName',
  cookie: {
      sameSite: true,
      maxAge: 60000
  },
}))

app.use(passport.initialize()) 
app.use(passport.session())    
app.use(flash());

authUser = (user, password, done) => {
  console.log(`Value of "User" in authUser function ----> ${user}`)         //passport will populate, user = req.body.username
  console.log(`Value of "Password" in authUser function ----> ${password}`) //passport will popuplate, password = req.body.password
  let authenticated_user = { id: 123, name: "Kyle"} 
  return done (null, authenticated_user ) 
}

passport.use(new localStrategy (authUser))

passport.serializeUser( (user, done) => { 
  console.log(`--------> Serialize User`)
  console.log(user)     
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  console.log("---------> Deserialize Id")
  console.log(id)
  done (null, {name: "Kyle", id: 123} )      
}) 

//ejs part
app.engine('.ejs', require('ejs').__express);
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname+'/public/frontend/index.html'));
})

app.post ("/login", passport.authenticate('local', {
  successRedirect: "/dashboard",
  failureRedirect: "/login",
}))


//routes
//static page
app.use(express.static('public'));

app.use("/assets", express.static(__dirname + "/public/frontend/assets"));


app.get('/doc', (req, res) => {
  res.sendFile(path.join(__dirname+'/public/doc/index.html'));
});

app.get('/docs', (req, res) => {
  res.sendFile(path.join(__dirname+'/public/doc/doc.html'));
});

app.get('/', (req, res) => {
  
  res.sendFile(path.join(__dirname+'/public/frontend/index.html'));
});

//modules:
app.get('/account', (req, res) => {
  res.render('main', {page:'account'});
});


app.get('/affiliate', (req, res) => {
  
  //res.render('main', {page:'affiliats'});
});

app.get('/billing', (req, res) => {
  
  //res.render('main', {page:'billings'});
});

app.get('/calendars', (req, res) => {
  res.render('main', {page:'calendars'});
});

app.get('/connections', (req, res) => {
  res.render('main', {page:'connections'});
});

app.get('/templates', (req, res) => {
  res.render('main', {page:'templates'});
});

app.get('/workflows', (req, res) => {
  res.render('main', {page:'workflows'});
  
});

//page login facebook
app.get('/facebook/:state', (req, res) => {
  res.render('chanel/facebook', {state:req.params.state});
  
});


//RENDER COMPONENT with dynamic ejs file baed on name
app.get('/connections/:comp', (req, res) => {
  let file =path.join(__dirname+'/views/connections/'+req.params.comp+'.ejs')
  if (fs.existsSync(file)) {
    res.render('connections/'+req.params.comp);
  } else {
    res.render('components/error_component');
  }
  
});


//  REST API
app.get('/api/v1/health',(req,res)=>{
  res.status(200).json({
    "status"  : true,
    "message" : "Ok"
  })
})
const userRouter = require('./routes/users')
app.use('/api/v1/users',cors(),userRouter)

const calendarRouter = require('./routes/calendars');
app.use('/api/v1/calendars',calendarRouter);

const connectionRouter = require('./routes/connections');
app.use('/api/v1/connections',connectionRouter);

const master_connectionRouter = require('./routes/master_connections');
app.use('/api/v1/master_connections',master_connectionRouter);


const workflowRouter = require('./routes/workflows');
app.use('/api/v1/workflows',workflowRouter);

const templateRouter = require('./routes/templates');
app.use('/api/v1/templates',templateRouter);


//chanel

const chanelRouter = require('./routes/chanel')
app.use('/chanel',cors(),chanelRouter)

server.listen(port, () => {
  console.log(`app running at http://localhost:${port}`)
})

//socketConnection(server)