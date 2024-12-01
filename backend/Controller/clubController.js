const Club = require('../Model/Club');
const Student = require('../Model/StudentModel');
const mongoose = require('mongoose');

// Helper function to check if user is club admin
const isClubAdmin = (club, studentId) => {
    return club.members.some(member =>
        member.studentId.equals(studentId) && member.role === 'ADMIN'
    );
};

const clubController = {
    // Create a new club
    async createClub(req, res) {
        try {
            const { name, description, category, studentId } = req.body;

            // Validate required fields
            if (!name || !description || !category || !studentId) {
                return res.status(400).json({ message: "Missing required fields" });
            }

            // Create new club with creator as admin
            const club = new Club({
                name,
                description,
                category,
                members: [{
                    studentId,
                    role: 'ADMIN',
                    joinedAt: new Date()
                }]
            });

            await club.save();

            res.status(201).json(club);
        } catch (error) {
            console.error('Error creating club:', error);
            res.status(500).json({ message: "Error creating club", error: error.message });
        }
    },

    // Get all clubs with optional filters
    async getClubs(req, res) {
        try {
            const { category, search, studentId } = req.query;
            let query = {};

            // Apply category filter
            if (category && category !== 'ALL') {
                query.category = category;
            }

            // Apply search filter
            if (search) {
                query.$or = [
                    { name: { $regex: search, $options: 'i' } },
                    { description: { $regex: search, $options: 'i' } }
                ];
            }

            // Get clubs with populated member details
            const clubs = await Club.find(query)
                .populate('members.studentId', 'name avatar')
                .populate('posts.studentId', 'name avatar')
                .populate('posts.comments.studentId', 'name avatar')
                .sort({ createdAt: -1 });

            // Add isMember flag if studentId is provided
            if (studentId) {
                clubs.forEach(club => {
                    club._doc.isMember = club.members.some(
                        member => member.studentId._id.equals(studentId)
                    );
                });
            }

            res.status(200).json(clubs);
        } catch (error) {
            console.error('Error getting clubs:', error);
            res.status(500).json({ message: "Error getting clubs", error: error.message });
        }
    },

    // Get single club details
    async getClubDetails(req, res) {
        try {
            const { clubId } = req.params;

            const club = await Club.findById(clubId)
                .populate('members.studentId', 'name avatar')
                .populate('posts.studentId', 'name avatar')
                .populate('posts.comments.studentId', 'name avatar')
                .populate('events.attendees', 'name avatar')
                .populate('events.createdBy', 'name avatar');

            if (!club) {
                return res.status(404).json({ message: "Club not found" });
            }

            res.status(200).json(club);
        } catch (error) {
            console.error('Error getting club details:', error);
            res.status(500).json({ message: "Error getting club details", error: error.message });
        }
    },

    // Join a club
    async joinClub(req, res) {
        try {
            const { clubId } = req.params;
            const { studentId } = req.body;

            // Convert studentId to ObjectId
            const studentObjectId = new mongoose.Types.ObjectId(studentId);

            const club = await Club.findById(clubId);
            if (!club) {
                return res.status(404).json({ message: "Club not found" });
            }

            // Check if already a member
            if (club.members.some(member => member.studentId.equals(studentObjectId))) {
                return res.status(400).json({ message: "Already a member of this club" });
            }

            // Add new member
            club.members.push({
                studentId: studentObjectId,
                role: 'MEMBER',
                joinedAt: new Date()
            });

            await club.save();
            res.status(200).json({ message: "Successfully joined club" });
        } catch (error) {
            console.error('Error joining club:', error);
            res.status(500).json({ message: "Error joining club", error: error.message });
        }
    },


    // Create a post in a club
    async createPost(req, res) {
        try {
            const { clubId } = req.params;
            const { studentId, content, images } = req.body;

            const club = await Club.findById(clubId);
            if (!club) {
                return res.status(404).json({ message: "Club not found" });
            }

            // Check if member
            if (!club.members.some(member => member.studentId.equals(studentId))) {
                return res.status(403).json({ message: "Must be a member to post" });
            }

            club.posts.push({
                studentId,
                content,
                images: images || [],
                createdAt: new Date()
            });

            await club.save();

            res.status(201).json(club.posts[club.posts.length - 1]);
        } catch (error) {
            console.error('Error creating post:', error);
            res.status(500).json({ message: "Error creating post", error: error.message });
        }
    },

    // ... (previous methods)

    // Create an event
    async createEvent(req, res) {
        try {
            const { clubId } = req.params;
            const { title, description, date, location, createdBy } = req.body;

            const club = await Club.findById(clubId);
            if (!club) {
                return res.status(404).json({ message: "Club not found" });
            }

            // Check if creator is admin or moderator
            const member = club.members.find(m => m.studentId.equals(createdBy));
            if (!member || !['ADMIN', 'MODERATOR'].includes(member.role)) {
                return res.status(403).json({ message: "Unauthorized to create events" });
            }

            club.events.push({
                title,
                description,
                date,
                location,
                createdBy,
                attendees: [createdBy], // Creator automatically attends
                createdAt: new Date()
            });

            await club.save();

            res.status(201).json(club.events[club.events.length - 1]);
        } catch (error) {
            console.error('Error creating event:', error);
            res.status(500).json({ message: "Error creating event", error: error.message });
        }
    },

    // Attend/unattend event
    async toggleEventAttendance(req, res) {
        try {
            const { clubId, eventId } = req.params;
            const { studentId } = req.body;

            const club = await Club.findById(clubId);
            if (!club) {
                return res.status(404).json({ message: "Club not found" });
            }

            const event = club.events.id(eventId);
            if (!event) {
                return res.status(404).json({ message: "Event not found" });
            }

            const attendeeIndex = event.attendees.indexOf(studentId);
            if (attendeeIndex === -1) {
                event.attendees.push(studentId);
            } else {
                event.attendees.splice(attendeeIndex, 1);
            }

            await club.save();

            res.status(200).json({
                message: attendeeIndex === -1 ? "Now attending" : "No longer attending",
                attending: attendeeIndex === -1
            });
        } catch (error) {
            console.error('Error toggling event attendance:', error);
            res.status(500).json({ message: "Error updating event attendance", error: error.message });
        }
    },

    // Like/unlike post
    async togglePostLike(req, res) {
        try {
            const { clubId, postId } = req.params;
            const { studentId } = req.body;

            const club = await Club.findById(clubId);
            if (!club) {
                return res.status(404).json({ message: "Club not found" });
            }

            const post = club.posts.id(postId);
            if (!post) {
                return res.status(404).json({ message: "Post not found" });
            }

            const likeIndex = post.likes.indexOf(studentId);
            if (likeIndex === -1) {
                post.likes.push(studentId);
            } else {
                post.likes.splice(likeIndex, 1);
            }

            await club.save();

            res.status(200).json({
                message: likeIndex === -1 ? "Post liked" : "Post unliked",
                liked: likeIndex === -1
            });
        } catch (error) {
            console.error('Error toggling post like:', error);
            res.status(500).json({ message: "Error updating post like", error: error.message });
        }
    },

    // Add comment to post
    async addComment(req, res) {
        try {
            const { clubId, postId } = req.params;
            const { studentId, content } = req.body;

            const club = await Club.findById(clubId);
            if (!club) {
                return res.status(404).json({ message: "Club not found" });
            }

            const post = club.posts.id(postId);
            if (!post) {
                return res.status(404).json({ message: "Post not found" });
            }

            post.comments.push({
                studentId,
                content,
                createdAt: new Date()
            });

            await club.save();

            res.status(201).json(post.comments[post.comments.length - 1]);
        } catch (error) {
            console.error('Error adding comment:', error);
            res.status(500).json({ message: "Error adding comment", error: error.message });
        }
    },

    // Update member role
    async updateMemberRole(req, res) {
        try {
            const { clubId, memberId } = req.params;
            const { role, adminId } = req.body;

            const club = await Club.findById(clubId);
            if (!club) {
                return res.status(404).json({ message: "Club not found" });
            }

            // Check if requester is admin
            if (!isClubAdmin(club, adminId)) {
                return res.status(403).json({ message: "Only admins can update roles" });
            }

            const member = club.members.find(m => m.studentId.equals(memberId));
            if (!member) {
                return res.status(404).json({ message: "Member not found" });
            }

            member.role = role;
            await club.save();

            res.status(200).json({ message: "Role updated successfully" });
        } catch (error) {
            console.error('Error updating member role:', error);
            res.status(500).json({ message: "Error updating role", error: error.message });
        }
    },

    // Leave club
    async leaveClub(req, res) {
        try {
            const { clubId } = req.params;
            const { studentId } = req.body;

            const club = await Club.findById(clubId);
            if (!club) {
                return res.status(404).json({ message: "Club not found" });
            }

            const memberIndex = club.members.findIndex(m => m.studentId.equals(studentId));
            if (memberIndex === -1) {
                return res.status(404).json({ message: "Not a member of this club" });
            }

            // Check if last admin
            if (club.members[memberIndex].role === 'ADMIN' &&
                club.members.filter(m => m.role === 'ADMIN').length === 1) {
                return res.status(400).json({ message: "Cannot leave club as last admin" });
            }

            club.members.splice(memberIndex, 1);
            await club.save();

            res.status(200).json({ message: "Successfully left club" });
        } catch (error) {
            console.error('Error leaving club:', error);
            res.status(500).json({ message: "Error leaving club", error: error.message });
        }
    }
};
module.exports = clubController;
