const express = require('express')
const mongoose = require("mongoose");
//const session = require('express-session');
//const MongoStore = require('connect-mongodb-session')(session);
const cors = require('cors');
const app = express()
const passport = require('passport');
const http = require('http')
const AppRoutes = require('./backend/routes/users');
const env = require('./backend/config/env');

const port = process.env.PORT || 5000;

app.use(cors());
// app.use('/login', (req, res) => {
//     res.send({
//         token: 'test123'
//     })
// })

mongoose
  .connect(env.MONGOURI,
    {
     
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then(() => {
    console.log("The mongoose database is connected");
  });
  
//   app.use(session({
//     name: "myname.sid",
//     resave:false,
//     saveUninitialized:false,
//     secret:'PsyX7lk63g',
//     cookie:{
//       maxAge:36000000,
//       httpOnly:false,
//       secure:false
//     },
//     store: new MongoStore({ mongooseConnection: mongoose.connection })
//   }));

  app.use(passport.initialize())
  app.use(passport.session())

const server = http.createServer(app)
app.use(express.json());
app.use("/users", AppRoutes);
if(process.env.NODE_ENV=="production"){
  app.use(express.static('frontend/build'))
  const path = require('path')
  app.get("*",(req,res)=>{
      res.sendFile(path.resolve(__dirname,'frontend','build','index.html'))
  })
} else{
  app.get('/', (req, res) => {
    res.send("Server up and running!")
})
}
server.listen(port, () => {
    console.log("Server Started at port " + port);
    console.log("http://localhost:" + port);
})