import { Schema, model, Document } from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

interface UserDocument extends Document {
    username: string;
    email: string;
    password: string;
    forgotPasswordToken: string;
    forgotPasswordExpiry: Date;
    
    generateJWTToken: () => Promise<string>;
    comparePassword: (plainTextPassword: string) => Promise<boolean>;
    generatePasswordResetToken: () => Promise<string>;
}

const userSchema = new Schema<UserDocument>({
    username: {
        type: String,
        required: [true, 'Name is required'],
        minLength: [5, 'Name must be at least 5 characters'],
        maxlength: [30, 'Name cannot exceed 30 characters'],
        lowercase: true,
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        lowercase: true,
        trim: true,
        unique: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please fill a valid email address'
        ]
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: [8, 'Password must be at least 8 characters'],
        maxlength: [50, 'Password cannot exceed 24 characters'],
        select: false
    },
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,
    }, {
    timestamps: true
});

userSchema.pre<UserDocument>('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.generateJWTToken = async function () {
    return await jwt.sign(
        { id: this._id, email: this.email, subscription: this.subscription },
        process.env.JWT_SECRET!,
        {
            expiresIn: process.env.JWT_EXPIRY
        }
    );
};

userSchema.methods.comparePassword = async function (plainTextPassword: string) {
    return await bcrypt.compare(plainTextPassword, this.password);
};

userSchema.methods.generatePasswordResetToken = async function () {
    const resetToken = crypto.randomBytes(20).toString('hex');

    this.forgotPasswordToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

    this.forgotPasswordExpiry = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes from now

    return resetToken;
};

const User = model<UserDocument>('User', userSchema);

export default User;
