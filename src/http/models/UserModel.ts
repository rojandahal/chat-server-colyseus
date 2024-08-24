import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

// Define the user interface
interface IUser extends Document {
  name: string;
  email: string;
  sessionId: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

// Define the user schema
const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  sessionId: { type: String, required: false },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Hash the password before saving the user
UserSchema.pre<IUser>("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  // Hash the password with a salt of 10
  const hash = await bcrypt.hash(user.password, 10);
  user.password = hash;
  next();
});

// Create and export the user model
const UserModel = mongoose.model<IUser>("User", UserSchema);
export default UserModel;
