import {Schema, model} from 'mongoose';


const studentSchema = new Schema({
    _id:{
        type:Schema.Types.ObjectId,
        ref:'User',
    },
    enrolledCources:[{
        type:Schema.Types.ObjectId,
        ref:'Cource',
    }],
    dob:{
        type:Date,
    },
    wishList:[{
        type:Schema.Types.ObjectId,
        ref:'Cource',
    }],
});

const Student = model('Student', studentSchema);
export default Student;
