import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';
import { IUser } from '../utils/types.g';


const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  verificationToken: { type: String },
  emailVerified: { type: Boolean, default: false },
  profileImage: { type: String },
  ethereumAddress: { type: String },
});

UserSchema.pre<IUser>("save", async function (next: any) {
  console.log("Pre-save hook called for:", this.email);

  if (this.isModified("password")) {
    console.log("Hashing password for:", this.email);
    this.password = await bcrypt.hash(this.password, 8);
    console.log("Hashed password for:", this.email, this.password);
  }
  next();
});

const User = mongoose.model<IUser>('User', UserSchema);

export default User;
