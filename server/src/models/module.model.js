import {Schema,model} from 'mongoose';

const moduleSchema = new Schema({
    title:{
        type:String,
        trim:true,
        required:true,
    },
    cource:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Cource',
        required:true,
    },
    video:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Video',
        required:true,
    }],
    order:{
        type:Number,
    },
},{timestamps:true});

const Module = model('Module',moduleSchema);
export default Module;