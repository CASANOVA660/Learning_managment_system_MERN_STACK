import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"; // Import hooks from Redux
import { Card, CardContent } from "../../../Dashbord/StudentDashbord/cards/cardinfo";
import './SubjectCard.css';
import { useNavigate } from "react-router-dom";
import { fetchSubjects } from "../../../../core/Features/subjectsSlice"; // Import fetchSubjects action
import CourseContent from "../CourseContent/CourseContent";

const SubjectCard = ({ subject, onClick }) => {
    const navigate = useNavigate();
    return (
        <Card className="subject-card" onClick={() => navigate(`/subjects/${subject.id}`)}>
            <div className="subject-card-image-container">
                <img
                    src={subject.image || '/images/default-image.png'}
                    alt={subject.name || "Subject Image"}
                    className="subject-card-image"
                />
                <div className="subject-card-overlay">
                    <h3 className="subject-card-title">{subject.name}</h3>
                </div>
            </div>
            <CardContent className="subject-card-content">
                <p className="subject-card-description">{subject.description}</p>
                <p className="subject-card-courses">{subject.courses.length} courses available</p>
            </CardContent>
        </Card>
    );
};

const SubjectCardTest = () => {
    const dispatch = useDispatch();

    // Select data from Redux store
    const { subjects, loading, error } = useSelector((state) => state.subjectsStore);

    const [selectedCourse, setSelectedCourse] = useState(null);

    useEffect(() => {
        dispatch(fetchSubjects()); // Dispatch the fetchSubjects action when the component mounts
    }, [dispatch]);

    const handleClick = (subject) => {
        setSelectedCourse(subject);
    };

    const handleBack = () => {
        setSelectedCourse(null);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    if (selectedCourse) {
        return (
            <CourseContent
                course={{ ...selectedCourse, ...selectedCourse.courseDetails }}
                onBack={handleBack}
            />
        );
    }

    return (
        <div className="subject-card-grid">
            {subjects.map((subject) => (
                <SubjectCard key={subject.id} subject={subject} onClick={handleClick} />
            ))}
        </div>
    );
};

export default SubjectCardTest;
