import { useState } from 'react';
import { Job } from '../types';

const JobList = ({
  jobs,
  onUpdateStatus,
  onAddComment,
  onDelete,
}: {
  jobs: Job[];
  onUpdateStatus: (id: number, status: string) => void;
  onAddComment: (id: number, comment: string) => void;
  onDelete: (id: number) => void;
}) => {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null); // When a user clicks "View Details", selectedJob is updated with the corresponding job object.
  const [comment, setComment] = useState(''); // Keeps track of the input for the comment being added.
  //console.log(selectedJob)
  return (
    <div className="mt-4">
      <h2 className="uppercase tracking-wide text-gray-700 text-l font-bold mb-2">Job Applications</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {jobs.map((job) => (
          <li key={job.id} className="border p-4 rounded-lg shadow-md bg-white">
            <h3 className="font-semibold text-sm uppercase tracking-wide text-gray-700  mb-2">{job.title}</h3>
            <p className="text-sm text-gray-600">{job.company}</p>
            <p className="text-sm text-gray-600">{job.description}</p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Status:</span> {job.status}
            </p>
            <div className="mt-2 flex justify-between">
              <button
                className="bg-neutral-100 p-2 px-4 rounded-lg text-neutral-600 shadow-light-3 transition duration-150 ease-in-out hover:bg-neutral-200 hover:shadow-light-2 focus:bg-neutral-200 focus:shadow-light-2 focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-light-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                onClick={() => setSelectedJob(job)} // Set selected job to display details
              >
                View Details
              </button>
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

      {/*
        The modal is shown only when selectedJob is not null.
      */}
      {selectedJob && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-3/4">
            <h3 className="text-lg font-bold mb-2">{selectedJob.title}</h3>
            <p className="text-sm mb-4">{selectedJob.company}</p>
            <p className="text-sm mb-4">{selectedJob.description}</p>
            <h4 className="text-md font-semibold">Status</h4>
            <select
              value={selectedJob.status}
              onChange={(e) => onUpdateStatus(selectedJob.id, e.target.value)}
              className="border p-2 w-full mb-4"
            >
              <option value="Applied">Applied</option>
              <option value="Viewed">Viewed</option>
              <option value="Resume Downloaded">Resume Downloaded</option>
              <option value="Accepted">Accepted</option>
              <option value="Interview Scheduled">Interview Scheduled</option>
              <option value="Second Round Interview">Second Round Interview</option>
            </select>
            <h4 className="text-md font-semibold">Comments</h4>
            <ul className="list-disc ml-4 mb-4">
              {selectedJob.comments && selectedJob.comments.length > 0 ? (
                selectedJob.comments.map((comment, index) => (
                  <li key={index}>{comment}</li>
                ))
              ) : (
                <li>No comments yet</li>
              )}
            </ul>
            <textarea
              className="border p-2 w-full mb-4"
              placeholder="Add a comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              className="bg-green-500 text-white px-4 py-2 rounded"
              onClick={() => {
                onAddComment(selectedJob.id, comment);
                setComment('');
              }}
            >
              Add Comment
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded ml-4"
              onClick={() => setSelectedJob(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobList;
