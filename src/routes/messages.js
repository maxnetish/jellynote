import {Message} from '../data-service/models';
import _ from 'lodash';

function promiseMessageList(query) {
    return Message.find(query)
        .exec();
}

function promiseMessagePost(message) {
    return Message.create(_.omit(message, '_id'));
}

function promiseMessagePut(message) {
    return Message.findByIdAndUpdate(message._id, _.omit(message, '_id'), {
        new: true,
        upsert: false,
        runValidators: true,
        setDefaultsOnInsert: true
    })
        .exec();
}

function promiseMessageRemove(id) {
    return Message.findByIdAndRemove(id)
        .exec();
}

function sendResult(req, res) {
    return function (result) {
        res.send({
            params: req.params,
            items: result
        });
    };
}

export default function (app) {
    app.get({
        name: 'messages list',
        path: '/messages'
    }, function (req, res, next) {
        promiseMessageList(req.params)
            .then(sendResult(req, res))
            .catch(next);
    });
    app.post({
        name: 'message add',
        path: '/message'
    }, function (req, res, next) {
        promiseMessagePost(req.body)
            .then(sendResult(req, res))
            .catch(next);
    });
    app.put({
        name: 'message update',
        path: '/message'
    }, function (req, res, next) {
        promiseMessagePut(req.body)
            .then(sendResult(req, res))
            .catch(next);
    });
    app.del({
        name: 'message remove',
        path: '/message'
    }, function (req, res, next) {
        promiseMessageRemove(req.params.id)
            .then(function(result) {
                res.send(204, {
                    params: req.params,
                    items: result
                });
                return next();
            })
            .catch(next);
    });
};