const express = require('express');
const router = express.Router();
const clubController = require('../Controller/clubController');

// Public routes
router.get('/', clubController.getClubs);
router.get('/:clubId', clubController.getClubDetails);


// Club management
router.post('/', clubController.createClub);
router.post('/:clubId/join', clubController.joinClub);
router.delete('/:clubId/leave', clubController.leaveClub);
router.patch('/:clubId/members/:memberId/role', clubController.updateMemberRole);

// Posts
router.post('/:clubId/posts', clubController.createPost);
router.post('/:clubId/posts/:postId/like', clubController.togglePostLike);
router.post('/:clubId/posts/:postId/comments', clubController.addComment);

// Events
router.post('/:clubId/events', clubController.createEvent);
router.post('/:clubId/events/:eventId/attend', clubController.toggleEventAttendance);

module.exports = router;