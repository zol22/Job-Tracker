import { useState } from "react";
import { Job } from "../types";

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
  const [selectedJob, setSelectedJob] = useState<Job | null>(null); // Tracks the job being viewed in the modal. It is either a Job object or null when no job is selected.
  const [comment, setComment] = useState("");
  const [activeTab, setActiveTab] = useState("All"); // Tracks the currently selected tab for filtering jobs

  /* 
    Key Type (string): Specifies that the keys of this object are strings ("All", "Applied", etc.).
    Value Type (string[]): Specifies that the values are arrays of strings (e.g., job statuses like ["Applied", "Viewed"]).
  */
  const statusCategories: Record<string, string[]> = { // Record is a TypeScript utility type that defines an object with specific key-value pairs
    All: [],
    Applied: ["Applied", "Viewed", "Resume Downloaded"],
    Interviewing: ["Interview Scheduled", "Second Round Interview"],
    Offers: ["Offer Received", "Accepted"],
    Archived: ["Rejected", "Withdrawn"],
  };

  // Filter jobs based on active tab
  const filteredJobs =
    activeTab === "All"
      ? jobs
      : jobs.filter((job) => statusCategories[activeTab]?.includes(job.status));// Why Use ?. (Optional Chaining)?: Ensures that statusCategories[activeTab] exists before calling .includes() to avoid errors.

  return (
    <div className="mt-4 p-6 bg-neutral-100 rounded-lg shadow-md">
      <h2 className="uppercase tracking-wide text-gray-700 text-xl font-bold mb-4">
        Job Applications
      </h2>

  {/* 
    Object.keys(statusCategories):
      Retrieves an array of the keys from statusCategories (e.g., ["All", "Applied", "Interviewing", "Offers", "Archived"]).
    Dynamic Button Creation:
      Loops through the keys to create a button for each tab.
      Updates activeTab when a button is clicked.
    Conditional Styling:
      The active tab is highlighted using a bold underline (border-b-2).

    overflow-x-auto on Tabs Container:
      overflow-x-auto makes the tabs scrollable horizontally when the screen is too small (e.g., mobile).
      whitespace-nowrap ensures that the tabs stay in a single row and don’t wrap onto the next line.

  */}
      <div className="flex gap-4 mb-4 border-b border-neutral-300  overflow-x-auto whitespace-nowrap">
        {Object.keys(statusCategories).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-semibold ${
              activeTab === tab
                ? "text-neutral-800 border-b-2 border-neutral-800"
                : "text-neutral-500 hover:text-neutral-800"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Job Table */}
      <div className="overflow-x-auto">
      <table className="w-full text-left text-sm bg-white rounded-lg shadow-sm">
        <thead className="bg-neutral-200 text-neutral-700">
          <tr>
            <th className="px-4 py-2">Title</th>
            <th className="px-4 py-2">Company</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <tr
                key={job.id}
                className="border-b border-neutral-300 hover:bg-neutral-100"
              >
                <td className="px-4 py-2">{job.title}</td>
                <td className="px-4 py-2">{job.company}</td>
                <td className="px-4 py-2">{job.status}</td>
                <td className="px-4 py-2 flex gap-2">
                  <button
                    className="text-blue-500 hover:underline"
                    onClick={() => setSelectedJob(job)}
                  >
                    View Details
                  </button>
                  <button
                    className="text-red-500 hover:underline"
                    onClick={() => onDelete(job.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="px-4 py-4 text-center text-neutral-500">
                No jobs found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      </div>

      {/* Modal */}
      {selectedJob && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-3/4 shadow-lg">
            <h3 className="text-lg font-bold mb-2">{selectedJob.title}</h3>
            <p className="text-sm mb-4">{selectedJob.company}</p>
            <p className="text-sm mb-4">{selectedJob.description}</p>
            <h4 className="text-md font-semibold">Status</h4>
            <select
              value={selectedJob.status}
              /* 
              What It Does:
                Updates the selectedJob object in the local state to reflect the newly selected status.
                Ensures the dropdown shows the new status immediately after a change.
              How It Works:
                prev: Refers to the current selectedJob object.
                { ...prev, status: newStatus }: Creates a new object with the same properties as prev but with an updated status. */
              onChange={(e) => {
                const newStatus = e.target.value;
                onUpdateStatus(selectedJob.id, newStatus); // Update status in the parent state
                setSelectedJob((prev) => prev ? { ...prev, status: newStatus } : null); // Update the local `selectedJob` state
              }}
              className="border p-2 w-full mb-4"
            >
              <option value="Applied">Applied</option>
              <option value="Viewed">Viewed</option>
              <option value="Resume Downloaded">Resume Downloaded</option>
              <option value="Interview Scheduled">Interview Scheduled</option>
              <option value="Second Round Interview">
                Second Round Interview
              </option>
              <option value="Offer Received">Offer Received</option>
              <option value="Accepted">Accepted</option>
              <option value="Rejected">Rejected</option>
              <option value="Withdrawn">Withdrawn</option>
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
            <div className="flex gap-4">
              <button
                className="bg-neutral-800 text-white px-4 py-2 rounded-lg hover:bg-neutral-700"
                onClick={() => {
                  onAddComment(selectedJob.id, comment);
                  setComment("");
                }}
              >
                Add Comment
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => setSelectedJob(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobList;
