import { useState } from 'react'
import { Route, Routes, Navigate } from "react-router-dom";
import './App.css'
import SignupPages from './modules/SignUp/pages/SelectionPage';
import SignUpStudent from './modules/SignUp/components/SignUpStudent'
import Dashboard from './modules/Dashboard/StudentDashboard/pages/Dashbord'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/signup" />} />
        <Route path="/signup" element={<SignupPages />} />
        <Route path="/signUpStudent" element={<SignUpStudent />} />
        <Route path="/studentDashboard" element={<Dashboard />} />



      </Routes>

    </>
  )
}

export default App
