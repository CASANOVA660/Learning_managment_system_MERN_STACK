const Club = require('../Model/Club');

const clubMiddleware = {
    // Check if user is club member
    async isMember(req, res, next) {
        try {
            const { clubId } = req.params;
            const { studentId } = req.body;

            const club = await Club.findById(clubId);
            if (!club) {
                return res.status(404).json({ message: "Club not found" });
            }

            if (!club.members.some(m => m.studentId.equals(studentId))) {
                return res.status(403).json({ message: "Must be a club member" });
            }

            next();
        } catch (error) {
            res.status(500).json({ message: "Error checking membership", error: error.message });
        }
    },

    // Check if user is admin or moderator
    async isAdminOrMod(req, res, next) {
        try {
            const { clubId } = req.params;
            const { studentId } = req.body;

            const club = await Club.findById(clubId);
            if (!club) {
                return res.status(404).json({ message: "Club not found" });
            }

            const member = club.members.find(m => m.studentId.equals(studentId));
            if (!member || !['ADMIN', 'MODERATOR'].includes(member.role)) {
                return res.status(403).json({ message: "Insufficient permissions" });
            }

            next();
        } catch (error) {
            res.status(500).json({ message: "Error checking permissions", error: error.message });
        }
    }
};

module.exports = clubMiddleware;