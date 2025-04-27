import {Schema, model} from 'mongoose';

const userSchema = new Schema({
    name:{
        type:string,
        required:true,
        trim:true
    },
    email:{
        type:string,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    password:{
        type:string,
        required:true
    },
    role:{
        type:string,
        enum:['student','trianer','admin'],
        default:student.Schema,
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

userSchema.pre('save',function(){
    this.updatedAt = Date.now();
    next()
});

const User = model('user',userSchema);
export default User;