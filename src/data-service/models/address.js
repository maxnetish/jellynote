import mongoose from 'mongoose';

let addressSchema = new mongoose.Schema({
    content: {
        type: String
    },
    removed: {
        type: Boolean
    }
});

export default mongoose.model('Address', addressSchema);