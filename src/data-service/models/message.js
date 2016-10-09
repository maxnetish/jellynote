import mongoose from 'mongoose';

let messageSchema = new mongoose.Schema({
    contentMd: {
        type: String
    },
    sendDate: {
        type: Date
    }
});

export default mongoose.model('Message', messageSchema);