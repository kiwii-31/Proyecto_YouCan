// src/routes/habitsRoutes.js
const express = require('express');
const router = express.Router();
const {
  getAllHabits,
  createHabit,
  updateHabitController,
  deleteHabitController
} = require('../controllers/habitsController');

router.get('/', getAllHabits);
router.post('/', createHabit);
router.put('/:id', updateHabitController);
router.delete('/:id', deleteHabitController);

module.exports = router;
