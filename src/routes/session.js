import {Router} from 'express';

const router = Router();

router.route('/')
    .get((req, res)=> {
        if (!req.user) {
            return res.json({});
        }
        res.json({
            username: req.user
        });
    });

export default router;