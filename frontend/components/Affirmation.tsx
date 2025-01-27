import { useState } from "react";

const Affirmation = () => {
  const [affirmation, setAffirmation] = useState<string>(""); //Tracks the text entered in the input field.
  const [savedAffirmation, setSavedAffirmation] = useState<string | null>(null); // Stores the saved affirmation for the day. It determines whether the input or the saved text is displayed.

  const handleSaveAffirmation = () => {
    if (affirmation.trim() !== "") {
      setSavedAffirmation(affirmation);
      setAffirmation(""); // Clear the input after saving
    }
  };

  return (
    <div className="p-6 flex justify-center items-start">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        {/* Header */}
        <h1 className="text-lg font-semibold text-neutral-800 mb-4">
          Today&apos;s Affirmation
        </h1>

        {savedAffirmation ? (
          // Display saved affirmation
          <div className="mb-4">
            <p className="text-sm text-neutral-700 italic">
              {savedAffirmation}
            </p>
            <button
              onClick={() => setSavedAffirmation(null)}
              className="mt-2 text-neutral-500 hover:underline text-sm"
            >
              Edit Affirmation
            </button>
          </div>
        ) : (
          // Input for adding affirmation
          <div>
            <textarea
              placeholder="Write your affirmation for today..."
              value={affirmation}
              onChange={(e) => setAffirmation(e.target.value)}
              className="w-full border border-neutral-300 rounded-lg p-3 text-sm text-neutral-700 focus:ring-2 focus:ring-neutral-500 focus:outline-none resize-none"
              rows={4}
            />
            <button
              onClick={handleSaveAffirmation}
              className="bg-neutral-800 text-white px-4 py-2 rounded-lg mt-4 hover:bg-neutral-700"
            >
              Add
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Affirmation;
