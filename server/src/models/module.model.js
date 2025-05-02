import {Schema,model} from 'mongoose';

const moduleSchema = new Schema({
    title:{
        type:String,
        trim:true,
        required:true,
        unique:true,
    },
    cource:{
        type:Schema.Types.ObjectId,
        ref:'Cource',
        required:true,
    },
    video:[{
        type:Schema.Types.ObjectId,
        ref:'Video',
    }],
    order:{
        type:Number,
        default:1,
    },
},{timestamps:true});

//delete all related videos after deletion of a given module
moduleSchema.pre('findOneAndDelete',async function (next){
    try{
        const moduleId = this.getQuery()._id;
        await model('Video').deleteMany({module:moduleId});
        next();
    }catch(error){
       next(error);
    }
});

const Module = model('Module',moduleSchema);
export default Module;