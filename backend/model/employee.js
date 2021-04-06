const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
  gender: { type: String, trim: true },
  department: { type: String, trim: true },
  degree: { type: String, trim: true },
  MSCB: { type: String, trim: true },
  fullName: { type: String, trim: true },
  blockArea: { type: String, trim: true },
  departmentArea: { type: String, trim: true },
  DOB: Date,
  nationalID: { type: String, trim: true },
  issueDate: Date,
  issueBy: { type: String, trim: true },
  placeDOB: { type: String, trim: true },
  hometown: { type: String, trim: true },
  permanentAddress: { type: String, trim: true },
  currentAddress: { type: String, trim: true },
  taxCode: { type: String, trim: true },
  bankID: { type: String, trim: true },
  bank: { type: String, trim: true },
  branch: { type: String, trim: true },
  transOff: { type: String, trim: true },
  dateIn: Date,
  email: {
    type: String,
    index: true,
    unique: true,
  },
  personalEmail: { type: String, trim: true },
  unionMem: Boolean,
  noteUnion: { type: String, trim: true },
  dateUnion: Date,
  contractType: {
    type: String,
    trim: true,
    // enum: ["Biên chế, HĐ đơn vị"],
  },
  role: {
    type: [String],
    default: ["FULLTIME"],
  },
  picture: String,
  acToken: String,
  rfToken: String,
});

const Employee = mongoose.model("Employee", EmployeeSchema);

module.exports = Employee;
