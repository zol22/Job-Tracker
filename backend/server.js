const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

// Middleware
app.use(express.json()); // middleware automatically parses this JSON string into a JavaScript object. 
app.use(
  cors({
    origin: ["http://localhost:3000", "https://silly-cucurucho-24341f.netlify.app"], // Replace with your frontend's deployed URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Optional if cookies/auth are involved
  })
);
// Sample in-memory database (could be replaced with a real database like MongoDB or SQL)
let jobs = [
    {
      id: 1,
      title: 'Frontend Developer',
      company: 'Facebook',
      description: 'Work with React.js',
      status: 'Applied',
      comments: ['Applied on January 10, 2025'],
      history: [{ status: 'Applied', date: '2025-01-10' }],
    },
    {
      id: 2,
      title: 'Backend Developer',
      company: 'Github',
      description: 'Work with Node.js and Express',
      status: 'Resume Downloaded',
      comments: ['Resume downloaded by recruiter on January 12, 2025'],
      history: [
        { status: 'Applied', date: '2025-01-08' },
        { status: 'Resume Downloaded', date: '2025-01-12' },
      ],
    },
    {
        id: 3,
        title: 'Full Stack Developer',
        company: 'Deloitte',
        description: 'Work with React, Express &  SQL',
        status: 'Viewed',
        comments: ['Resume viewed on January 22, 2025'],
        history: [
          { status: 'Applied', date: '2025-01-08' },
          { status: 'Resume viewed', date: '2025-01-22' },
        ],
    },
    {
        id: 4,
        title: 'Backend Developer',
        company: 'Youtube',
        description: 'Work with Node.js and Express',
        status: 'Resume Downloaded',
        comments: ['Resume downloaded by recruiter on January 12, 2025'],
        history: [
          { status: 'Applied', date: '2025-01-08' },
          { status: 'Resume Downloaded', date: '2025-01-12' },
        ],
    },
    {
        id: 5,
        title: 'Backend Developer',
        company: 'Amazon',
        description: 'Work with Node.js and Express',
        status: 'Resume Downloaded',
        comments: ['Resume downloaded by recruiter on January 12, 2025'],
        history: [
          { status: 'Applied', date: '2025-01-08' },
          { status: 'Resume Downloaded', date: '2025-01-12' },
        ],
    },
  ];

// Routes
app.get('/api/jobs', (req, res) => {
  res.json(jobs); // Sends back the newly created job  as a JSON response.
});

app.post('/api/jobs', (req, res) => {
  const newJob = req.body; // contains the parsed JSON object, thanks to express.json() middleware. It's already a JavaScript object (not a JSON string).
  newJob.id = jobs.length + 1; // Assign a new ID
  newJob.status = newJob.status || 'Applied'; // Default status
  jobs.push(newJob);
  res.status(201).json(newJob); //Sending back the job as JSON in the response body

});

// Add a comment to a job
app.post('/api/jobs/:id/comments', (req, res) => {
    const { id } = req.params;
    const { comment } = req.body;
    const job = jobs.find((job) => job.id === parseInt(id)); // we need to handle the fact that the id in the URL is a string, not a number. The id coming from the request URL is a string (because everything in the URL is a string).
    if (job) {
        // Initialize comments if it's undefined
        if (!job.comments) {
        job.comments = [];
        }
      job.comments.push(comment);
      res.json(job);
    } else {
      res.status(404).send('Job not found');
    }
  });

// Update status and history
app.put('/api/jobs/:id/status', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const job = jobs.find((job) => job.id === parseInt(id)); // converts the id from a string to an integer (a number).
    if (job) {
      job.status = status;
      job.history.push({ status, date: new Date().toISOString() });
      res.json(job);
    } else {
      res.status(404).send('Job not found');
    }
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
