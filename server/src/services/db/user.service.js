import User from "../../models/user.model.js";
import bcrypt from "bcryptjs";
import Student from "../../models/student.model.js";
import Admin from "../../models/admin.model.js";
import Instructor from "../../models/instructor.model.js";


export const findUserByEmail = async (email)=>{
    return await User.findOne({email});
};

export const insertUser = async (data)=>{
    try{
        const {password} = data;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        const newUser = new User({...data,password:hashedPassword});
        if(newUser.role==='student'){
            const newStudentUser = new Student({_id:newUser._id,...data});
            return await newStudentUser.save() && await newUser.save() && (await newStudentUser.save()).populate('_id');
        } else if(newUser.role==='trainer'){
            const newInstructorUser = new Instructor({_id:newUser._id,...data});
            return await newInstructorUser.save() && await newUser.save() && (await newInstructorUser.save()).populate('_id');
        }else{
            const newAdminUser = new Admin({_id:newUser._id,...data});
            return await newAdminUser.save() && await newUser.save() && (await newAdminUser.save()).populate('_id');            
        }
    } catch(error){
        throw error.message;
    }
    
};

