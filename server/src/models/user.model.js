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
        enum:['student','trianer','admin'],
        default:'student',
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
    updatedAt:{
        type:Date,
        dafault:Date.now,
    },
});

userSchema.pre('save',function(next){
    this.updatedAt = Date.now();
    next()
});

const User = model('user',userSchema);
export default User;