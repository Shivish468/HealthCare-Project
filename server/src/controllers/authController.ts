import { Request, Response, NextFunction } from 'express';
import { Document, Types } from "mongoose";
import AppError from "../utils/error.util.js";
import User from "../models/User.js";
import sendEmail from "../utils/sendEmail.js";
import crypto from 'crypto';

const signup = async (req: { body: { username: any; email: any; password: any; }; }, res: any, next: (arg0: AppError) => any) => {
    const {username, email, password} = req.body;

    if(!username || !email || !password) {
        return next(new AppError('Please fill all fields', 400));
    }

    const userExists = await User.findOne({email});

    if(userExists) {
        return next(new AppError(`User with ${email} already exists`, 409));
    }
    const user = await User.create({
        username: username,
        email: email,
        password: password
    });
        
    if(!user) {
        return next(new AppError("Something went wrong, please try again", 500));
    }
    await user.save();

    res.status(201).json({
        success: true,
        message: 'User registered successfully',
        user,
    });
};
const login = async (req: { body: { email: any; password: any; }; }, res: { cookie: (arg0: string, arg1: any, arg2: any) => void; status: (arg0: number) => { (): any; new(): any; json: { (arg0: { success: boolean; message: string; user: Document<unknown, {}, Document> & Document & { _id: Types.ObjectId; }; }): void; new(): any; }; }; }, next: (arg0: AppError) => any) => {
    try {
        const {email, password} = req.body;
        if (!email || !password) {
            return next(new AppError('All fields are required', 400));
        }
    
        const user = await User.findOne({
            email: email
        })
        .select('+password');
    
        if(!user || !user.comparePassword(password)) {
            return next(new AppError('Email or password does not match', 403));
        }

    
        res.status(200).json({
            success: true,
            message: 'Loggedin successfully',
            user,
        });
        
    } catch (err: any) {
        return next(new AppError(err.message, 500));
    }
};

const logout = (req: any, res: { clearCookie: (arg0: string, arg1: null) => void; status: (arg0: number) => { (): any; new(): any; json: { (arg0: { success: boolean; message: string; }): void; new(): any; }; }; }) => {
    res.clearCookie('token', null);

    res.status(200).json({
        success: true,
        message: 'Logged out successfully'
    })
};


const forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;

    if (!email) {
        return next(new AppError('Please enter your registered email address', 401));
    }

    const user = await User.findOne({ email });

    if (!user) {
        return next(new AppError('Email not registered', 401));
    }

    const resetToken = await user.generatePasswordResetToken();

    await user.save();

    const resetPasswordURL = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    console.log(resetPasswordURL);

    const subject = 'Reset Password';
    const message = `You can reset your password by clicking <a href=${resetPasswordURL} target="_blank"> Reset your password</a>\nIf the above link does not work for some reason then copy-paste this link in a new tab ${resetPasswordURL}.\n If you have not requested this, kindly ignore.`;

    try {
        await sendEmail(email, subject, message);
        res.status(200).json({
            success: true,
            message: `An email has been sent for reset password to ${email} with further instructions.`
        });
    } catch (err: any) {
        const forgotPasswordToken = user?.forgotPasswordToken ?? 'defaultToken';
        const forgotPasswordExpiry = user?.forgotPasswordExpiry ?? new Date();

        await user.save();
        return next(new AppError(err.message, 401));
    }
};

const resetPassword = async (req: Request, res: Response) => {
    const { resetToken } = req.params;

    const { password } = req.body;

    const forgotPasswordToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

    const user = await User.findOne({
        forgotPasswordToken,
        forgotPasswordExpiry: { $gt: Date.now() }
    });

    if (!user) {
        return next(new AppError(`Invalid or expired token`, 403));
    }

    user.password = password;

    user.save();

    res.status(200).json({
        success: true,
        message: `Your account's password was successfully updated, and you can now log in using your new password.`
    });
};
function next(arg0: AppError) {
    throw new Error('Function not implemented.');
}

export {
    signup,
    login,
    logout,
    forgotPassword,
    resetPassword
}
