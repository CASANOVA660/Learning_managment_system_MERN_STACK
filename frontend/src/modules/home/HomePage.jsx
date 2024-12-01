import { useState } from 'react';
import './HomePage.css';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState(0);

    return (
        <div className="home-wrapper">
            {/* Navbar */}
            <nav className="navbar">
                <div className="logo">Uni-LMS</div>
                <div className="nav-links">
                    <a href="#home">Home</a>
                    <a href="#features">Features</a>
                    <a href="#stats">Stats</a>
                    <div className="login-container">
                        <button className="login-btn">Login</button>
                        <div className="login-dropdown">
                            <a href="/student">Student</a>
                            <a href="/teacher">Teacher</a>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main>
                {/* Section 1 - Hero */}
                <section id="home" className="section hero">
                    <div className="content">
                        <h1>Welcome to UniLMS</h1>
                        <p>Your Complete Learning Management Solution</p>
                        <div className="cta-buttons">
                            <button onClick={() => navigate('/signUpStudent')} className="primary-btn">Get Started with Your Learning</button>
                            <button onClick={() => navigate('/signUpTeacher')} className="secondary-btn">Start Managing Your Class</button>
                        </div>
                    </div>
                </section>

                {/* Additional sections */}
                <section id="features" className="section">
                    <div className="content">
                        <h2>Features</h2>
                        <p>Our platform offers a seamless and efficient way to manage learning and teaching, with features like:</p>
                        <ul>
                            <li>Interactive course management</li>
                            <li>Real-time student progress tracking</li>
                            <li>Customizable quizzes and assignments</li>
                            <li>Integrated communication tools</li>
                        </ul>
                    </div>
                </section>

                <section id="stats" className="section">
                    <div className="content">
                        <h2>Stats</h2>
                        {/* Stats content */}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default HomePage;