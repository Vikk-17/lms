import {Schema,model} from 'mongoose';

const courceSchema = new Schema({
    title:{
        type:String,
        trim:true,
        required:true,
        unique:true,
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
        type:Schema.Types.ObjectId,
        ref:'Instructor',
        required:true,
    },
    module:[{
        type:Schema.Types.ObjectId,
        ref:'Module',
        required:true,
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
    },

},{timestamps:true});



//delete all related modules and videos after deletion of cource
courceSchema.pre('findOneAndDelete', async function (next){
    try{
        const courceId = this.getQuery()._id;
        const modules = await model('Module').find({cource:courceId});
        const modulesIds = modules.map(m=>m._id);
        await model('Video').deleteMany({module:{$in:modulesIds}});
        await model('Module').deleteMany({cource:courceId});
        next();
    }catch(error){
        next(error);
    }
});


const Cource = model('Cource',courceSchema);
export default Cource;