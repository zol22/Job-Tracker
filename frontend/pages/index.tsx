// pages/index.tsx
import { useEffect, useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import AddJobForm from '../components/AddJobForm';
import JobList from '../components/JobList';

interface Job {
  id: number;
  title: string;
  description: string;
}

const Home = () => {
  const [jobs, setJobs] = useState<Job[]>([]);

  // Fetch jobs from backend
  useEffect(() => {
    const fetchJobs = async () => {
      const response = await fetch('http://localhost:5000/api/jobs');
      const data = await response.json();
      setJobs(data);
    };

    fetchJobs();
  }, []);

  // Add a new job
  const handleAddJob = async (job: { title: string; description: string }) => {
    const response = await fetch('http://localhost:5000/api/jobs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(job),
    });
    const newJob = await response.json();
    setJobs((prevJobs) => [...prevJobs, newJob]);
  };

  // Delete a job
  const handleDeleteJob = async (id: number) => {
    await fetch(`http://localhost:5000/api/jobs/${id}`, { method: 'DELETE' });
    setJobs((prevJobs) => prevJobs.filter((job) => job.id !== id));
  };

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-4">Welcome to the Job Tracker Dashboard</h1>
      <AddJobForm onAdd={handleAddJob} />
      <JobList jobs={jobs} onDelete={handleDeleteJob} />
    </DashboardLayout>
  );
};

export default Home;
