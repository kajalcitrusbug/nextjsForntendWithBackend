import mongoose from "mongoose";
const studentSchema = new mongoose.Schema(
  {
    id: { type: Number },
    firstname: {
      type: String,
      default: "guest",
    },
    lastname: {
      type: String,
      default: "123",
    },
    address: {
      type: String,
      default: "Ahmedabad",
    },
    studentemail: {
      type: String,
      default: "guest@gmail.com",
    },
  },
  { timestamps: true }
);
let StudentsDataSet =
  mongoose.models.students || mongoose.model("students", studentSchema);
export default StudentsDataSet;
