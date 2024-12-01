import React, { useState, useEffect } from "react";
import axiosRequest from "../../lib/AxiosConfig";
import { useParams } from "react-router-dom";
import './TeacherSubjectsPage.css'; // Import the CSS file

const TeacherSubjectsPage = () => {
    const { teacherId } = useParams();
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [teacherName, setTeacherName] = useState("");

    useEffect(() => {
        fetchClassesForTeacher();
    }, [teacherId]);

    const fetchClassesForTeacher = async () => {
        try {
            const response = await axiosRequest.get(`/teachers/${teacherId}/subjects`);
            setClasses(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching classes for teacher:", error);
            setLoading(false);
        }
    };

    return (
        <div className="teacher-subjects-page-container">
            <h1>Subjects for {teacherId}</h1>
            {loading ? (
                <p>Loading subjects...</p>
            ) : (
                <div className="classes-container">
                    {classes.length === 0 ? (
                        <p>No subjects found for this teacher.</p>
                    ) : (
                        <table className="classes-table">
                            <thead>
                                <tr>
                                    <th>Class Name</th>
                                    <th>Subjects</th>
                                </tr>
                            </thead>
                            <tbody>
                                {classes.map((classItem) => (
                                    <tr key={classItem.className}>
                                        <td>{classItem.className}</td>
                                        <td>
                                            <ul>
                                                {classItem.subjects.map((subject) => (
                                                    <li key={subject.id}>{subject.name}</li>
                                                ))}
                                            </ul>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            )}
        </div>
    );
};

export default TeacherSubjectsPage;