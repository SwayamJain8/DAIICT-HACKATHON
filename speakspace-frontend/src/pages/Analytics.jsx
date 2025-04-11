// src/pages/Analytics.jsx
import { useEffect, useState } from "react";
import axios from "axios";

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
    <div style={{ padding: "2rem" }}>
      <h2>Your Feedback History</h2>
      {feedbacks.length === 0 ? (
        <p>No feedback found.</p>
      ) : (
        feedbacks.map((fb, i) => (
          <div
            key={i}
            style={{
              border: "1px solid #ccc",
              padding: "1rem",
              margin: "1rem 0",
            }}
          >
            <p>
              <strong>Communication:</strong> {fb.communication}
            </p>
            <p>
              <strong>Clarity:</strong> {fb.clarity}
            </p>
            <p>
              <strong>Teamwork:</strong> {fb.teamwork}
            </p>
            <p>
              <strong>Comments:</strong> {fb.comments}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default Analytics;
