import mongoose from 'mongoose';

let letterSchema = new mongoose.Schema({
    contentMd: {
        type: String
    },
    title: {
        type: String
    },
    annotation: {
        type: String
    },
    sendTimestamp: {
        type: Number,
        index: true
    },
    receiveTimestamp: {
        type: Number,
        index: true
    },
    senderAddress: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address'
    },
    receiverAddress: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address'
    },
    senderPerson: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Person'
    },
    receiverPerson: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Person'
    },
    media: [
        {
            url: String,
            title: String,
            type: String
        }
    ],
    tags: {
        type: [String],
        index: true
    }
});

export default mongoose.model('Letter', letterSchema);