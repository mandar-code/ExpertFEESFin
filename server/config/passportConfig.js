const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

const mongoose = require('mongoose');

var User = mongoose.model('User');

passport.use('user-local',
    new localStrategy({ usernameField: 'userid' },
        (username, password, done) => {
            User.findOne({ userid: username },
                (err, user) => {
                    if (err)
                        return done(err);
                    // unknown user
                    else if (!user)
                        return done(null, false, { message: 'This UserId is not registered' });
                    //no admin    
                    // else if (user.admin == true)    
                    //     return (null,false,{message:'No permission'});
                    // wrong password
                    else if (!user.verifyPassword(password))
                        return done(null, false, { message: 'Wrong password.' });
                    // authentication succeeded
                    else
                        return done(null, user);
                });
        })
);

passport.use('admin-local',
    new localStrategy({ usernameField: 'userid' },
        (username, password, done) => {
            User.findOne({ userid: username },
                (err, user,admin) => {
                    if (err)
                        return done(err);
                    // unknown user
                    else if (!user)
                        return done(null, false, { message: 'This UserId is not registered' });
                    else if (!user.admin == true)    
                        return done(null,false,{message:'No permission'});
                    // wrong password
                    else if (!user.verifyPassword(password))
                        return done(null, false, { message: 'Wrong password.' });
                    // authentication succeeded
                    else
                        return done(null, user);
                });
        })
);
