import { useState } from 'react';

interface NewJob {
  title: string;
  description: string;
  status: string;
}

const AddJobForm = ({ onAdd }: { onAdd: (job: NewJob) => void }) => {
  const [newJob, setNewJob] = useState<NewJob>({
    title: '',
    description: '',
    status: 'Applied', // Default status
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, field: string) => {
    setNewJob((prevState) => ({ ...prevState, [field]: e.target.value }));
  };

  const handleSubmit = () => {
    onAdd(newJob);
    setNewJob({ title: '', description: '', status: 'Applied' }); // Reset form after submission
  };

  return (
    <div className="mb-4 p-4 border border-gray-300 rounded-lg shadow-sm bg-white">
      <h2 className="text-xl font-semibold mb-4">Add New Job</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Job Title</label>
          <input
            type="text"
            placeholder="Enter job title"
            value={newJob.title}
            onChange={(e) => handleInputChange(e, 'title')}
            className="border p-2 w-full rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Job Description</label>
          <input
            type="text"
            placeholder="Enter job description"
            value={newJob.description}
            onChange={(e) => handleInputChange(e, 'description')}
            className="border p-2 w-full rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            value={newJob.status}
            onChange={(e) => handleInputChange(e, 'status')}
            className="border p-2 w-full rounded-lg"
          >
            <option value="Applied">Applied</option>
            <option value="Viewed">Viewed</option>
            <option value="Resume Downloaded">Resume Downloaded</option>
            <option value="Accepted">Accepted</option>
            <option value="Interview Scheduled">Interview Scheduled</option>
            <option value="Second Round Interview">Second Round Interview</option>
            <option value="Offer Received">Offer Received</option>
          </select>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white p-2 px-6 rounded-lg hover:bg-blue-600"
          >
            Add Job
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddJobForm;
