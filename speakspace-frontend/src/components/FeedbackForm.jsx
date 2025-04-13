import { useState } from "react";
import axios from "axios";

const FeedbackForm = ({ sessionId, participants = [] }) => {
  const [participantName, setParticipantName] = useState("");
  const [communication, setCommunication] = useState(0);
  const [clarity, setClarity] = useState(0);
  const [teamwork, setTeamwork] = useState(0);
  const [comments, setComments] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    const evaluator = JSON.parse(localStorage.getItem("user"));

    // Find participant by name
    const participant = participants.find(
      (p) => p.name.toLowerCase() === participantName.toLowerCase()
    );

    if (!participant) {
      setError("Participant not found. Please enter a valid name.");
      return;
    }

    if (communication === 0 && clarity === 0 && teamwork === 0) {
      setError("Please provide at least one rating.");
      return;
    }

    try {
      setIsSubmitting(true);
      setError("");
      
      await axios.post("http://localhost:5000/api/feedback/submit", {
        sessionId,
        participantId: participant._id,
        evaluatorId: evaluator._id,
        communication,
        clarity,
        teamwork,
        comments,
      });
      
      setSuccess(true);
      setParticipantName("");
      setComments("");
      setCommunication(0);
      setClarity(0);
      setTeamwork(0);
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (err) {
      console.error(err);
      setError("Feedback submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render radio buttons for 0-10 ratings
  const renderRadioGroup = (label, selectedValue, setValue) => {
    const options = Array.from({ length: 11 }, (_, i) => i);
    return (
      <div className="mb-4">
        <label className="block text-gray-300 font-medium mb-2">
          {label}:
        </label>
        <div className="flex flex-wrap gap-2">
          {options.map((option) => (
            <label 
              key={option} 
              className={`flex items-center justify-center w-8 h-8 rounded-full cursor-pointer transition-all duration-200 ${
                selectedValue === option 
                  ? 'bg-gradient-to-r from-teal-400 to-cyan-300 text-gray-900 font-bold' 
                  : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
              }`}
            >
              <input
                type="radio"
                name={label}
                value={option}
                checked={selectedValue === option}
                onChange={() => setValue(option)}
                className="sr-only"
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-2xl border border-gray-700/50">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 bg-teal-400/20 rounded-full flex items-center justify-center mr-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-gray-200">Submit Feedback</h3>
      </div>
      
      {error && (
        <div className="bg-red-500/20 border border-red-500/50 text-red-400 p-3 rounded-lg mb-4 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          {error}
        </div>
      )}
      
      {success && (
        <div className="bg-green-500/20 border border-green-500/50 text-green-400 p-3 rounded-lg mb-4 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Feedback submitted successfully!
        </div>
      )}
      
      <div className="mb-4">
        <label className="block text-gray-300 font-medium mb-2">
          Participant Name:
        </label>
        <div className="relative">
          <input
            type="text"
            placeholder="Type participant's name"
            value={participantName}
            onChange={(e) => setParticipantName(e.target.value)}
            className="w-full p-3 pl-10 bg-gray-700/50 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 border border-gray-600/50 transition-all duration-300"
          />
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-3 top-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <p className="text-xs text-gray-400 mt-1">
          Available participants: {participants.map(p => p.name).join(", ")}
        </p>
      </div>
      
      <div className="mb-4">
        <h4 className="text-gray-300 font-medium mb-3">Ratings (0-10)</h4>
        {renderRadioGroup("Communication", communication, setCommunication)}
        {renderRadioGroup("Clarity", clarity, setClarity)}
        {renderRadioGroup("Teamwork", teamwork, setTeamwork)}
      </div>
      
      <div className="mb-4">
        <label className="block text-gray-300 font-medium mb-2">
          Comments:
        </label>
        <textarea
          placeholder="Add your feedback comments here..."
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          className="w-full p-3 bg-gray-700/50 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 border border-gray-600/50 transition-all duration-300 min-h-[100px]"
        />
      </div>
      
      <button
        onClick={handleSubmit}
        disabled={isSubmitting}
        className="w-full p-3 bg-gradient-to-r from-teal-400 to-cyan-300 text-gray-900 font-bold rounded-lg hover:from-teal-500 hover:to-cyan-400 transition duration-300 shadow-lg flex items-center justify-center"
      >
        {isSubmitting ? (
          <>
            <div className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin mr-2"></div>
            <span>Submitting...</span>
          </>
        ) : (
          <>
            <span>Submit Feedback</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </>
        )}
      </button>
    </div>
  );
};

export default FeedbackForm;
