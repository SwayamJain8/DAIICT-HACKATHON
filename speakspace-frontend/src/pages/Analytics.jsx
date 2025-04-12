import { useEffect, useState } from "react";
import axios from "axios";
import SimpleLineChart from "../graphs/SimpleLineChart";

const Analytics = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      try {
        const res = await axios.get(
          `http://localhost:5000/api/feedback/user/${user._id}`
        );
        const feedbackData = res.data;

        // Filter non-empty comments
        const filteredComments = feedbackData
          .filter((fb) => fb.comments && fb.comments.trim() !== "")
          .map((fb) => ({
            comment: fb.comments,
            feedbackNumber: feedbackData.indexOf(fb) + 1,
          }));

        setFeedbacks(feedbackData);
        setComments(filteredComments);
      } catch (err) {
        console.error(err);
      }
    };
    fetchFeedbacks();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white p-6">
      <h2 className="text-3xl font-bold text-teal-400 text-center mb-6">
        Your Feedback Analytics
      </h2>

      {/* Display Non-Empty Comments */}
      {comments.length > 0 ? (
        <div className="mb-6">
          <h3 className="text-2xl font-semibold text-teal-400 mb-4">
            Feedback Comments
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {comments.map((comment, i) => (
              <div
                key={i}
                className="bg-gray-800 p-4 rounded-lg shadow-lg hover:shadow-teal-400 transition duration-300"
              >
                <p className="text-lg font-bold text-teal-400 mb-2">
                  Feedback {comment.feedbackNumber}
                </p>
                <p className="text-gray-300">{comment.comment}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-400 mb-6">
          No comments available in feedback.
        </p>
      )}

      {/* Plot Feedback Data in Graph */}
      <div className="mt-6">
        <h3 className="text-2xl font-semibold text-teal-400 text-center mb-4">
          Feedback Trends
        </h3>
        <SimpleLineChart feedbacks={feedbacks} />
      </div>
    </div>
  );
};

export default Analytics;
