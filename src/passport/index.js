import {Strategy} from 'passport-local';
import authConfig from '../../config/auth.json';


const localStrategy = new Strategy((username, password, done) => {
    let findedUser = authConfig.find(elem => {
        return elem.userName === username;
    });

    if (!findedUser) {
        return done(null, false);
    }

    if (findedUser.password !== password) {
        return done(null, false);
    }

    return done(null, findedUser);
});

function setupPassport(passport) {
    passport.use(localStrategy);

    passport.serializeUser(function (user, done) {
        done(null, user.userName);
    });

    passport.deserializeUser(function (id, done) {
        let findedUser = authConfig.find(elem => {
                return elem.userName === id;
            }) || {};
        if (findedUser && findedUser.hasOwnProperty('password')) {
            delete findedUser.password;
        }
        done(null, findedUser);
    });

    return passport;
}

export {
    setupPassport
};