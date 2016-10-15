import {Router} from 'express';
import path from 'path';
import passport from 'passport';

const router = Router();

router.route('/')
    .get((req, res)=> {
        if (req.user) {
            return res.redirect(302, '/logout');
        }
        res.sendFile(path.join(__dirname, '../login.html'));
    })
    .post(passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login'
    }));

export default router;