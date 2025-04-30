import {Schema, model} from 'mongoose';

const userSchema = new Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['student','trainer','admin'],
        default:'student',
        required:true,
    },
    profile:{
        type:String,
        trim:true,
    },
    phone:{
        type:String,
    },
    address:{
        street:{type:String,trim:true},
        city:{type:String,trim:true},
        state:{type:String,trim:true},
        pincode:{type:String,trim:true},
        country:{type:String,trim:true},
    },
    bio:{
        type:String,
        trim:true,
    },
    isActive:{
        type:Boolean,
        required:true,
        default:true,
    }
},{timestamps:true});


const User = model('User',userSchema);
export default User;