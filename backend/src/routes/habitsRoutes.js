const express = require("express");
const router = express.Router();
const {
  getAllHabits,
  createHabit,
  updateHabitController,
  deleteHabitController,
  toggleHabitDoneController
} = require("../controllers/habitsController");

router.get("/", getAllHabits);
router.post("/", createHabit);
router.put("/:id", updateHabitController);
router.delete("/:id", deleteHabitController);
router.put("/completado/:habito_id/:dia_id", toggleHabitDoneController);

module.exports = router;
