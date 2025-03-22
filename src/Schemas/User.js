import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const Userschema = new mongoose.Schema({
    username:{
        required:true,
        type:String
    },
    email: {
        type: String,
        required: [true, "Email required"],
        unique: true,
        validate: {
            validator: function (emailValue) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailValue);
            },
            message: 'Invalid email format'
        }
    },
    password: {
        type: String,
        required: [true, "password is required"]
    },
    avatar:{
        type:String,
    },
    Interviews:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Interview"
        }
    ]
} , {timestamps:true});

Userschema.pre('save', async function (next) {
    const user = this;
    user.avatar = `https://robohash.org/${user.username}`;

    if (!user.isModified("password")) return next();
    try {
        const salt = await bcrypt.genSalt(10); 
        user.password = await bcrypt.hash(user.password, salt);
        next();
    } catch (err) {
        next(err);
    }
})

const User = mongoose.model("User" , Userschema);

export default User;