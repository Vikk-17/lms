import {z} from 'zod';
const validTLDs = [
    'com', 'org', 'net', 'gov', 'edu', 'int', 'mil', 'co', 'io', 'ai', 'dev', 'us', 'in', 'eu', 'xyz', 'me', 'uk', 'ca', 'de', 'fr', 'jp'
  ];
  
export const registerSchema = z.object({
    name:z.string()
    .min(3, { message: "Username must be at least 3 characters" })
    .max(20, { message: "Username must be at most 20 characters" }),
    email:z.string().email().refine((email)=>{
        const domain = email.split('@')[1];
        const tld = domain.split('.').pop();
        return validTLDs.includes(tld);
    },{message:'invalid emailID'}),
    password:z.string().min(8,'Password must be at least 8 characters')
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, { message: "Password must contain at least one special character" }),
    role:z.enum(['student','trainer','admin']).optional(),
    confirmPassword: z.string(),
})
    .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: "Passwords don't match",
});

export const loginSchema = z.object({
    email:z.string().email().refine((email)=>{
        const domain = email.split('@')[1];
        const tld = domain.split('.').pop();
        return validTLDs.includes(tld);
    },{message:'invalid emailID'}),    
    password:z.string().min(8,'Password must be at least 8 characters'),
});