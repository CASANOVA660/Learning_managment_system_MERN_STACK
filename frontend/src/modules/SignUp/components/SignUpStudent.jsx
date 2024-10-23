import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosRequest from "../../../Utils/AxiosConfig";
import './SignUpStudent.css'; // Assuming you have this CSS file

const SignUpStudent = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        keepLoggedIn: false,
    });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const { firstName, lastName, email, password, confirmPassword, keepLoggedIn } = formData;

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
    };

    const validateForm = () => {
        const errors = {};
        if (!firstName) errors.firstName = "First name is required";
        if (!lastName) errors.lastName = "Last name is required";
        if (!email) errors.email = "Email is required";
        if (!password) errors.password = "Password is required";
        if (password.length < 8) errors.password = "Password must be at least 8 characters long";
        if (password !== confirmPassword) errors.confirmPassword = "Passwords do not match";
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
            await axiosRequest.post('/auth/signup', {
                firstName,
                lastName,
                email,
                password,
            });
            navigate('/studentDashboard');
        } catch (err) {
            console.error(err.response.data);
            setErrors({ server: err.response.data.msg });
        }
    };

    return (
        <div className="container-fluid">
            {/* Left blue section */}
            <div className="fixed-left">
                <a className="d-block mb-4" href="#">
                    <img
                        src="https://preview.webpixels.io/web/img/logos/clever-light.svg"
                        className="h-10"
                        alt="..."
                    />
                </a>
                <div className="text-center">
                    <h1 className="ls-tight font-bolder display-6 mb-3">
                        Start your learning journey today.
                    </h1>
                    <p className="text-opacity-75">
                        Join our platform as a student and explore a world of learning opportunities.
                    </p>
                </div>
            </div>

            {/* Right section (form) */}
            <div className="main-content">
                <div className="w-100">
                    <div className="mb-6 text-center">
                        <span className="d-inline-block h1 mb-3">👋</span>
                        <h1 className="ls-tight font-bolder h2">Welcome to Student Signup!</h1>
                    </div>
                    <form onSubmit={handleSignup}>
                        <div className="form-group">
                            <label htmlFor="firstName">First Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="firstName"
                                name="firstName"
                                value={firstName}
                                onChange={handleChange}
                            />
                            {errors.firstName && <div className="text-danger">{errors.firstName}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Last Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="lastName"
                                name="lastName"
                                value={lastName}
                                onChange={handleChange}
                            />
                            {errors.lastName && <div className="text-danger">{errors.lastName}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                value={email}
                                onChange={handleChange}
                            />
                            {errors.email && <div className="text-danger">{errors.email}</div>}
                        </div>
                        <div className="form-group position-relative">
                            <label htmlFor="password">Password</label>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                className="form-control"
                                id="password"
                                name="password"
                                value={password}
                                onChange={handleChange}
                            />
                            <button
                                type="button"
                                className="toggle-password-btn"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? '👁️' : '👁️‍🗨️'}
                            </button>
                            {errors.password && <div className="text-danger">{errors.password}</div>}
                        </div>
                        <div className="form-group position-relative">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                className="form-control"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={handleChange}
                            />
                            <button
                                type="button"
                                className="toggle-password-btn"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                            </button>
                            {errors.confirmPassword && <div className="text-danger">{errors.confirmPassword}</div>}
                        </div>
                        <div className="form-check mb-3">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="check_keep_logged_in"
                                name="keepLoggedIn"
                                checked={keepLoggedIn}
                                onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor="check_keep_logged_in">
                                Keep me logged in
                            </label>
                        </div>
                        <button type="submit" className="btn btn-primary mb-3">
                            Sign Up
                        </button>
                    </form>

                    <div className="py-4 text-center">
                        <span className="text-xs text-uppercase font-semibold">OR</span>
                    </div>

                    <a href="#" className="btn btn-neutral w-100">
                        Sign up with Google
                    </a>
                </div>
            </div>
        </div>
    );
};

export default SignUpStudent;
