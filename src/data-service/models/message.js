import mongoose from 'mongoose';

let messageSchema = new mongoose.Schema({
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
        type: Number
    },
    receiveTimestamp: {
        type: Number
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
    }
});

export default mongoose.model('Message', messageSchema);