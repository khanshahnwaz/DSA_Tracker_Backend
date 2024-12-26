import mongoose from 'mongoose'
import {DSASchema} from './DSA.js';
const UserSchema= new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    dsa:[DSASchema]
    

})

const User=mongoose.model('User',UserSchema)
export default User;