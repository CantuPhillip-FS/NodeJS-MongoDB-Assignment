import { Schema, model } from "mongoose";

const userSchema = new Schema({}, { timestamps: true });

const UserModel = model("User", userSchema);
export default UserModel;
