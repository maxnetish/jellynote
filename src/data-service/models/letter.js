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
        ref: 'Address',
        adminFieldType: 'ref'
    },
    receiverAddress: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address',
        adminFieldType: 'ref'
    },
    senderPerson: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Person',
        adminFieldType: 'ref'
    },
    receiverPerson: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Person',
        adminFieldType: 'ref'
    },
    // Это потом
    // GridFS будет
    // media: [
    //     {
    //         url: String,
    //         title: String,
    //         type: String
    //     }
    // ],
    tags: {
        type: [String],
        index: true
    }
});

export default mongoose.model('Letter', letterSchema);