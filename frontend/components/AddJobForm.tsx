import { useState } from 'react';

interface NewJob {
  title: string;
  company: string;
  description: string;
  status: string;
}
/* 
  - The parent component provides the onAdd function.
  - The child component (AddJobForm) calls this onAdd function when the user submits the form.
  - ({ onAdd }), Props Destructuring: This means: "Extract the onAdd property from the props object passed to the component. W/0 destrucuturing, it will use props.onAdd instead
  -  : { onAdd: (job: NewJob) => void } , This part tells TypeScript what type onAdd is.
      It says:
      The props object passed to AddJobForm has one key: onAdd.
      onAdd is a function.
      The onAdd function takes one argument, job, which must be of type NewJob.
      It doesn’t return anything (void).

*/
const AddJobForm = ({ onAdd }: { onAdd: (job: NewJob) => void }) => { 
  
  const [newJob, setNewJob] = useState<NewJob>({
    title: '',
    company: '',
    description: '',
    status: 'Applied', // Default status
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, field: string) => {
    setNewJob((prevState) => ({ 
      ...prevState, 
      [field]: e.target.value })); // Dynamically sets or updates the key specified by field with the new value from the input (e.target.value).
      /* Ex: 
        newJob = {
          title: 'Software Engineer',   // Updated value
          description: '',              // Unchanged
          status: 'Applied',            // Unchanged
        }; 
      */
  };

  const handleSubmit = () => {
    onAdd(newJob); // Sends the newJob data to the parent for further processing (e.g., saving to the backend).
    setNewJob({ title: '', company: '', description: '', status: 'Applied' }); // Reset form after submission
  };
  //console.log(newJob)

  return (
    <div className="mb-4 p-4 border border-gray-300 rounded-lg shadow-sm bg-white w-full max-w-2xl">
      <h2 className="text-sm uppercase mb-4 tracking-wide text-gray-700 font-bold">Add New Job</h2>
      <div className="flex flex-wrap gap-x-6 gap-y-2">
        <div className='flex-1 min-w-[200px] px-3 mb-6 border-b border-gray-400 '>
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Job Title</label>
          <input
            type="text"
            placeholder="Enter job title"
            value={newJob.title}
            onChange={(e) => handleInputChange(e, 'title')}
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
          />
        </div>

        <div className='flex-1 min-w-[200px] px-3 mb-6 border-b border-gray-400'>
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Company</label>
          <input
            type="text"
            placeholder="Enter company name"
            value={newJob.company}
            onChange={(e) => handleInputChange(e, 'company')}
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
          />
        </div>

        <div className='flex-1 min-w-[200px] px-3 mb-6 border-b border-gray-400'>
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Job Description</label>
          <input
            type="text"
            placeholder="Enter job description"
            value={newJob.description}
            onChange={(e) => handleInputChange(e, 'description')}
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
          />
        </div>

        <div className='w-full md:w-1/2 px-3 mb-6 '>
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Status</label>
          <select
            value={newJob.status}
            onChange={(e) => handleInputChange(e, 'status')}
            className=" block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          >
            <option value="Applied">Applied</option>
            <option value="Viewed">Viewed</option>
            <option value="Resume Downloaded">Resume Downloaded</option>
            <option value="Interview Scheduled">Interview Scheduled</option>
            <option value="Second Round Interview">Second Round Interview</option>
            <option value="Offer Received">Offer Received</option>
            <option value="Accepted">Accepted</option>
            <option value="Rejected">Rejected</option>
            <option value="Withdrawn">Withdrawn</option>

          </select>
        </div>

        <div className="px-3 ">
          <button
            onClick={handleSubmit}
            className="bg-neutral-800 text-white px-4 py-2 rounded-lg hover:bg-neutral-700"
          >
            Add Job
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddJobForm;
