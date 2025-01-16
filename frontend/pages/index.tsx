import { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import AddJobForm from '../components/AddJobForm';
import JobList from '../components/JobList';

interface Job {
  id: number;
  title: string;
  description: string;
  status: string;
  comments: string[];
  history: { status: string; date: string }[];
}

const Home = () => {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const response = await fetch('http://localhost:5000/api/jobs');
      const data = await response.json();
      setJobs(data);
    };

    fetchJobs();
  }, []);

  const handleAddJob = async (job: { title: string; description: string; status: string }) => {
    const response = await fetch('http://localhost:5000/api/jobs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(job),
    });
    const newJob = await response.json();
    setJobs((prevJobs) => [...prevJobs, newJob]);
  };

  const handleDeleteJob = async (id: number) => {
    await fetch(`http://localhost:5000/api/jobs/${id}`, { method: 'DELETE' });
    setJobs((prevJobs) => prevJobs.filter((job) => job.id !== id));
  };

  const handleUpdateStatus = async (id: number, status: string) => {
    const response = await fetch(`http://localhost:5000/api/jobs/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    const updatedJob = await response.json();
    setJobs((prevJobs) =>
      prevJobs.map((job) => (job.id === id ? updatedJob : job))
    );
  };

  const handleAddComment = async (id: number, comment: string) => {
    const response = await fetch(`http://localhost:5000/api/jobs/${id}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ comment }),
    });
    const updatedJob = await response.json();
    setJobs((prevJobs) =>
      prevJobs.map((job) => (job.id === id ? updatedJob : job))
    );
  };

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-4">Welcome to the Job Tracker Dashboard</h1>
      <AddJobForm onAdd={handleAddJob} />
      <JobList
        jobs={jobs}
        onUpdateStatus={handleUpdateStatus}
        onAddComment={handleAddComment}
        onDelete={handleDeleteJob}
      />
    </DashboardLayout>
  );
};

export default Home;
