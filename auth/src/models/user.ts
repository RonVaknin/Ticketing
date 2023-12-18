import mongoose from "mongoose";
import { Password } from "../services/password";

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
interface UserDoc extends mongoose.Document {
    email: string;
    password: string;
};


const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        }
    },
    {
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.password;
                // delete ret.__v
            },
            versionKey: false
        }
    }
);

//function keyword does not override "this", do not use arrow function
userSchema.pre('save', async function name(done) {
    if (this.isModified('password')) {
        const hashed = await Password.toHash(this.get('password'));
        this.set('password', hashed);
    }

    done();
})

userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs);
}

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };