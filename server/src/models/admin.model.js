import {Schema,model} from 'mongoose';

const adminSchema = new Schema({
    _id:{
        type:Schema.Types.ObjectId,
        ref:'User',
    },
    permissions:{
        type:[String],
        enum: ['manage_users', 'manage_courses','manage_admin', 'view_reports', 'edit_settings'],
        default:['manage_users','manage_courses','view_reports'],
    },
    isSuperAdmin:{
        type:Boolean,
        default:false,
    },
    lastLogin:{
        type:Date,
    },
})

const Admin = model('Admin',adminSchema);
export default Admin;