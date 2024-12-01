import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Calendar, Users, MessageCircle, Plus } from 'lucide-react';
import axiosRequest from '../../../../lib/AxiosConfig';
import ClubDetail from './ClubDetail/ClubDetail';
import { toast } from 'react-toastify';
import './Clubs.css';

const Clubs = () => {
    const [clubs, setClubs] = useState([]);
    const [filteredClubs, setFilteredClubs] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('ALL');
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [selectedClub, setSelectedClub] = useState(null);
    const [showCreateModal, setShowCreateModal] = useState(false);

    // Mock user data (replace with your actual user data source)
    const currentUser = {
        id: '673f9b741e30841c0bbe5db9', // Replace with actual user ID
        name: 'John Doe',
        avatar: '/images/image1.png'
    };

    const categories = ['ALL', 'ACADEMIC', 'SPORTS', 'ARTS', 'TECHNOLOGY', 'SOCIAL', 'OTHER'];

    useEffect(() => {
        fetchClubs();
    }, [selectedCategory, searchQuery]);

    const fetchClubs = async () => {
        try {
            setLoading(true);
            const response = await axiosRequest.get('/clubs'); // Updated endpoint
            setClubs(response.data);
            setFilteredClubs(response.data);
        } catch (error) {
            console.error('Error fetching clubs:', error);
            toast.error('Failed to fetch clubs');
        } finally {
            setLoading(false);
        }
    };

    const handleJoinClub = async (clubId, e) => {
        e.stopPropagation();
        try {
            await axiosRequest.post(`/clubs/${clubId}/join`, {
                studentId: currentUser.id // Make sure this matches your user object structure
            });
            toast.success('Successfully joined the club!');
            fetchClubs();
        } catch (error) {
            console.error('Error joining club:', error);
            toast.error(error.response?.data?.message || 'Failed to join club');
        }
    };


    const handleCreateClub = async (clubData) => {
        try {
            await axiosRequest.post('/clubs', {
                ...clubData,
                studentId: currentUser.id
            });
            toast.success('Club created successfully!');
            setShowCreateModal(false);
            fetchClubs();
        } catch (error) {
            console.error('Error creating club:', error);
            toast.error('Failed to create club');
        }
    };

    const handleCreateClick = () => {
        setShowCreateModal(true);
    };

    const handleCloseModal = () => {
        setShowCreateModal(false);
    };

    return (
        <div className="clubs-container">
            <div className="clubs-header">
                <h1>Student Clubs</h1>
                <button
                    className="create-club-btn"
                    onClick={handleCreateClick}
                >
                    <Plus size={20} />
                    Create Club
                </button>
            </div>

            <div className="clubs-filters">
                <div className="search-bar">
                    <Search size={20} />
                    <input
                        type="text"
                        placeholder="Search clubs..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="category-filters">
                    {categories.map(category => (
                        <button
                            key={category}
                            className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                            onClick={() => setSelectedCategory(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            {loading ? (
                <div className="loading-container">
                    <div className="loader"></div>
                    <p>Loading clubs...</p>
                </div>
            ) : (
                <div className="clubs-grid">
                    {filteredClubs.map(club => (
                        <motion.div
                            key={club.id}
                            className="club-card"
                            whileHover={{ y: -5 }}
                            onClick={() => setSelectedClub(club)}
                        >
                            <div
                                className="club-cover"
                                style={{
                                    backgroundImage: club.coverImage
                                        ? `url(${club.coverImage})`
                                        : 'linear-gradient(45deg, #2196F3, #3F51B5)'
                                }}
                            >
                                <div className="club-category">{club.category}</div>
                            </div>
                            <div className="club-content">
                                <h3>{club.name}</h3>
                                <p>{club.description}</p>
                                <div className="club-stats">
                                    <div className="stat">
                                        <Users size={16} />
                                        {club.members.length} members
                                    </div>
                                    <div className="stat">
                                        <Calendar size={16} />
                                        {club.events.length} events
                                    </div>
                                </div>
                                {!club.isMember && (
                                    <button
                                        className="join-btn"
                                        onClick={(e) => handleJoinClub(club._id, e)}
                                    >
                                        Join Club
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {selectedClub && (
                <ClubDetail
                    club={selectedClub}
                    onClose={() => setSelectedClub(null)}
                    currentUser={currentUser}
                    onUpdate={fetchClubs}
                />
            )}

            {showCreateModal && (
                <CreateClubModal
                    onClose={handleCloseModal}
                    onCreate={handleCreateClub}
                />
            )}
        </div>
    );
};

// Create Club Modal Component
const CreateClubModal = ({ onClose, onCreate }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category: 'ACADEMIC',
        coverImage: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onCreate(formData);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Create New Club</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Club Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Category</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                        >
                            <option value="ACADEMIC">Academic</option>
                            <option value="SPORTS">Sports</option>
                            <option value="ARTS">Arts</option>
                            <option value="TECHNOLOGY">Technology</option>
                            <option value="SOCIAL">Social</option>
                            <option value="OTHER">Other</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Cover Image URL</label>
                        <input
                            type="url"
                            name="coverImage"
                            value={formData.coverImage}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="modal-actions">
                        <button type="button" onClick={onClose}>Cancel</button>
                        <button type="submit">Create Club</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Clubs;