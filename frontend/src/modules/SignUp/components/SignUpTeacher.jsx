import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosRequest from "../../../lib/AxiosConfig";
import './SignUpTeacher.css';

const SignUpTeacher = () => {
    const [formData, setFormData] = useState({
        firstName: '', // Changed from name to firstName
        lastName: '',  // Added lastName
        email: '',
        department: '',
        password: '',
        confirmPassword: '',
        keepLoggedIn: false,
    });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.firstName.trim()) errors.firstName = 'First name is required'; // Updated validation
        if (!formData.lastName.trim()) errors.lastName = 'Last name is required'; // Added validation
        if (!formData.department.trim()) errors.department = 'Department is required';
        if (!formData.email.trim()) errors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email is invalid';
        if (!formData.password) errors.password = 'Password is required';
        else if (formData.password.length < 6) errors.password = 'Password must be at least 6 characters';
        if (formData.password !== formData.confirmPassword) errors.confirmPassword = 'Passwords do not match';
        return errors;
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        try {
            const response = await axiosRequest.post('/auth/teacher/register', {
                firstName: formData.firstName, // Send firstName
                lastName: formData.lastName,     // Send lastName
                department: formData.department,
                email: formData.email,
                password: formData.password,
            });

            if (formData.keepLoggedIn) {
                localStorage.setItem('token', response.data.token);
            } else {
                sessionStorage.setItem('token', response.data.token);
            }

            navigate('/teacherDashbord');
        } catch (err) {
            console.error(err.response?.data);
            setErrors({ server: err.response?.data?.msg || "Something went wrong" });
        }
    };

    return (
        <div className="teacher-signup-container">
            <div className="teacher-signup-left">
                <div className="brand">
                    <h1>uni LMS</h1>
                </div>
                <div className="left-content">
                    <h2>Join Our Teaching Community</h2>
                    <p>Share your knowledge and inspire the next generation</p>
                    <div className="teacher-features">
                        <div className="feature-item">
                            <div className="feature-icon">👨‍🏫</div>
                            <div className="feature-text">
                                <h3>Create Engaging Content</h3>
                                <p>Build interactive courses and lessons</p>
                            </div>
                        </div>
                        <div className="feature-item">
                            <div className="feature-icon">📊</div>
                            <div className="feature-text">
                                <h3>Track Student Progress</h3>
                                <p>Monitor and analyze student performance</p>
                            </div>
                        </div>
                        <div className="feature-item">
                            <div className="feature-icon">💰</div>
                            <div className="feature-text">
                                <h3>Earn Revenue</h3>
                                <p>Get paid for your expertise</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="teacher-signup-right">
                <div className="form-container">
                    <h2>Create Teacher Account</h2>
                    <p className="form-subtitle">Start your teaching journey with us</p>

                    {errors.server && <div className="server-error">{errors.server}</div>}

                    <form onSubmit={handleSignup}>
                        <div className="name-fields">
                            <div className="input-field">
                                <label>First Name</label>
                                <input
                                    type="text"
                                    name="firstName" // Updated to firstName
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    placeholder="Enter your first name"
                                />
                                {errors.firstName && <span className="error">{errors.firstName}</span>}
                            </div>
                            <div className="input-field">
                                <label>Last Name</label>
                                <input
                                    type="text"
                                    name="lastName" // Added lastName
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    placeholder="Enter your last name"
                                />
                                {errors.lastName && <span className="error">{errors.lastName}</span>}
                            </div>
                        </div>

                        <div className="input-field">
                            <label>Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email address"
                            />
                            {errors.email && <span className="error">{errors.email}</span>}
                        </div>
                        <div className="input-field">
                            <label>Department</label>
                            <input
                                type="text"
                                name="department"
                                value={formData.department}
                                onChange={handleChange}
                                placeholder="Enter your department"
                            />
                            {errors.department && <span className="error">{errors.department}</span>}
                        </div>

                        <div className="input-field">
                            <label>Password</label>
                            <div className="password-input">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Create a strong password"
                                />
                                <button
                                    type="button"
                                    className="toggle-password"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? "Hide" : "Show"}
                                </button>
                            </div>
                            {errors.password && <span className="error">{errors.password}</span>}
                        </div>

                        <div className="input-field">
                            <label>Confirm Password</label>
                            <div className="password-input">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="Confirm your password"
                                />
                                <button
                                    type="button"
                                    className="toggle-password"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? "Hide" : "Show"}
                                </button>
                            </div>
                            {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
                        </div>

                        <div className="checkbox-field">
                            <input
                                type="checkbox"
                                id="keepLoggedIn"
                                name="keepLoggedIn"
                                checked={formData.keepLoggedIn}
                                onChange={handleChange}
                            />
                            <label htmlFor="keepLoggedIn">Keep me logged in</label>
                        </div>

                        <button type="submit" className="signup-btn">Create Teacher Account</button>

                        <div className="divider">
                            <span>or</span>
                        </div>

                        <button type="button" className="google-btn">
                            <img src="/google-icon.png" alt="Google" />
                            Sign up with Google
                        </button>

                        <p className="login-link">
                            Already have an account? <Link to="/login">Log in</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUpTeacher;