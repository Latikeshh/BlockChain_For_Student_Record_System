const router = require("express").Router();
const teacherCtrl = require("../controller/TeacherLoginController");
const auth = require("../middleware/auth");

// Teacher Auth Routes
router.post("/signup", teacherCtrl.teacherSignup);
router.post("/login", teacherCtrl.teacherLogin);

// Teacher Management Routes
router.get("/teachers", auth, teacherCtrl.getAllTeachers);
router.get("/teachers/count", auth, teacherCtrl.getTeacherCount);
router.get("/teacher/:id", auth, teacherCtrl.getTeacherById);
router.put("/teacher/:id", auth, teacherCtrl.updateTeacher);
router.delete("/teacher/:id", auth, teacherCtrl.deleteTeacher);

module.exports = router;
