var LocalStrategy = require('passport-local').Strategy;
const pool = require('./database');
const format = require('pg-format');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var config = require("./config")





module.exports = function (passport) {
    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },
        function (req, email, password, done) {

            //     console.log("Results email:", email);
            //    console.log("Results password:", password)

  
            if (email && password){
               email = email.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching
           
      
               process.nextTick(function () {
                // pool.connect(function (err, client) {
                //     if (err) {
                //         req.param.error = err.message;
                //         return done(null, false, req.flash('loginMessage', err.message));
                //     } else {
                        var ageQuery = format(`SELECT * from USERMASTER WHERE email='${email}'`);
                        //console.log(ageQuery);
                        pool.query(ageQuery, async function (err, result) {
                            if (err) {
                                var obj = {
                                    Status: 400,
                                    message: err.message
                                }
                                req.param.error = err.message;
                                return done(null, false, req.flash('loginMessage', err.message));
                            }
                            else {
                  
                                if (result.rows.length != 0) {

                                    var passwordIsValid = bcrypt.compareSync(password, result.rows[0].password);
                             

                                    if(passwordIsValid)
                                    {   

                                        if(result.rows[0].isverified){

                                        try {                                            
                                            
                                            
                                            var token = jwt.sign(result.rows[0], config.SECRET, {
                                                expiresIn: 86400 // expires 24 hours
                                            });
                                            result.rows[0].token=token;
                                            return done(null, result.rows[0]);
                                        } catch (e) {
                                            req.param.error = 'Token Creation Error';
                                            return done(null, false,req.flash('loginMessage','password does not match'));
                                        
                                           
                                        }
                                    }
                                    else{
                                        req.param.error = 'please verify your email address';
                                        return done(null, false,req.flash('loginMessage','please verify your email address'));
                                     
                                    }
                                       
                                    }
                                    else{
                                        req.param.error = 'password does not match';
                                        return done(null, false,req.flash('loginMessage','password does not match'));
                                    }
                                   
                                }
                                else {
                                    req.param.error = 'No user found';
                                    return done(null, false,req.flash('loginMessage','No user found'));
                                }



                            }

                        })
                //     }
                // });

            })

            }
            else{
                console.log("Email and password required")
                req.param.error = "Email and password required";
                return done(null, false, req.flash('loginMessage', "Email and password required"));
            }

            // asynchronous
            // process.nextTick(function() {
            //     User.findOne({ 'local.email' :  email }, function(err, user) {
            //         // if there are any errors, return the error
            //         if (err)
            //             return done(err);

            //         // if no user is found, return the message
            //         if (!user)
            //             return done(null, false, req.flash('loginMessage', 'No user found.'));

            //         if (!user.validPassword(password))
            //             return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));

            //         // all is well, return user
            //         else
            //             return done(null, user);
            //     });
            // });

        }));


        passport.use('auth', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
        },
            function (req, email, password, done) {

                console.log("EMAIL 1",email);
                console.log("password 1",password)
                return done(null, {auth:true});


            }))

}

