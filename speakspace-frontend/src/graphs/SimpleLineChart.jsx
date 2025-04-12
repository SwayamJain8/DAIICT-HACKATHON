import React, { useEffect, useState } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import axios from "axios";

export default function SimpleLineChart() {
  const [communication, setCommunication] = useState([]);
  const [clarity, setClarity] = useState([]);
  const [teamwork, setTeamwork] = useState([]);
  const [xLabels, setXLabels] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      try {
        const res = await axios.get(
          `http://localhost:5000/api/feedback/user/${user._id}`
        );
        const feedbacks = res.data;

        // Extract data for the last 10 feedbacks
        const communicationData = feedbacks
          .map((fb) => fb.communication)
          .reverse();
        const clarityData = feedbacks.map((fb) => fb.clarity).reverse();
        const teamworkData = feedbacks.map((fb) => fb.teamwork).reverse();
        const labels = feedbacks
          .map((_, index) => `Feedback ${feedbacks.length - index}`)
          .reverse();

        setCommunication(communicationData);
        setClarity(clarityData);
        setTeamwork(teamworkData);
        setXLabels(labels);
      } catch (err) {
        console.error("Failed to fetch feedback data", err);
      }
    };

    fetchFeedbacks();
  }, []);

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex justify-center items-center">
      <LineChart
        className="rounded-lg"
        width={800}
        height={500}
        series={[
          { data: communication, label: "Communication", color: "#00FFCC" },
          { data: clarity, label: "Clarity", color: "#FF5733" },
          { data: teamwork, label: "Teamwork", color: "#FFC300" },
        ]}
        xAxis={[
          {
            scaleType: "point",
            data: xLabels,
            label: "Feedback Instances",
            labelStyle: { fill: "#FFFFFF", fontSize: 14 },
            tickStyle: { fill: "#FFFFFF" },
          },
        ]}
        yAxis={[
          {
            label: "Scores",
            labelStyle: { fill: "#FFFFFF", fontSize: 14 },
            tickStyle: { fill: "#FFFFFF" },
          },
        ]}
        grid={{
          horizontalLines: { stroke: "#4A5568", strokeWidth: 0.5 },
          verticalLines: { stroke: "#4A5568", strokeWidth: 0.5 },
        }}
        backgroundColor="#1A202C"
        legend={{
          position: "top",
          itemStyle: { fill: "#FFFFFF", fontSize: 14 },
        }}
      />
    </div>
  );
}
