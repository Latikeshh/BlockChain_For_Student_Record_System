const Teacher = require("../models/TeacherModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/* TEACHER SIGNUP */
exports.teacherSignup = async (req, res) => {
  const { name, email, password } = req.body;

  const exists = await Teacher.findOne({ email, isDeleted: false });
  if (exists) return res.status(400).json({ message: "Teacher already exists" });
  const hashedPassword = await bcrypt.hash(password, 10);
  await Teacher.create({ name, email, password: hashedPassword });
  res.status(201).json({ message: "Teacher signup successful" });
};

/* TEACHER LOGIN */
exports.teacherLogin = async (req, res) => {
  const { email, password } = req.body;
  const teacher = await Teacher.findOne({ email, isDeleted: false });
  if (!teacher) return res.status(404).json({ message: "Teacher not found" });
  const isMatch = await bcrypt.compare(password, teacher.password);
  if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });
  const token = jwt.sign(
    { userId: teacher._id, role: "teacher" },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({
    message: "Teacher login successful",
    token,
    user: {
      id: teacher._id,
      name: teacher.name,
      email: teacher.email,
      role: "teacher"
    }
  });
};

/* GET ALL TEACHERS */
exports.getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find({ isDeleted: false })
      .select("-password")
      .sort({ createdAt: -1 });
    res.json(teachers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* GET TEACHER BY ID */
exports.getTeacherById = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id).select("-password");
    if (!teacher) return res.status(404).json({ message: "Teacher not found" });
    res.json(teacher);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* UPDATE TEACHER */
exports.updateTeacher = async (req, res) => {
  try {
    const { name, email } = req.body;
    const teacher = await Teacher.findById(req.params.id);
    
    if (!teacher) return res.status(404).json({ message: "Teacher not found" });
    
    if (name) teacher.name = name;
    if (email) teacher.email = email;
    
    await teacher.save();
    res.json({ message: "Teacher updated successfully", teacher });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* DELETE TEACHER (Soft Delete) */
exports.deleteTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) return res.status(404).json({ message: "Teacher not found" });
    
    teacher.isDeleted = true;
    await teacher.save();
    
    res.json({ message: "Teacher deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* GET TEACHER COUNT */
exports.getTeacherCount = async (req, res) => {
  try {
    const count = await Teacher.countDocuments({ isDeleted: false });
    res.json({ count });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
