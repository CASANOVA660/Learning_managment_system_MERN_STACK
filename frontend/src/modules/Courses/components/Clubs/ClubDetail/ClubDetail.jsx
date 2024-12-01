import React, { useState } from 'react';
import { X, Calendar, MapPin, Users, MessageCircle, Heart, Send, Plus } from 'lucide-react';
import axiosRequest from '../../../../../lib/AxiosConfig';
import { toast } from 'react-toastify';
import './ClubDetail.css';

const ClubDetail = ({ club, onClose, currentUser, onUpdate }) => {
    const [activeTab, setActiveTab] = useState('POSTS');
    const [newPost, setNewPost] = useState('');
    const [newComment, setNewComment] = useState('');
    const [commentingOn, setCommentingOn] = useState(null);
    const [newEvent, setNewEvent] = useState({
        title: '',
        description: '',
        date: '',
        location: ''
    });
    const [showNewEventForm, setShowNewEventForm] = useState(false);

    const formatDate = (date) => {
        if (!date) return 'Unknown date';
        try {
            return new Date(date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        } catch (error) {
            return 'Invalid date';
        }
    };

    // Helper function to safely get user data
    const getUserData = (user) => ({
        name: user?.name || 'Unknown User',
        avatar: user?.avatar || '/default-avatar.png',
        _id: user?._id || 'unknown'
    });

    const handlePost = async () => {
        try {
            if (!newPost.trim()) {
                toast.warning('Please enter some content for your post');
                return;
            }

            await axiosRequest.post(`/clubs/${club._id}/posts`, {
                studentId: currentUser._id,
                content: newPost
            });
            setNewPost('');
            onUpdate();
            toast.success('Post created successfully!');
        } catch (error) {
            console.error('Error creating post:', error);
            toast.error(error.response?.data?.message || 'Failed to create post');
        }
    };

    const handleComment = async (postId) => {
        try {
            if (!newComment.trim()) {
                toast.warning('Please enter a comment');
                return;
            }

            await axiosRequest.post(`/clubs/${club._id}/posts/${postId}/comments`, {
                studentId: currentUser._id,
                content: newComment
            });
            setNewComment('');
            setCommentingOn(null);
            onUpdate();
            toast.success('Comment added successfully!');
        } catch (error) {
            console.error('Error adding comment:', error);
            toast.error(error.response?.data?.message || 'Failed to add comment');
        }
    };

    const handleLike = async (postId) => {
        try {
            await axiosRequest.post(`/clubs/${club._id}/posts/${postId}/like`, {
                studentId: currentUser._id
            });
            onUpdate();
        } catch (error) {
            console.error('Error toggling like:', error);
            toast.error('Failed to update like');
        }
    };

    const handleCreateEvent = async (e) => {
        e.preventDefault();
        try {
            if (!newEvent.title || !newEvent.description || !newEvent.date || !newEvent.location) {
                toast.warning('Please fill in all event details');
                return;
            }

            await axiosRequest.post(`/clubs/${club._id}/events`, {
                ...newEvent,
                createdBy: currentUser._id
            });
            setNewEvent({ title: '', description: '', date: '', location: '' });
            setShowNewEventForm(false);
            onUpdate();
            toast.success('Event created successfully!');
        } catch (error) {
            console.error('Error creating event:', error);
            toast.error(error.response?.data?.message || 'Failed to create event');
        }
    };

    const handleAttendEvent = async (eventId) => {
        try {
            await axiosRequest.post(`/clubs/${club._id}/events/${eventId}/attend`, {
                studentId: currentUser._id
            });
            onUpdate();
            toast.success('Event attendance updated!');
        } catch (error) {
            console.error('Error updating event attendance:', error);
            toast.error('Failed to update event attendance');
        }
    };

    const isUserAdmin = club.members?.some(
        member => member.studentId?._id === currentUser._id && member.role === 'ADMIN'
    ) || false;

    return (
        <div className="club-detail-overlay" onClick={onClose}>
            <div className="club-detail-modal" onClick={e => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>
                    <X size={24} />
                </button>

                <div className="club-detail-header"
                    style={{ backgroundImage: `url(${club.coverImage || '/default-club-cover.png'})` }}>
                    <div className="club-detail-info">
                        <h2>{club.name}</h2>
                        <p>{club.description}</p>
                        <div className="club-stats">
                            <span><Users size={16} /> {club.members?.length || 0} members</span>
                            <span><Calendar size={16} /> {club.events?.length || 0} events</span>
                        </div>
                    </div>
                </div>

                <div className="club-detail-tabs">
                    <button
                        className={activeTab === 'POSTS' ? 'active' : ''}
                        onClick={() => setActiveTab('POSTS')}
                    >
                        <MessageCircle size={20} /> Posts
                    </button>
                    <button
                        className={activeTab === 'EVENTS' ? 'active' : ''}
                        onClick={() => setActiveTab('EVENTS')}
                    >
                        <Calendar size={20} /> Events
                    </button>
                    <button
                        className={activeTab === 'MEMBERS' ? 'active' : ''}
                        onClick={() => setActiveTab('MEMBERS')}
                    >
                        <Users size={20} /> Members
                    </button>
                </div>

                <div className="club-detail-content">
                    {activeTab === 'POSTS' && (
                        <div className="posts-section">
                            <div className="new-post">
                                <textarea
                                    placeholder="Share something with the club..."
                                    value={newPost}
                                    onChange={(e) => setNewPost(e.target.value)}
                                />
                                <button onClick={handlePost}>Post</button>
                            </div>

                            {(club.posts || []).map(post => {
                                const postUser = getUserData(post.studentId);
                                return (
                                    <div key={post._id} className="post-card">
                                        <div className="post-header">
                                            <img
                                                src={postUser.avatar}
                                                alt={postUser.name}
                                                onError={(e) => {
                                                    e.target.src = '/default-avatar.png';
                                                }}
                                            />
                                            <div>
                                                <h4>{postUser.name}</h4>
                                                <span>{formatDate(post.createdAt)}</span>
                                            </div>
                                        </div>
                                        <p className="post-content">{post.content}</p>
                                        <div className="post-actions">
                                            <button
                                                className={`like-btn ${(post.likes || []).includes(currentUser._id) ? 'liked' : ''}`}
                                                onClick={() => handleLike(post._id)}
                                            >
                                                <Heart size={20} /> {post.likes?.length || 0}
                                            </button>
                                            <button
                                                className="comment-btn"
                                                onClick={() => setCommentingOn(post._id)}
                                            >
                                                <MessageCircle size={20} /> {post.comments?.length || 0}
                                            </button>
                                        </div>

                                        <div className="comments-section">
                                            {(post.comments || []).map(comment => {
                                                const commentUser = getUserData(comment.studentId);
                                                return (
                                                    <div key={comment._id} className="comment">
                                                        <img
                                                            src={commentUser.avatar}
                                                            alt={commentUser.name}
                                                            onError={(e) => {
                                                                e.target.src = '/default-avatar.png';
                                                            }}
                                                        />
                                                        <div>
                                                            <h5>{commentUser.name}</h5>
                                                            <p>{comment.content}</p>
                                                            <span>{formatDate(comment.createdAt)}</span>
                                                        </div>
                                                    </div>
                                                );
                                            })}

                                            {commentingOn === post._id && (
                                                <div className="new-comment">
                                                    <input
                                                        type="text"
                                                        placeholder="Write a comment..."
                                                        value={newComment}
                                                        onChange={(e) => setNewComment(e.target.value)}
                                                        onKeyPress={(e) => {
                                                            if (e.key === 'Enter') {
                                                                handleComment(post._id);
                                                            }
                                                        }}
                                                    />
                                                    <button onClick={() => handleComment(post._id)}>
                                                        <Send size={16} />
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {activeTab === 'EVENTS' && (
                        <div className="events-section">
                            {isUserAdmin && (
                                <button
                                    className="create-event-btn"
                                    onClick={() => setShowNewEventForm(!showNewEventForm)}
                                >
                                    <Plus size={20} /> Create Event
                                </button>
                            )}

                            {showNewEventForm && (
                                <form className="new-event-form" onSubmit={handleCreateEvent}>
                                    <input
                                        type="text"
                                        placeholder="Event Title"
                                        value={newEvent.title}
                                        onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                                        required
                                    />
                                    <textarea
                                        placeholder="Event Description"
                                        value={newEvent.description}
                                        onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                                        required
                                    />
                                    <input
                                        type="datetime-local"
                                        value={newEvent.date}
                                        onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                                        required
                                    />
                                    <input
                                        type="text"
                                        placeholder="Location"
                                        value={newEvent.location}
                                        onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                                        required
                                    />
                                    <div className="form-actions">
                                        <button type="button" onClick={() => setShowNewEventForm(false)}>Cancel</button>
                                        <button type="submit">Create Event</button>
                                    </div>
                                </form>
                            )}

                            {(club.events || []).map(event => (
                                <div key={event._id} className="event-card">
                                    <div className="event-date">
                                        <span className="day">
                                            {event.date ? new Date(event.date).getDate() : '--'}
                                        </span>
                                        <span className="month">
                                            {event.date ? new Date(event.date).toLocaleString('default', { month: 'short' }) : '--'}
                                        </span>
                                    </div>
                                    <div className="event-info">
                                        <h3>{event.title}</h3>
                                        <p>{event.description}</p>
                                        <div className="event-details">
                                            <span><Calendar size={16} /> {formatDate(event.date)}</span>
                                            <span><MapPin size={16} /> {event.location || 'No location set'}</span>
                                            <span><Users size={16} /> {event.attendees?.length || 0} attending</span>
                                        </div>
                                    </div>
                                    <button
                                        className={`attend-btn ${(event.attendees || []).includes(currentUser._id) ? 'attending' : ''}`}
                                        onClick={() => handleAttendEvent(event._id)}
                                    >
                                        {(event.attendees || []).includes(currentUser._id) ? 'Attending' : 'Attend'}
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'MEMBERS' && (
                        <div className="members-section">
                            {(club.members || []).map(member => {
                                const memberUser = getUserData(member.studentId);
                                return (
                                    <div key={memberUser._id} className="member-card">
                                        <img
                                            src={memberUser.avatar}
                                            alt={memberUser.name}
                                            onError={(e) => {
                                                e.target.src = '/default-avatar.png';
                                            }}
                                        />
                                        <div className="member-info">
                                            <h4>{memberUser.name}</h4>
                                            <span className={`role ${member.role?.toLowerCase() || 'member'}`}>
                                                {member.role || 'Member'}
                                            </span>
                                            <span className="joined-date">
                                                Joined {formatDate(member.joinedAt)}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ClubDetail;