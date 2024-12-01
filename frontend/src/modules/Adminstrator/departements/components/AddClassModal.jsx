import React, { useState } from "react";
import axiosRequest from "../../../../lib/AxiosConfig";
import './AddClassModal.css';

const AddClassModal = ({ onClose, departmentId, onClassAdded }) => {
    const [formData, setFormData] = useState({
        name: '',
        academicYear: '',
        capacity: '',
        schedule: []
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosRequest.post(`/classes`, { ...formData, department: departmentId });
            onClassAdded(response.data); // Notify parent component
            onClose(); // Close the modal
        } catch (error) {
            console.error("Error adding class:", error);
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-card" onClick={e => e.stopPropagation()}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h3>Add Class</h3>
                        <button className="close-button" onClick={onClose}>×</button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Name</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                                placeholder="Enter class name"
                            />
                        </div>
                        <div className="form-group">
                            <label>Academic Year</label>
                            <input
                                type="text"
                                value={formData.academicYear}
                                onChange={(e) => setFormData({ ...formData, academicYear: e.target.value })}
                                required
                                placeholder="Enter academic year"
                            />
                        </div>
                        <div className="form-group">
                            <label>Capacity</label>
                            <input
                                type="number"
                                value={formData.capacity}
                                onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                                required
                                placeholder="Enter capacity"
                            />
                        </div>
                        <button type="submit" className="save-button">Create Class</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddClassModal;