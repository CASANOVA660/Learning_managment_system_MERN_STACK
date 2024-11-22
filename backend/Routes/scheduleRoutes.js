const express = require('express');
const router = express.Router();
const {
    getSchedule,
    addCustomClass,
    updateCustomClass,
    deleteCustomClass,
    getCurrentClass
} = require('../Controller/scheduleController');

router.get('/:studentId/schedule', getSchedule);
router.get('/:studentId/current-class', getCurrentClass);
router.post('/:studentId/schedule/addcustom', addCustomClass);
router.put('/:studentId/schedule/custom', updateCustomClass);
router.delete('/:studentId/schedule/custom', deleteCustomClass);

module.exports = router;