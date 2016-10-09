import mongoose from 'mongoose';

let personSchema = new mongoose.Schema({
    fio: {
        type: String
    },
    comment: {
        type: String
    },
    media: [
        {
            url: String,
            title: String
        }
    ],
    DOBtimestamp: {
        type: Number
    },
    placeOfBirth: {
        type: String
    },
    DODtimestamp: {
        type: Number
    },
    removed: {
        type: Boolean
    }
});

export default mongoose.model('Person', personSchema);