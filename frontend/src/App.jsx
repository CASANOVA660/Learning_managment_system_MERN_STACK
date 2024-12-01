import { useState } from 'react'
import { Route, Routes, Navigate } from "react-router-dom";
import './App.css'
import SignUpStudent from './modules/SignUp/components/SignUpStudent'
import StudentDashbord from './modules/Dashbord/StudentDashbord/StudentDashbord';
import CoursesPage from './modules/Courses/CoursesPage';
import CourseContent from './modules/Courses/components/CourseContent/CourseContent';
import CourseContext from './modules/Courses/components/CourseContent/Coursecontext/CourseContext';
import AllAssignments from './modules/Courses/components/CourseContent/Coursecontext/components/Assignment/AllAssignments';
import StudyTracker from './modules/Courses/components/StudyTracker/StudyTracker';
import AchievementsPage from './modules/Courses/components/Achivments/AchievementsPage';
import Clubs from './modules/Courses/components/Clubs/Clubs';
import HomePage from './modules/Home/HomePage';
import SignUpTeacher from './modules/SignUp/components/SignUpTeacher';
import TeacherDashbord from './modules/Dashboard/TeacherDashboard/TeacherDashboard';
import SubjectsPageT from './modules/Dashboard/TeacherDashboard/components/SubjectsPaget/SubjectsPageT';
import TeachersPage from './modules/Adminstrator/TeachersPage'
import TeacherSubjectsPage from './modules/Adminstrator/TeacherSubjectsPage'
import LiveSession from './modules/LiveSession/LiveSession'
import AssignmentsList from './modules/Dashboard/TeacherDashboard/components/assignment/AssignmentsList'
import DepartmentsPage from './modules/Adminstrator/departements/DepartmentsPage'
import DepartmentClassesPage from './modules/Adminstrator/departements/DepartmentClassesPage'; // Import the new component
import ClassDetailsPage from './modules/Adminstrator/departements/ClassDetailsPage'; // Import the ClassDetailsPage

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/studentDashbord" element={<StudentDashbord />} />
        <Route path="/teacherDashbord" element={<TeacherDashbord />} />
        <Route path="/signUpStudent" element={<SignUpStudent />} />
        <Route path="/signUpTeacher" element={<SignUpTeacher />} />
        <Route path="/courses/" element={<CoursesPage />} />
        <Route path="/subjects/:id" element={<CourseContent />} />
        <Route path="/chapters/:id/details" element={<CourseContext />} />
        <Route path="/assignments" element={<AllAssignments />} />
        <Route path="/study-tracker" element={<StudyTracker />} />
        <Route path="/achievements" element={<AchievementsPage />} />
        <Route path="/clubs" element={<Clubs />} />
        <Route path='/subjectsTeacher' element={<SubjectsPageT />} />
        <Route path="/teachers" element={<TeachersPage />} />
        <Route path="/teachers/:teacherId" element={<TeacherSubjectsPage />} />
        <Route path="/live-session" element={<LiveSession />} />
        <Route path='/teacherassiment' element={<AssignmentsList />} />
        <Route path="/departments-page" element={<DepartmentsPage />} />
        <Route path="/departments/:id" element={<DepartmentClassesPage />} />
        <Route path="/classes/:classId" element={<ClassDetailsPage />} />

      </Routes>

    </>
  )
}

export default App
