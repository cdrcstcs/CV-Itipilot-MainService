import mongoose from "mongoose";
const {Schema} = mongoose;

const UserSchema = new Schema({
  name: String,
  email: {type:String, unique:true},
  password: String,
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }], // Reference to Post model
  phone: Number,
  userType: String,
},{timestamps:true});

const User = mongoose.model('User', UserSchema);

export default User;
