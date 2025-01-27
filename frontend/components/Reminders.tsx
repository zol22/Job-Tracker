import { useState } from "react";

const Reminders = () => {
  const [reminders, setReminders] = useState<string[]>([]);
  const [newReminder, setNewReminder] = useState("");

  const handleAddReminder = () => {
    if (newReminder.trim() !== "") {
      setReminders((prev) => [...prev, newReminder]);
      setNewReminder(""); // Clear input field
    }
  };

  const handleDeleteReminder = (index: number) => {
    setReminders((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="p-6 flex justify-center items-start">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        {/* Header */}
        <h1 className="text-lg font-semibold text-neutral-800 mb-4">
          Reminders
        </h1>
        <p className="text-sm text-neutral-600 mb-4">
          Keep track of follow-ups, interview preparations, and other tasks.
        </p>

        {/* Add Reminder */}
        <div>
          <input
            type="text"
            placeholder="Add a new reminder..."
            value={newReminder}
            onChange={(e) => setNewReminder(e.target.value)}
            className="w-full px-4 py-2 mb-4 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-500 focus:outline-none text-neutral-800"
          />
          <button
            onClick={handleAddReminder}
            className="bg-neutral-800 text-white px-4 py-2 mb-4 rounded-lg hover:bg-neutral-700"
          >
            Add
          </button>
        </div>

        {/* Reminder List */}
        <div className="space-y-2">
          {reminders.length > 0 ? (
            reminders.map((reminder, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-2 bg-neutral-50 rounded-md shadow-sm"
              >
                <span className="text-neutral-800 text-sm">{reminder}</span>
                <button
                  onClick={() => handleDeleteReminder(index)}
                  className="text-red-500 hover:text-red-700 font-semibold text-sm"
                >
                  Delete
                </button>
              </div>
            ))
          ) : (
            <p className="text-neutral-500 italic text-sm">
              No reminders yet. Add your first one!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reminders;
