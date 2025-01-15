const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Sample in-memory database (could be replaced with a real database like MongoDB or SQL)
let jobs = [
  { id: 1, title: 'Frontend Developer', description: 'Work with React.js' },
  { id: 2, title: 'Backend Developer', description: 'Work with Node.js and Express' },
];

// Routes
app.get('/api/jobs', (req, res) => {
  res.json(jobs);
});

app.post('/api/jobs', (req, res) => {
  const newJob = req.body;
  newJob.id = jobs.length + 1; // Assign a new ID
  jobs.push(newJob);
  res.status(201).json(newJob);
});

app.put('/api/jobs/:id', (req, res) => {
  const { id } = req.params;
  const updatedJob = req.body;
  const jobIndex = jobs.findIndex((job) => job.id === parseInt(id));

  if (jobIndex !== -1) {
    jobs[jobIndex] = { ...jobs[jobIndex], ...updatedJob };
    res.json(jobs[jobIndex]);
  } else {
    res.status(404).send('Job not found');
  }
});

app.delete('/api/jobs/:id', (req, res) => {
  const { id } = req.params;
  jobs = jobs.filter((job) => job.id !== parseInt(id));
  res.status(204).send();
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
