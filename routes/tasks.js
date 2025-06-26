const express = require('express');
const router = express.Router();
const taskController = require ('../controllers/TaskController')

router.get('/', taskController.getAll)

router.post('/create', taskController.create);



router.put('/id/:_id', taskController.updateByTitle);

router.put('/markAsCompleted/:_id', async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params._id,
      { completed: true },
      { new: true }
    );
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.put('/id/:_id', async (req, res) => {
  try {
    const { title } = req.body;
    const task = await Task.findById(req.params._id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    task.title = title;
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/id/:_id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params._id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
