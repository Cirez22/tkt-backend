const {Schema, model} = require('mongoose')


const UserSchema = Schema(
    {
        email: {
            type:String,
            required:true,
            unique:true
        },
        password: {
            type:String,
            required:true
        },
        role: {
            type: String,
            required: true,
            enum: ['USER', 'ADMIN'],
            default: 'USER'
        }
    }
);
UserSchema.methods.toJSON = function () {
    const { password,_id,__v,...user} = this.toObject();
    user.uid = _id;
    return user;
    
}

module.exports = model('User', UserSchema)