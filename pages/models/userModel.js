import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "guest",
    },
    email: {
      type: String,
    },
    password: {
      type: String,
      default: "guest",
    },
    image: {
      type: String,
      default: "https://i.stack.imgur.com/34AD2.jpg",
    },
  },
  { timestamps: true }
);
let UsersDataSet = mongoose.models.users || mongoose.model("users", userSchema);
export default UsersDataSet;
