import mongoose from "mongoose";
const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_CLUSTER, { serverSelectionTimeoutMS: 50000 })
    .then(() => console.log("connected"))
    .catch((e) => console.log(e));
};
export default connectDB;
