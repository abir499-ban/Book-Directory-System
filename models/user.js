const {Schema,model} = require('mongoose');
const {randomBytes, createHmac} = require('crypto');
const {z} = require('zod');

const UserSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    gender:{
        type:String,
        enum:["Male", "Female"],
        required:true
    },
    birthdayDate:{
        type:Date,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    salt:{
        type:String,
    },
    enableCookies:{
        type:Boolean,
        default:false,
    },
    role:{
        type:String,
        default:"ADMIN"
    },
    
},{
    timestamps:true
})


const UservalidateSchema = z.object({
    name: z.string().min(4,'Name must be at least 4 characters long').max(50, 'Name cannot be more than 50 characters'),
    email: z.string().email('Enter a valid email'),
    password: z.string().min(6, 'Password length must be at least 6'),
    gender: z.string(),
    birthdayDate: z.date("Enter a valid Date")
}) 


UserSchema.pre('save', function(next){
    const user  = this;
    if(!user.isModified('password')) return;

    const salt = randomBytes(16).toString();
    const hashedpassword = createHmac('sha256', salt)
    .update(user.password)
    .digest('hex');

    this.password = hashedpassword;
    this.salt = salt;
    next();
})

const User = model("user", UserSchema);

module.exports = {
    User,
    UservalidateSchema,
}
