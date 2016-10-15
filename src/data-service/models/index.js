// import mongoose from 'mongoose';

// import mongooseConfig from '../../../config/mongoose.json';

// mongoose.connect(mongooseConfig.connectionUri, mongooseConfig.connectionOptions);

import LetterModel from './letter';
import AddressModel from './address';
import PersonModel from './person';

export {
    LetterModel as Letter,
    AddressModel as Address,
    PersonModel as Person
}