import mongoose from "mongoose";
const {Schema} = mongoose;
const UserSchema = new Schema({
  imageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Image' },
  name: String,
  email: {type:String, unique:true},
  password: String,
  hotels: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Hotel' }],
  country: String,
  phone: Number,
  longtitude: Number,
  latitude: Number, 
  userType: String,
},{timestamps:true});

const User = mongoose.model('User', UserSchema);
export default User;
