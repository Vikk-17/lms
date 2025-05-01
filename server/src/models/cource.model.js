import {Schema,model} from 'mongoose';

const courceSchema = new Schema({
    title:{
        type:String,
        trim:true,
        required:true,
    },
    subtitle:{
        type:String,
        trim:true,
    },
    description:{
        type:String,
        trim:true,
    },
    instructor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Instructor',
        required:true,
    },
    module:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Module',
    }],
    tag:{
        type:[String],
        default:[],
    },
    category:{
        type:String,
        trim:true,
        required:true,
    },
    language:{
        type:String,
        required:true,
    },
    progress:{
        type:Number,
        default:0,
    },

},{timestamps:true});

const Cource = model('Cource',courceSchema);
export default Cource;