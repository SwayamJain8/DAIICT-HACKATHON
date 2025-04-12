import * as React from "react";
import { LineChart } from "@mui/x-charts/LineChart";

const communication = [];
const clarity = [];
const teamwork = [];
const xLabels = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
// const yLabels = ["10", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0"];

export default function SimpleLineChart() {
  return (
    <LineChart
      className="bg-teal-400  rounded-lg shadow-lg"
      width={800}
      height={500}
      series={[
        { data: communication, label: "Communication", color: "red" },
        { data: clarity, label: "Clarity", color: "#FF5733" },
        { data: teamwork, label: "Teamwork", color: "#FFC300" },
      ]}
      xAxis={[{ scaleType: "point", data: xLabels }]}
      // yAxis={[{ scaleType: "point", data: yLabels }]}
    />
  );
}
