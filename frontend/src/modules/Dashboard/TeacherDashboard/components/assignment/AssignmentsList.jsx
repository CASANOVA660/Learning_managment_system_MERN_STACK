import React, { useEffect, useState } from 'react';
import axiosRequest from '../../../../../lib/AxiosConfig';
import styles from './AssignmentsManager.module.css'; // Import the CSS module
import SideBar from '../sideBarT/sideBarT'; // Import the Sidebar component

const AssignmentsManager = () => {
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newAssignment, setNewAssignment] = useState({
        id: '',
        title: '',
        description: '',
        dueDate: '',
        questions: [],
        courseId: '',
        subjectId: '',
        teacherId: ''
    });

    useEffect(() => {
        const fetchAssignments = async () => {
            try {
                const response = await axiosRequest.get('/assignments'); // Adjust the URL as needed
                setAssignments(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAssignments();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewAssignment((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosRequest.post('/assignments/addassignments', newAssignment); // Adjust the URL as needed
            setAssignments((prev) => [...prev, newAssignment]); // Update the state with the new assignment
            setNewAssignment({
                id: '',
                title: '',
                description: '',
                dueDate: '',
                questions: [],
                courseId: '',
                subjectId: '',
                teacherId: ''
            }); // Reset the form
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) {
        return <div>Loading assignments...</div>;
    }

    if (error) {
        return <div>Error fetching assignments: {error}</div>;
    }

    return (
        <div className={styles.container}>
            <SideBar /> {/* Include the Sidebar */}
            <div className={styles.content}>
                <h1>Assignments Manager</h1>
                <form onSubmit={handleSubmit}>
                    <h2>Add New Assignment</h2>
                    <input
                        type="number"
                        name="id"
                        placeholder="Assignment ID"
                        value={newAssignment.id}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={newAssignment.title}
                        onChange={handleChange}
                        required
                    />
                    <textarea
                        name="description"
                        placeholder="Description"
                        value={newAssignment.description}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="date"
                        name="dueDate"
                        value={newAssignment.dueDate}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="questions"
                        placeholder="Questions (comma separated)"
                        value={newAssignment.questions.join(', ')}
                        onChange={(e) => handleChange({ target: { name: 'questions', value: e.target.value.split(', ') } })}
                        required
                    />
                    <input
                        type="number"
                        name="courseId"
                        placeholder="Course ID"
                        value={newAssignment.courseId}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="number"
                        name="subjectId"
                        placeholder="Subject ID"
                        value={newAssignment.subjectId}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="number"
                        name="teacherId"
                        placeholder="Teacher ID"
                        value={newAssignment.teacherId}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit">Add Assignment</button>
                </form>

                <h2>All Assignments</h2>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Due Date</th>
                            <th>Status</th>
                            <th>Course ID</th>
                            <th>Subject ID</th>
                            <th>Teacher ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {assignments.map((assignment) => (
                            <tr key={assignment.id}>
                                <td>{assignment.id}</td>
                                <td>{assignment.title}</td>
                                <td>{assignment.description}</td>
                                <td>{new Date(assignment.dueDate).toLocaleDateString()}</td>
                                <td>{assignment.status}</td>
                                <td>{assignment.courseId}</td>
                                <td>{assignment.subjectId}</td>
                                <td>{assignment.teacherId}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AssignmentsManager;