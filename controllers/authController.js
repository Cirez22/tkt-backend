const bcrypt = require ('bcryptjs');
const { generateJwt } = require ('../middlewares/process');
const UserModel = require('../models/UserModel');

const getAllUsers = async (req,res) => {
    const users = await UserModel.find();
    try {
        if (users.length === 0 ) {
            return res.status(400).json({message:'No users Found'});
        }
        return res.status(200).json(users);
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: 'Could not get the users'})
    }
}

const getUserById = async (res,req) => {
    const {id} = req.params;
    const user = await User.findById(id);
    try {
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({message:"Could not get user"})
    }
}

const signUpUser = async (req,res) => {
    const {mail} = req.body
    const testEmail = await UserModel.findOne({email});
    if (testEmail) {
        return res.status(500).json({message:"Email already in use"});
    }
    const user = new UserModel(req.body);
    try {
        const salt = bycrpt.hashSync(req.body.password,salt);
        user.save();
        const token = await generateJwt(user._id);
        return res.status(201).json({user,token});
    } catch (error) {
        return res.status(500).json({message:"Couldn't create user"});
    }
}

const loginUser = async (req,res) => {
    const {email, password} = req.body;
    const user = await UserModel.findOne({email});
    if (!user) {
        return res.status(500).json({message:" Please check credentials"})
    }
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
        return res.status(500).json({message:"Please chech credentials"});
    }
    const token = await generateJwt(user._id);
    return res.status(200).json({user,token});
}

module.exports = {
    getAllUsers,
    getUserById,
    signUpUser,
    loginUser
}