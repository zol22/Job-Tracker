import { useState, useEffect } from 'react';
import AddJobForm from '../components/AddJobForm';
import JobList from '../components/JobList';
import Reminders from '../components/Reminders';
import { Job } from '../types';
import Affirmation from '../components/Affirmation';
import Image from 'next/image';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);



const Home = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  /* 
    Why Maintain State in the Frontend?
    Immediate Feedback:
      After an API call (e.g., adding a job), the frontend updates immediately by modifying the jobs state.
      Without this, the user would have to refresh the page to see changes.
    Local UI Logic:
      The state allows the component to manage and display data without repeatedly calling the API.
      Example: When deleting a job, jobs is filtered locally to remove the deleted job, reducing unnecessary API calls.

    `.json()` method in JavaScript has a dual role depending on where it's being used.
    Serialization: Converts a JavaScript object into a JSON string (done using JSON.stringify()).
    Deserialization: Converts a JSON string back into a JavaScript object (done using response.json()).
    */

  useEffect(() => {
    const fetchJobs = async () => {
      const response = await fetch(`${apiUrl}/api/jobs`);
      const data = await response.json();
      setJobs(data);
    };

    fetchJobs();
  }, []);
  console.log(jobs)


  const handleAddJob = async (job: { title: string; description: string; status: string }) => {
    const response = await fetch(`${apiUrl}/api/jobs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }, // tells the server that the data being sent in the body is in JSON format.
      body: JSON.stringify(job),//job is already an object structured exactly as the backend expects. Converts the JavaScript object (job) into a JSON string.

    });
    const newJob = await response.json(); // This converts the response body (which is in JSON format) into a JavaScript object.
    setJobs((prevJobs) => [...prevJobs, newJob]);
  };

  const handleDeleteJob = async (id: number) => {
    await fetch(`${apiUrl}/api/jobs/${id}`, { method: 'DELETE' });
    setJobs((prevJobs) => prevJobs.filter((job) => job.id !== id));
  };

  const handleUpdateStatus = async (id: number, status: string) => {
    const response = await fetch(`${apiUrl}/api/jobs/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' }, // tells the server that the data being sent in the body is in JSON format.
      body: JSON.stringify({ status }), // Status Need to wrap it in another object. Converts the JavaScript object (job) into a JSON string.
    });
    const updatedJob = await response.json(); // This converts the response body (which is in JSON format) into a JavaScript object.
    setJobs((prevJobs) =>
      prevJobs.map((job) => (job.id === id ? updatedJob : job))
    );
  };

  const handleAddComment = async (id: number, comment: string) => {
    const response = await fetch(`${apiUrl}/api/jobs/${id}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }, // tells the server that the data being sent in the body is in JSON format.
      body: JSON.stringify({ comment}), // Comment Need to wrap it in another object Equals to {comment: comment} Wraps the string in an object with a `comment` key. Converts the JavaScript object (job) into a JSON string. 
    });
    const updatedJob = await response.json(); // This converts the response body (which is in JSON format) into a JavaScript object.
    setJobs((prevJobs) =>
      prevJobs.map((job) => (job.id === id ? updatedJob : job))
    );
  };

  return (
    <div className="min-h-screen p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
              {/* Left Column */}
              <div className="flex flex-col gap-2 w-full lg:w-1/3 bg-neutral-100">
                  <Affirmation />
                  <Reminders />
                  {/* Image Section */}
                  <div className="bg-neutral-100 p-4 rounded-lg shadow-lg">
                
                      <Image src="/images/laptop.jpg" alt="Laptop image" width={500} height={500} priority className="w-full h-auto rounded-lg"
                      />
                  </div>
              </div>
              {/* Main Content */}
              <div className="flex-1 p-6">
                <h1 className="text-l font-bold mb-4 uppercase tracking-wide text-gray-700">Welcome to the Job Tracker Dashboard</h1>
                  <AddJobForm onAdd={handleAddJob} />
                  <JobList
                    jobs={jobs}
                    onUpdateStatus={handleUpdateStatus}
                    onAddComment={handleAddComment}
                    onDelete={handleDeleteJob}
                  />
              </div>
    </div>
    </div>
  );
};

export default Home;
