import React from 'react';
import { FaUserGraduate, FaChalkboardTeacher, FaUserShield } from 'react-icons/fa'; // Role icons
import { MdLanguage } from 'react-icons/md'; // Language icon
import './SignupPage.css';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
    const navigate = useNavigate();

    const handleCardClick = (role) => {
        if (role === 'student') {
            navigate('/signUpStudent');
        }
        // Implement routing logic for specific role forms
        console.log(`Redirecting to ${role} form`);
    };

    return (
        <div className="container signup-page">
            {/* Language Selector (Moved to the Top) */}
            <div className="d-flex justify-content-end align-items-center language-selector">
                <MdLanguage size={24} />
                <button className="btn btn-link">EN</button>
                <span>|</span>
                <button className="btn btn-link">FR</button>
            </div>

            {/* "Who are you?" Section */}
            <div className="text-center my-5 ">
                <h3 className="premium-subtitle">Who are you?</h3>

                {/* Added space between title and cards */}
                <div className="row justify-content-center mt-4">
                    <div className="col-md-4">
                        <div
                            className="card role-card student-card"
                            onClick={() => handleCardClick('student')}
                        >
                            <div className="card-body text-center">
                                <FaUserGraduate className="role-icon" />
                                <h3 className="card-title">Student</h3>
                                <p className="card-text">Access courses, track progress, and learn.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div
                            className="card role-card teacher-card"
                            onClick={() => handleCardClick('teacher')}
                        >
                            <div className="card-body text-center">
                                <FaChalkboardTeacher className="role-icon" />
                                <h3 className="card-title">Teacher</h3>
                                <p className="card-text">Manage courses and interact with students.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div
                            className="card role-card admin-card"
                            onClick={() => handleCardClick('admin')}
                        >
                            <div className="card-body text-center">
                                <FaUserShield className="role-icon" />
                                <h3 className="card-title">Administrator</h3>
                                <p className="card-text">Manage the platform and oversee activities.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Terms and Policy Links */}
            <div className="d-flex justify-content-center terms-policy">
                <a href="/terms" className="link">Terms</a> &nbsp;|&nbsp;
                <a href="/policy" className="link">Policy</a>
            </div>
        </div>
    );
};

export default SignupPage;
