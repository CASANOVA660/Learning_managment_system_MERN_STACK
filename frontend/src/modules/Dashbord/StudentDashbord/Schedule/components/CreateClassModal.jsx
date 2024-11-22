import React, { useState } from 'react';
import { Card } from "../../cards/cardinfo";
import './CreateClassModal.css';

const CreateClassModal = ({ onClose, onSave, selectedDay, dayData }) => {
    const [formData, setFormData] = useState({
        title: '',
        taskName: '',
        time: '',
        description: '',
        colorCode: '#3B82F6',
        isPrivate: true,
        isCustom: true
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitting form data:', formData);
        onSave(formData);
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-card" onClick={e => e.stopPropagation()}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h3>Add Custom Class</h3>
                        <span className="day-label">{dayData?.day}</span>
                        <button className="close-button" onClick={onClose}>×</button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Title <span className="required">*</span></label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                required
                                placeholder="Enter title"
                            />
                        </div>
                        <div className="form-group">
                            <label>Task Name <span className="required">*</span></label>
                            <input
                                type="text"
                                value={formData.taskName}
                                onChange={(e) => setFormData({ ...formData, taskName: e.target.value })}
                                required
                                placeholder="Enter task name"
                            />
                        </div>
                        <div className="form-group">
                            <label>Time <span className="required">*</span></label>
                            <input
                                type="time"
                                value={formData.time}
                                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="Enter description (optional)"
                            />
                        </div>
                        <div className="form-group color-picker">
                            <label>Color Theme</label>
                            <input
                                type="color"
                                value={formData.colorCode}
                                onChange={(e) => setFormData({ ...formData, colorCode: e.target.value })}
                            />
                            <div
                                className="color-preview"
                                style={{ backgroundColor: formData.colorCode }}
                            ></div>
                        </div>
                        <div className="modal-actions">
                            <button type="button" onClick={onClose} className="cancel-button">
                                Cancel
                            </button>
                            <button type="submit" className="save-button">
                                Save Class
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateClassModal;