import { Document, Schema, model } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

interface User extends Document {
    username: string;
    name: string;
    passwordHash: string;
    email: string;
}

const userSchema: Schema<User> = new Schema<User>(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            minlength: 3,
        },
        name: String,
        passwordHash: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
    },
    {
        timestamps: true,
    },
);

userSchema.plugin(uniqueValidator);

userSchema.set("toJSON", {
    transform: (document: any, returnedObject: any) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;

        // the passwordHash should not be revealed
        delete returnedObject.passwordHash;
    },
});

const UserModel = model<User>("User", userSchema);

export default UserModel;
