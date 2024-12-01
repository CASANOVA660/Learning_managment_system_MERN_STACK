import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosRequest from "../../../lib/AxiosConfig";

const ClassDetailsPage = () => {
    const { classId } = useParams();
    const [classData, setClassData] = useState(null);
    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedTeachers, setSelectedTeachers] = useState({});

    // Fetch class details and teachers
    useEffect(() => {
        const fetchClassDetails = async () => {
            try {
                const response = await axiosRequest.get(`/classes/${classId}`);
                const classInfo = response.data;
                setClassData(classInfo);
                await fetchTeachers();
            } catch (err) {
                console.error("Error fetching class details:", err);
                setError("Error fetching class details.");
            } finally {
                setLoading(false);
            }
        };

        fetchClassDetails();
    }, [classId]);

    // Fetch teachers for the select dropdown
    const fetchTeachers = async () => {
        try {
            const response = await axiosRequest.get("/teachers");
            setTeachers(response.data);
        } catch (err) {
            console.error("Error fetching teachers:", err);
        }
    };

    // Handle teacher selection
    const handleTeacherChange = (subjectId, teacherId) => {
        setSelectedTeachers((prev) => ({
            ...prev,
            [subjectId]: teacherId,
        }));
    };

    // Assign teacher to the subject
    const assignTeacher = async (subjectId) => {
        const teacherId = selectedTeachers[subjectId];
        if (!teacherId) {
            alert("Please select a teacher before assigning.");
            return;
        }

        try {
            const response = await axiosRequest.put(`/subjects/${subjectId}/assign-teacher`, {
                teacherId,
            });

            const updatedSubject = response.data.subject;

            setClassData((prevData) => {
                const updatedSubjects = prevData.subjects.map((subject) =>
                    subject._id === subjectId
                        ? { ...subject, teachers: updatedSubject.teachers }
                        : subject
                );
                return { ...prevData, subjects: updatedSubjects };
            });

            alert("Teacher assigned successfully!");
        } catch (err) {
            console.error("Error assigning teacher:", err);
            alert("Failed to assign teacher. Please try again.");
        }
    };

    if (loading) {
        return <div className="loading">Loading class details...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="class-details-page">
            <h1>{classData.name} - Subjects</h1>
            <div className="subjects-grid">
                {classData.subjects.map((subject) => (
                    <div key={subject._id} className="subject-card">
                        <h2>{subject.name}</h2>
                        <p>{subject.description}</p>
                        <p>Number of Courses: {subject.courses.length}</p>
                        <p>
                            Assigned Teacher:{" "}
                            {subject.teachers.length > 0
                                ? subject.teachers[0].name
                                : "No teacher assigned"}
                        </p>
                        <div>
                            <select
                                value={selectedTeachers[subject._id] || ""}
                                onChange={(e) => handleTeacherChange(subject._id, e.target.value)}
                            >
                                <option value="">Select a teacher</option>
                                {teachers.map((teacher) => (
                                    <option key={teacher._id} value={teacher._id}>
                                        {teacher.name}
                                    </option>
                                ))}
                            </select>
                            <button onClick={() => assignTeacher(subject._id)}>
                                {subject.teachers.length > 0 ? "Reassign" : "Assign"}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ClassDetailsPage;
