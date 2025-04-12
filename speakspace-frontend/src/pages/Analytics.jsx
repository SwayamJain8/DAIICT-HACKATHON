import { useEffect, useState } from "react";
import axios from "axios";
import SimpleLineChart from "../graphs/SimpleLineChart";

const Analytics = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      try {
        const res = await axios.get(
          `http://localhost:5000/api/feedback/user/${user._id}`
        );
        setFeedbacks(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchFeedbacks();
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white p-6">
        <h2 className="text-3xl font-bold text-teal-400 text-center mb-6">
          Your Feedback History
        </h2>
        {feedbacks.length === 0 ? (
          <p className="text-center text-gray-400">No feedback found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {feedbacks.map((fb, i) => (
              <div
                key={i}
                className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-teal-400 transition duration-300"
              >
                <p className="text-lg font-bold text-teal-400 mb-2">
                  Feedback {i + 1}
                </p>
                <p className="text-gray-300">
                  <strong>Communication:</strong> {fb.communication}
                </p>
                <p className="text-gray-300">
                  <strong>Clarity:</strong> {fb.clarity}
                </p>
                <p className="text-gray-300">
                  <strong>Teamwork:</strong> {fb.teamwork}
                </p>
                <p className="text-gray-300">
                  <strong>Comments:</strong> {fb.comments}
                </p>
              </div>
            ))}
          </div>
        )}
        <SimpleLineChart />
      </div>
    </>
  );
};

export default Analytics;
