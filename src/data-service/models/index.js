// import mongoose from 'mongoose';

// import mongooseConfig from '../../../config/mongoose.json';

// mongoose.connect(mongooseConfig.connectionUri, mongooseConfig.connectionOptions);

import MessageModel from './message';
import AddressModel from './address';
import PersonModel from './person';

export {
    MessageModel as Message,
    AddressModel as Address,
    PersonModel as Person
}