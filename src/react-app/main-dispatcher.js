import EventEmitter from 'eventemitter3';

const eventKeys = [
    'USER_CHANGED'
];

const Event = {};
eventKeys.forEach(n => Event[n] = n);

const Dispatcher = new EventEmitter();

export {
    Event,
    Dispatcher
};