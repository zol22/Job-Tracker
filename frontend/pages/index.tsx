import { useState} from 'react';
import { GetStaticProps } from 'next';
import AddJobForm from '../components/AddJobForm';
import JobList from '../components/JobList';
import Reminders from '../components/Reminders';
import { Job } from '../types';
import Affirmation from '../components/Affirmation';
import Image from 'next/image';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);
const Home = ({ initialJobs }: { initialJobs: Job[] }) => {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);

  const handleAddJob = async (job: { title: string; description: string; status: string }) => {
    const response = await fetch(`${apiUrl}/api/jobs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(job),
    });
    const newJob = await response.json();
    setJobs((prevJobs) => [...prevJobs, newJob]);
  };

  const handleDeleteJob = async (id: number) => {
    await fetch(`${apiUrl}/api/jobs/${id}`, { method: 'DELETE' });
    setJobs((prevJobs) => prevJobs.filter((job) => job.id !== id));
  };

  const handleUpdateStatus = async (id: number, status: string) => {
    const response = await fetch(`${apiUrl}/api/jobs/${id}/status`, {
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
    const response = await fetch(`${apiUrl}/api/jobs/${id}/comments`, {
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
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Section */}
        <div className="w-full lg:w-1/3 p-4 rounded-lg">
          <Affirmation />
          <Reminders />
          <Image
            src="/images/laptop.jpg"
            alt="Laptop image"
            width={500}
            height={500}
            priority
            className="w-full h-auto rounded-lg"
          />
        </div>
  
        {/* Right Section */}
        <div className="w-full lg:w-2/3 p-4 bg-white rounded-lg">
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


export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch(`${apiUrl}/api/jobs`);
  const initialJobs: Job[] = await response.json();

  return {
    props: {
      initialJobs,
    },
  };
};