import {Router} from 'express';
import path from 'path';

const router = Router();

router.route('/')
    .get(function (req, res) {
        res.sendFile(path.join(__dirname, '../logout.html'));
    })
    .post(function(req, res){
        req.logout();
        res.redirect(302, '/');
    });

export default router;