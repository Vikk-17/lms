import {Schema,model} from 'mongoose';

const videoSchema = new Schema({
    title:{
        type:String,
        trim:true,
        required:true,
    },
    description:{
        type:String,
        trim:true,
    },
    url:{
        type:string,
        trim:true,
        required:true,
    },
    duration:{
        type:Number,
    },
    module:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Module',
    },
    order:{
        type:Number,
    },
    progress:{
        type:Number,
    },

},{timestamps:true});

const Video = model('Video',videoSchema);
export default Video;