import User from "../models/User.js";
import AppError from "../utils/error.util.js";

export const getUserProfile = async (req: { user: { id: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { success: boolean; message: string; user: any; }): void; new(): any; }; }; }, next: (arg0: AppError) => any) => {
    try {
        
        const userId = req.user.id;
        const user =  await user.findById(userId);
    
        res.status(200).json({
            success: true,
            message: 'User profile fetched successfully',
            user,
        });
    } catch (err) {
        return next(new AppError('Failed to fetch user profile', 500));
    }
};
export const updateUserProfile = async (req: { body: { username: any; }; user: { id: { id: any; }; }; userame: any; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { success: boolean; message: string; }): void; new(): any; }; }; }) => {
    const { username } = req.body;
    const { id } = req.user.id;

    const user = await User.findById(id);

    if(!user) {
        return next(new AppError('The user with the given ID was not found.', 404 ));
    }

    if(req.userame) {
        user.username = username;
    }

   

    await user.save();

    res.status(200).json({
        success :true ,
        message:' User profile updated Successfully!'
    });
}

function next(arg0: AppError) {
    throw new Error("Function not implemented.");
}
