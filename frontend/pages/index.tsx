// frontend/pages/index.tsx
import { useEffect, useState } from 'react';

interface Job {
  id: number;
  title: string;
  description: string;
}
interface NewJob {
  title: string;
  description: string;
}

const Home = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [newJob, setNewJob] = useState<NewJob>({ title: '', description: '' });

  // Fetch Jobs from API
  useEffect(() => {
    const fetchJobs = async () => {
      const response = await fetch('http://localhost:5000/api/jobs');
      const data = await response.json();
      setJobs(data);
    };
    fetchJobs();
  }, []);

  // Handle Form Input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    setNewJob((prevState) => ({ ...prevState, [field]: e.target.value }));
  };

  // Add Job
  const addJob = async () => {
    const response = await fetch('http://localhost:5000/api/jobs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newJob),
    });
    const data = await response.json();
    setJobs((prevJobs) => [...prevJobs, data]); // Add the new job to the list
    setNewJob({ title: '', description: '' }); // Clear the form
  };

  // Delete Job
  const deleteJob = async (id: number) => {
    await fetch(`http://localhost:5000/api/jobs/${id}`, { method: 'DELETE' });
    setJobs(jobs.filter((job) => job.id !== id)); // Remove the deleted job from the list
  };

  // Update Job
  const updateJob = async (id: number, updatedJob: { title: string; description: string }) => {
    const response = await fetch(`http://localhost:5000/api/jobs/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedJob),
    });
    const data = await response.json();
    setJobs(jobs.map((job) => (job.id === id ? data : job))); // Update the job in the list
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-blue-600 mb-8 text-center">
          Job Tracker Dashboard
        </h1>

        {/* Add Job Form */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Add New Job</h2>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <input
              type="text"
              className="border border-gray-300 rounded-lg px-4 py-2 flex-grow"
              placeholder="Job Title"
              value={newJob.title}
              onChange={(e) => handleInputChange(e, 'title')}
            />
            <input
              type="text"
              className="border border-gray-300 rounded-lg px-4 py-2 flex-grow"
              placeholder="Job Description"
              value={newJob.description}
              onChange={(e) => handleInputChange(e, 'description')}
            />
            <button
              className="bg-blue-500 text-white rounded-lg px-6 py-2 hover:bg-blue-600"
              onClick={addJob}
            >
              Add Job
            </button>
          </div>
        </div>

        {/* Job Listings */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Available Jobs</h2>
          <ul className="space-y-4">
            {jobs.map((job) => (
              <li key={job.id} className="flex justify-between items-center p-4 border rounded-lg bg-gray-50 shadow-sm">
                <div>
                  <h3 className="text-lg font-bold text-gray-800">{job.title}</h3>
                  <p className="text-gray-600">{job.description}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                    onClick={() => updateJob(job.id, { title: 'Updated Title', description: 'Updated Description' })}
                  >
                    Update
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                    onClick={() => deleteJob(job.id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
