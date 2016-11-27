import {Router} from 'express';

const router = Router();

router.route('/')
    .get((req, res) => res.json(req.user || {}));

export default router;