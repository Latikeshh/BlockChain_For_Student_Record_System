import Sidebar from "../Teacher/Sidebar";
import "./TeacherLayout.css";

const TeacherLayout = ({ children }) => {
  return (
    <div className="teacher-layout">
      <div className="teacher-layout-content">
        <Sidebar />
        <div className="teacher-main-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default TeacherLayout;
