import StudentsDataSet from "../../models/studentsModel";
export default async function handler(req, res) {
  const body = req.body;
  const studentExit = await StudentsDataSet.findOne({ email: body.email });
  if (studentExit) {
    res.status(200).json({ message: "Student added" });
    return;
  }
}
