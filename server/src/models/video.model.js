import {Schema,model} from 'mongoose';

const videoSchema = new Schema({
    title:{
        type:String,
        trim:true,
        required:true,
        unique:true,
    },
    description:{
        type:String,
        trim:true,
    },
    url:{
        type:String,
        trim:true,
        required:true,
    },
    duration:{
        type:Number,
    },
    module:{
        type:Schema.Types.ObjectId,
        ref:'Module',
    },
    order:{
        type:Number,
        default:1,
    },
    progress:{
        type:Number,
        default:0,
    },

},{timestamps:true});

const Video = model('Video',videoSchema);
export default Video;