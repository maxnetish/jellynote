import {Router} from 'express';
import passport from 'passport';

const router = Router();

router.route('/')
    .get((req, res) => res.json(req.user || {}));

// data should be x-www-form-urlencoded
router.route('/login')
    .post(passport.authenticate('local'), (req, res) => {
        res.send(204); //No Content (success), else will be 401 Unauthorized
    });

router.route('/logout')
    .post((req, res) => {
        req.logout();
        res.send(204); //No Content (success)
    });

export default router;