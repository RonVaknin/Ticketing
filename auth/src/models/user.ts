import mongoose from "mongoose";

//new user properties
interface UserAttrs {
    email: string;
    password: string;
};

//user model properties
interface UserModel extends mongoose.Model<any> {
    build(attrs: UserAttrs): UserDoc;
}

// type UserDoc = mongoose.Document & UserAttrs;
interface UserDoc extends mongoose.Document{
    email: string;
    password: string;
};


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true    
    }
});

userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs);
}

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export {User};