import {Letter} from '../data-service/models';
import _ from 'lodash';
import mongooseConfig from '../../config/mongoose.json';
import {Router} from 'express';

const router = Router();

function promiseMessageList(query) {
    let criteria = _.omit(query, ['sort', 'skip', 'limit']);
    /**
     * If a string is passed, it must be a space delimited list of path names. The
     * sort order of each path is ascending unless the path name is prefixed with -
     * which will be treated as descending.
     */
    let sort = query.sort;
    let skip = query.skip;
    let limit = query.limit || mongooseConfig.paginationDefaultLimit;
    return Letter.find(criteria)
        .lean()
        .select('title annotation sendTimestamp receiveTimestamp')
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .exec();
}

function promiseMessage(id) {
    return Letter.findById(id)
        .populate({
            path: 'senderAddress',
            select: '_id content'
        })
        .populate({
            path: 'receiverAddress',
            select: '_id content'
        })
        .populate({
            path: 'senderPerson',
            select: '_id fio'
        })
        .populate({
            path: 'receiverPerson',
            select: '_id fio'
        })
        .lean()
        .exec();
}

function promiseMessagePost(message) {
    return Letter.create(_.omit(message, '_id'));
}

function promiseMessagePut(message) {
    return Letter.findByIdAndUpdate(message._id, _.omit(message, '_id'), {
        new: true,
        upsert: false,
        runValidators: true,
        setDefaultsOnInsert: true
    })
        .exec();
}

function promiseMessageRemove(id) {
    return Letter.findByIdAndRemove(id)
        .exec();
}

function sendResult(req, res) {
    return function (result) {
        res.json({
            params: req.params,
            result: result
        });
    };
}

router.get('/:id', function (req, res) {
    promiseMessage(req.params.id)
        .then(sendResult(req, res));
});

router.route('/')
    .get(function (req, res) {
        promiseMessageList(req.params)
            .then(sendResult(req, res));
    })
    .post(function (req, res) {
        promiseMessagePost(req.body)
            .then(sendResult(req, res));
    })
    .put(function (req, res) {
        promiseMessagePut(req.body)
            .then(sendResult(req, res));
    })
    .delete(function (req, res) {
        promiseMessageRemove(req.params.id)
            .then(function (result) {
                res.send(204, {
                    params: req.params,
                    items: result
                });
            });
    });

export default router;