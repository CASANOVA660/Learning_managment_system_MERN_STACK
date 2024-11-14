import { useState } from 'react'
import { Route, Routes, Navigate } from "react-router-dom";
import './App.css'
import SignupPages from './modules/SignUp/pages/SelectionPage';
import SignUpStudent from './modules/SignUp/components/SignUpStudent'
import StudentDashbord from './modules/Dashbord/StudentDashbord/StudentDashbord';
import CoursesPage from './modules/Courses/CoursesPage';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/signup" />} />
        <Route path="/signup" element={<SignupPages />} />
        <Route path="/studentDashbord" element={<StudentDashbord />} />
        <Route path="/signUpStudent" element={<SignUpStudent />} />
        <Route path="/courses" element={<CoursesPage />} />



      </Routes>

    </>
  )
}

export default App
