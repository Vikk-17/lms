import {Schema,model} from 'mongoose';

const instructorSchema = new Schema({
    _id:{
        type:Schema.Types.ObjectId,
        ref:'User',
    },
    specializations:{
        type:[String],
    },
    experience:{
        type:Number,
        min:0,
    },
    certificates: [
        {
          name:{type:String,trim:true},
          url: {type:String,trim:true}
        },
      ],
    socialLinks: {
        linkedin: { type: String, trim: true },
        github: { type: String, trim: true },
        twitter: { type: String, trim: true },
        personalWebsite: { type: String, trim: true },
      },
    courcesUploaded:[{
        type:Schema.Types.ObjectId,
        ref:'Cource',
      }],
    isVerified:{
        type:Boolean,
        default:false,
  }
});

const Instructor = model('Instructor',instructorSchema);
export default Instructor;