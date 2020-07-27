const LocalStratey = require('passport-local').Strategy,
      bcrypt       = require('bcryptjs'),
      mongo        = require("mongodb")
      ; 

function init(passport, userCollection){

    const  authUser = (username, password, done) => {

        userCollection.findOne({username}, async (err, user)=>{
            if (err) throw err;

            if (user == null) return done(null, false, {message: 'No user found'});
            try {
                if (await bcrypt.compare(password,user.password)){
                    return done(null, user);
                }
                else{
                    return done(null, false, {message:'Incorrect Password'})
                }
            } catch (e){
                return done(e)
            }
        });
        
        
    };

    passport.use(new LocalStratey({ usernameField: 'username'}, authUser));

    passport.serializeUser((user, done) => {
        return done(null, user._id)
    });

    passport.deserializeUser((id, done) => {

        const idObject = new mongo.ObjectID(id);

        userCollection.findOne({_id:idObject}, (err, user) => {
            if (err) return done(err);
            done(null, user);
        });
    });

}

module.exports = init;