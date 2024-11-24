import { useState } from 'react'
import { Route, Routes, Navigate } from "react-router-dom";
import './App.css'
import SignupPages from './modules/SignUp/pages/SelectionPage';
import SignUpStudent from './modules/SignUp/components/SignUpStudent'
import StudentDashbord from './modules/Dashbord/StudentDashbord/StudentDashbord';
import CoursesPage from './modules/Courses/CoursesPage';
import CourseContent from './modules/Courses/components/CourseContent/CourseContent';
import CourseContext from './modules/Courses/components/CourseContent/Coursecontext/CourseContext';
import AllAssignments from './modules/Courses/components/CourseContent/Coursecontext/components/Assignment/AllAssignments';
import StudyTracker from './modules/Courses/components/StudyTracker/StudyTracker';
function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/signup" />} />
        <Route path="/signup" element={<SignupPages />} />
        <Route path="/studentDashbord" element={<StudentDashbord />} />
        <Route path="/signUpStudent" element={<SignUpStudent />} />
        <Route path="/courses/" element={<CoursesPage />} />
        <Route path="/subjects/:id" element={<CourseContent />} />
        <Route path="/chapters/:id/details" element={<CourseContext />} />
        <Route path="/assignments" element={<AllAssignments />} />
        <Route path="/study-tracker" element={<StudyTracker />} />

      </Routes>

    </>
  )
}

export default App
