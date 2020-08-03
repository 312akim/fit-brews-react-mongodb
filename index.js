// const cors = require('./cors');
const cors      = require('cors');
const express   = require("express"),
      session   = require("express-session"),
      dotenv    = require("dotenv").config(),
      bcrypt    = require("bcryptjs"),
      passport  = require("passport"),
      mongo     = require("mongodb");

      const router       = express.Router()
      ,initPassport = require("./passportconfig.js")
      //   ,initRouter   = require("./routes.js")
      ;
      
      
      
      
var database, userCollection;
const MONGO_CONNECTION = process.env.MONGO;
      
      
const app = express();

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 
  }

  app.use(cors(corsOptions));


app.use(express.urlencoded({ extended: false }));
app.use(
    session({
        secret: "TEST",
        resave: false,
        saveUninitialized: false
    })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(router);

app.post("/register", async (req, res) => {

    console.log("helloooo");

    console.log(req.body);


    // try {
    //     userCollection.find({$or:[{username:req.body.username},{email:req.body.email}]}).toArray(async (err,resdb)=>{
    //         if(resdb.length === 0){
    //             const hashedPassword = await bcrypt.hash(req.body.password.trim(), 10);

    //             const newUser = {username: req.body.username.trim(),
    //                              password: hashedPassword,
    //                              email:    req.body.email.trim()};

    //             userCollection.insertOne(newUser, (err_addUser, res_addUser) =>{
    //                 if (err_addUser) throw err_addUser;

    //                 console.log("New user added to db...");
    //                 console.log(res_addUser.ops);
    //                 return res.redirect("/login");
    //             });
    //         }
    //         else return res.status(409).send({Error:"Username or email already in use"});//409:Conflict
    //     });
    // } catch {
    //     res.redirect("/register");
    // }
});




app.post(
    "/login",
    checkNotAuthenticated,
    passport.authenticate("local", {
        successRedirect: "/loggedpage",
        failureRedirect: "/failPage"
    })
);


//Checks if the user is not authenticated
function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect("/");
    }
    next();
}


//Checks that the user is authenticated
function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}


//Logout user
app.get("/logout", (req, res) => {
    req.logOut();
    return res.redirect();
});



app.listen(process.env.PORT || 5000, function() {
    console.log("Server has started...");

    mongo.connect(MONGO_CONNECTION, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            console.log(error);
            throw error;
        }
        database = client.db('healthapp');
        userCollection = database.collection("user");

        // initRouter(router, checkAuthenticated, checkNotAuthenticated);
        initPassport(passport, userCollection);

        console.log("Connected to database!");
    });
});
