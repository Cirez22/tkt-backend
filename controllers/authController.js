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

const getUserById = async (res,res) => {
    const {id} = req.params
}