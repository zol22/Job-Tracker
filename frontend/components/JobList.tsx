interface Job {
    id: number;
    title: string;
    description: string;
  }
  
  const JobList = ({
    jobs,
    onDelete,
  }: {
    jobs: Job[];
    onDelete: (id: number) => void;
  }) => {
    return (
      <div className="mt-4">
        <h2 className="text-xl font-bold mb-4">Available Jobs</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobs.map((job) => (
            <li key={job.id} className="border p-4 rounded-lg shadow-md bg-white">
              <h3 className="font-semibold text-lg">{job.title}</h3>
              <p className="text-sm text-gray-600">{job.description}</p>
              <div className="mt-2 flex justify-between">
                <button
                  className="text-white bg-red-500 hover:bg-red-600 px-4 py-1 rounded"
                  onClick={() => onDelete(job.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default JobList;
  