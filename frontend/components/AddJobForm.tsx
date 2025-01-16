// components/AddJobForm.tsx
import { useState } from 'react';

const AddJobForm = ({ onAdd }: { onAdd: (job: { title: string; description: string }) => void }) => {
  const [job, setJob] = useState({ title: '', description: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(job);
    setJob({ title: '', description: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block font-medium">Job Title</label>
        <input
          type="text"
          value={job.title}
          onChange={(e) => setJob({ ...job, title: e.target.value })}
          className="border p-2 w-full"
        />
      </div>
      <div>
        <label className="block font-medium">Job Description</label>
        <input
          type="text"
          value={job.description}
          onChange={(e) => setJob({ ...job, description: e.target.value })}
          className="border p-2 w-full"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Add Job
      </button>
    </form>
  );
};

export default AddJobForm;
