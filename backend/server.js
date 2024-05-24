const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let tasks = [
  { id: uuidv4(), text: 'Learn React' },
  { id: uuidv4(), text: 'Learn Express' },
  { id: uuidv4(), text: 'Build a full-stack app' },
];

// Root route handler
app.get('/', (req, res) => {
    res.send('Server is running');
  });

// Get all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Get a specific task by ID
app.get('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  const task = tasks.find(task => task.id === taskId);
  if (!task) {
    // Task not found, return 404 error
    return res.status(404).json({ error: 'Task not found' });
  }
  res.json(task);
});

// Add a new task
app.post('/tasks', (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: 'Text is required for the task' });
  }
  const task = { id: uuidv4(), text };
  tasks.push(task);
  res.status(201).json(task);
});

// Delete a task by ID
app.delete('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  tasks = tasks.filter(task => task.id !== taskId);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

