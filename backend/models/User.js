import mongoose from "mongoose";
const {Schema} = mongoose;

const UserSchema = new Schema({
  name: String,
  email: {type:String, unique:true},
  password: String,
  userType: {
    type: String,
    enum: ['ADMIN', 'USER'],
    required: true
  },
},{timestamps:true});

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
