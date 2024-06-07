import bcyrpt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../modal/user.js';

export const signup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        if(!name || !email || !password) {
            return res.status(400).json({message: 'All fields are required'});
        }
        const existingUser = await User.findOne({ email });
        if(existingUser){
            return res.status(400).json({message: 'User already exists'});
        }
        const hashedPassword = await bcyrpt.hash(password, process.env.SALT_ROUNDS);
        const newUser =  User.create({ name, email, password: hashedPassword });
        await newUser.save();
        return res.status(201).json({message: 'User created successfully'});
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({message: 'Internal server error'});
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if(!email || !password) {
            return res.status(400).json({message: 'All fields are required'});
        }
        const user = await User.findOne({ email });
        if(!user) {
            return res.status(404).json({message: 'User not found'});
        }
        const isPasswordCorrect = await bcyrpt.compare(password, user.password);
        if(!isPasswordCorrect) {
            return res.status(401).json({message: 'Invalid password'});
        }
        const token = jwt.sign({userId: user._id, email: user.email}, process.env.JWT_SECRET, {expiresIn: '1h'});
        return res.status(200).json({message: "Login successfull"})
    } catch (error) {
        console.error(error)
        return res.status(500).json({message: 'Internal server error'});
    }
}