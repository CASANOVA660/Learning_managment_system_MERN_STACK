import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosRequest from "../../../lib/AxiosConfig";
import { FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa';
import './SignUpStudent.css';

const SignUpStudent = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        class: '',
        keepLoggedIn: false,
    });
    const [classes, setClasses] = useState([]);
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const response = await axiosRequest.get('/classes');
                setClasses(response.data);
            } catch (error) {
                console.error('Error fetching classes:', error);
                setErrors(prev => ({ ...prev, server: 'Failed to load classes' }));
            }
        };
        fetchClasses();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.firstName.trim()) errors.firstName = 'First name is required';
        if (!formData.lastName.trim()) errors.lastName = 'Last name is required';
        if (!formData.email.trim()) errors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email is invalid';
        if (!formData.password) errors.password = 'Password is required';
        else if (formData.password.length < 6) errors.password = 'Password must be at least 6 characters';
        if (formData.password !== formData.confirmPassword) errors.confirmPassword = 'Passwords do not match';
        if (!formData.class) errors.class = 'Please select your class';
        return errors;
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        setIsLoading(true);
        try {
            const response = await axiosRequest.post('/auth/student/register', {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                password: formData.password,
                class: parseInt(formData.class)
            });

            if (formData.keepLoggedIn) {
                localStorage.setItem('token', response.data.token);
            } else {
                sessionStorage.setItem('token', response.data.token);
            }

            navigate('/studentDashbord');
        } catch (err) {
            console.error(err.response?.data);
            setErrors({ server: err.response?.data?.msg || "Something went wrong" });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-left-panel">
                <div className="brand">
                    <h1>uni LMS</h1>
                </div>
                <div className="left-content">
                    <h2>Start Your Learning Journey</h2>
                    <p>Join our community of learners and achieve your goals</p>
                    <div className="features-list">
                        <div className="feature-item">
                            <span className="feature-icon">📚</span>
                            <div className="feature-text">
                                <h3>Personalized Learning</h3>
                                <p>Learn at your own pace with customized content</p>
                            </div>
                        </div>
                        <div className="feature-item">
                            <span className="feature-icon">🎯</span>
                            <div className="feature-text">
                                <h3>Track Progress</h3>
                                <p>Monitor your achievements and growth</p>
                            </div>
                        </div>
                        <div className="feature-item">
                            <span className="feature-icon">👥</span>
                            <div className="feature-text">
                                <h3>Collaborative Learning</h3>
                                <p>Connect with peers and instructors</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="signup-right-panel">
                <div className="form-container">
                    <h2>Create Student Account</h2>
                    <p className="form-subtitle">Fill in your information to get started</p>

                    {errors.server && <div className="error-message">{errors.server}</div>}

                    <form onSubmit={handleSignup}>
                        <div className="name-fields">
                            <div className="input-group">
                                <label>First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    placeholder="Enter first name"
                                    className={errors.firstName ? 'error' : ''}
                                />
                                {errors.firstName && <span className="error-text">{errors.firstName}</span>}
                            </div>

                            <div className="input-group">
                                <label>Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    placeholder="Enter last name"
                                    className={errors.lastName ? 'error' : ''}
                                />
                                {errors.lastName && <span className="error-text">{errors.lastName}</span>}
                            </div>
                        </div>

                        <div className="input-group">
                            <label>Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                className={errors.email ? 'error' : ''}
                            />
                            {errors.email && <span className="error-text">{errors.email}</span>}
                        </div>

                        <div className="input-group">
                            <label>Select Your Class</label>
                            <select
                                name="class"
                                value={formData.class}
                                onChange={handleChange}
                                className={errors.class ? 'error' : ''}
                            >
                                <option value="">Choose your class</option>
                                {classes.map((classItem) => (
                                    <option key={classItem.id} value={classItem.id}>
                                        {classItem.name} - {classItem.department}
                                    </option>
                                ))}
                            </select>
                            {errors.class && <span className="error-text">{errors.class}</span>}
                        </div>

                        <div className="input-group">
                            <label>Password</label>
                            <div className="password-input">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Create password"
                                    className={errors.password ? 'error' : ''}
                                />
                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                            {errors.password && <span className="error-text">{errors.password}</span>}
                        </div>

                        <div className="input-group">
                            <label>Confirm Password</label>
                            <div className="password-input">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="Confirm password"
                                    className={errors.confirmPassword ? 'error' : ''}
                                />
                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                            {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
                        </div>

                        <div className="checkbox-group">
                            <input
                                type="checkbox"
                                id="keepLoggedIn"
                                name="keepLoggedIn"
                                checked={formData.keepLoggedIn}
                                onChange={handleChange}
                            />
                            <label htmlFor="keepLoggedIn">Keep me logged in</label>
                        </div>

                        <button type="submit" className="submit-btn" disabled={isLoading}>
                            {isLoading ? 'Creating Account...' : 'Create Account'}
                        </button>

                        <div className="divider">
                            <span>or</span>
                        </div>

                        <button type="button" className="google-btn">
                            <FaGoogle />
                            <span>Sign up with Google</span>
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

export default SignUpStudent;