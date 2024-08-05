const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, '../public')));

// User data storage (in-memory)
let users = [];

// POST /users - Create a new user
app.post('/users', (req, res) => {
  const { name, email, username } = req.body;
  const id = users.length + 1;
  const newUser = { id, name, email, username };
  users.push(newUser);
  res.status(201).json(newUser);
});

// GET /users - Get all users
app.get('/users', (req, res) => {
  res.json(users);
});

// GET /users/:id - Get a specific user by id
app.get('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const user = users.find(u => u.id === userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json(user);
});

// PUT /users/:id - Update a specific user
app.put('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const userIndex = users.findIndex(u => u.id === userId);
  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }
  const { name, email, username } = req.body;
  users[userIndex] = { id: userId, name, email, username };
  res.json(users[userIndex]);
});

// DELETE /users/:id - Delete a specific user
app.delete('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const userIndex = users.findIndex(u => u.id === userId);
  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }
  users.splice(userIndex, 1);
  res.status(204).send(); // No content
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
