const router = require('express').Router();
const thoughtsRoutes = require('./thoughtsRoutes');
const usersRoutes = require('./usersRoutes');

router.use('/courses', courseRoutes);
router.use('/students', studentRoutes);

module.exports = router;

// change routes correspondingly